import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [auth]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Family Name: {profile.familyName}</p>
      <p>Email: {profile.email}</p>
      <p>Contact Number: {profile.contactNumber}</p>
      <p>Profession: {profile.profession}</p>
      <p>Age: {profile.age}</p>
    </div>
  );
};

export default Profile;