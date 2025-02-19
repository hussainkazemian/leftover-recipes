import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/RecipeRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', recipeRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;