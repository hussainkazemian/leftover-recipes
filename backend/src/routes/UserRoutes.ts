import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Database } from 'sqlite3';
import { UserModel } from '../models/User';

const db = new Database('./database.sqlite');
const userModel = new UserModel(db);
const userController = new UserController(userModel);

const router = Router();

router.post('/register', userController.registerUser);

// Add other routes like login, update, delete as needed

export default router;