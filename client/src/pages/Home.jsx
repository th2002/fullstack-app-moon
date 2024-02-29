import React from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from 'config/firebase.config';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    firebaseApp.auth.signOut().then(() => {
      toast.success('Logged out successfully');
      navigate('/auth', { replace: true });
    });
  };
  return (
    <>
      <div>Home</div>
      <button onClick={handleSignOut}>Signout</button>
    </>
  );
};

export default Home;

