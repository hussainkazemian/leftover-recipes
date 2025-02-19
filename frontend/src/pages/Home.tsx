import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Home: React.FC = () => {
  const { data: recipes, error } = useQuery('recipes', async () => {
    const { data } = await axios.get('/api/recipes');
    return data;
  });

  if (error) return <div>Error loading recipes</div>;

  return (
    <div>
      <h1>Home</h1>
      <div>
        {recipes?.map((recipe: any) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;