import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = async (data: any) => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      await axios.post('/api/users/reset-password', { ...data, token });
      alert('Password has been reset successfully.');
      history.push('/login');
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register('newPassword')} type="password" placeholder="New Password" required className="mb-2 p-2 border" />
      <input {...register('repeatPassword')} type="password" placeholder="Repeat New Password" required className="mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-blue-500 text-white">Reset Password</button>
    </form>
  );
};

export default ResetPassword;