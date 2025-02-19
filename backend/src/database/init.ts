import { createConnection } from 'typeorm';
import { Recipe } from '../models/RecipeModel';
import { User } from '../models/UserModel';
import { Like } from '../models/RecipeModel';
import { Comment } from '../models/RecipeModel';

const defaultRecipes = [
  {
    title: 'Vegan Soup',
    description: 'A delicious and hearty vegan soup.',
    ingredients: ['Carrots', 'Potatoes', 'Onions', 'Vegetable broth'],
    steps: ['Chop vegetables', 'Boil in broth', 'Simmer until tender'],
    category: 'Dinner',
    allergies: ['None'],
    images: [],
  },
  // Add more default recipes here
];

const initDatabase = async () => {
  const connection = await createConnection();
  const userRepo = connection.getRepository(User);
  const recipeRepo = connection.getRepository(Recipe);

  for (const recipeData of defaultRecipes) {
    const recipe = new Recipe();
    Object.assign(recipe, recipeData);
    recipe.createdBy = await userRepo.findOne({ where: { id: 1 } }); // Assuming default user with id 1
    await recipeRepo.save(recipe);
  }

  await connection.close();
};

initDatabase().catch(console.error);