import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`/api/recipes/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setRecipe((prev: any) => ({ ...prev, likes: prev.likes + 1 }));
    } catch (error) {
      console.error('Failed to like recipe:', error);
    }
  };

  const handleComment = async (text: string) => {
    try {
      const { data: comment } = await axios.post(`/api/recipes/comment/${id}`, { text }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setRecipe((prev: any) => ({ ...prev, comments: [...prev.comments, comment] }));
    } catch (error) {
      console.error('Failed to comment on recipe:', error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <button onClick={handleLike} className="p-2 bg-blue-500 text-white">Like</button>
      <div>
        <h2>Comments</h2>
        {recipe.comments.map((comment: any) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <p>{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleComment(e.target.comment.value); e.target.reset(); }}>
        <textarea name="comment" placeholder="Add a comment" required className="mb-2 p-2 border"></textarea>
        <button type="submit" className="p-2 bg-blue-500 text-white">Comment</button>
      </form>
    </div>
  );
};

export default RecipeDetail;