import { Database } from 'sqlite3';

export interface Recipe {
  id?: number;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  category: string;
  allergies?: string;
  images?: string;
  created_by: string;
  created_at?: Date;
}

export class RecipeModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public create(recipe: Recipe): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO recipes (title, description, ingredients, steps, category, allergies, images, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        recipe.title,
        recipe.description,
        recipe.ingredients,
        recipe.steps,
        recipe.category,
        recipe.allergies,
        recipe.images,
        recipe.created_by,
      ];
      this.db.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ ...recipe, id: this.lastID });
      });
    });
  }

  // Add other methods like get, update, delete as needed
}