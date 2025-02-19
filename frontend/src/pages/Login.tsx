import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { setAuth } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/api/users/login', data);
      setAuth(response.data);
      history.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register('username')} placeholder="Username or Email" required className="mb-2 p-2 border" />
      <input {...register('password')} type="password" placeholder="Password" required className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
      <p><a href="/forgot-password">Forgot Password?</a></p>
    </form>
  );
};

export default Login;