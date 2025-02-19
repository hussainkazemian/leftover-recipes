import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import recipeRoutes from './routes/RecipeRoutes';
import userRoutes from './routes/UserRoutes';
import { CustomError } from './utils/errors';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

export default app;