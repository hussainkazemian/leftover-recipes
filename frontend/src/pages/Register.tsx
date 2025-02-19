import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    try {
      await axios.post('/api/users/register', data);
      history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register('name')} placeholder="Name" required className="mb-2 p-2 border" />
      <input {...register('familyName')} placeholder="Family Name" required className="mb-2 p-2 border" />
      <input {...register('username')} placeholder="Username" required className="mb-2 p-2 border" />
      <input {...register('email')} type="email" placeholder="Email" required className="mb-2 p-2 border" />
      <input {...register('password')} type="password" placeholder="Password" required className="mb-2 p-2 border" />
      <input {...register('contactNumber')} placeholder="Contact Number (Optional)" className="mb-2 p-2 border" />
      <input {...register('profession')} placeholder="Profession (Optional)" className="mb-2 p-2 border" />
      <input {...register('age')} type="number" placeholder="Age (Optional)" className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Register</button>
    </form>
  );
};

export default Register;