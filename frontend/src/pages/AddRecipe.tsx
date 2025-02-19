import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddRecipe: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { auth } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === 'images') {
          for (const file of data.images) {
            formData.append('images', file);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      await axios.post('/api/recipes', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      history.push('/');
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register('title')} placeholder="Recipe Title" required className="mb-2 p-2 border" />
      <textarea {...register('description')} placeholder="Description" required className="mb-2 p-2 border" />
      <textarea {...register('ingredients')} placeholder="Ingredients" required className="mb-2 p-2 border" />
      <textarea {...register('steps')} placeholder="Steps" required className="mb-2 p-2 border" />
      <input {...register('category')} placeholder="Category" required className="mb-2 p-2 border" />
      <input {...register('allergies')} placeholder="Allergies" className="mb-2 p-2 border" />
      <input {...register('images')} type="file" multiple className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;