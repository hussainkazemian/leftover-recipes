import { Request, Response, NextFunction } from 'express';
import { RecipeModel, Recipe } from '../models/Recipe';

export class RecipeController {
  private recipeModel: RecipeModel;

  constructor(recipeModel: RecipeModel) {
    this.recipeModel = recipeModel;
  }

  public createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recipe: Recipe = req.body;
      const newRecipe = await this.recipeModel.create(recipe);
      res.status(201).json(newRecipe);
    } catch (error) {
      next(error);
    }
  };

  // Add other methods like get, update, delete as needed
}