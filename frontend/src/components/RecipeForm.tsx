import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const recipe = {
      title,
      description,
      ingredients,
      steps,
      category,
      allergies,
      images: images.map(image => URL.createObjectURL(image)),
      created_by: 'current_user', // Replace with actual user
    };
    try {
      await axios.post('/api/recipes', recipe);
      alert('Recipe added successfully!');
    } catch (error) {
      alert('Failed to add recipe');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="mb-2 p-2 border" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="mb-2 p-2 border" />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required className="mb-2 p-2 border" />
      <textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Steps" required className="mb-2 p-2 border" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required className="mb-2 p-2 border" />
      <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Allergies" className="mb-2 p-2 border" />
      <input type="file" multiple onChange={handleImageChange} className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;