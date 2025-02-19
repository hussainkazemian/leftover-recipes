import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post('/api/users/forgot-password', data);
      alert('A reset password link has been sent to your email address.');
    } catch (error) {
      console.error('Failed to send reset password link:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register('email')} type="email" placeholder="Email" required className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;