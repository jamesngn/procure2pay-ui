import { useAuthContext } from '@/contexts/AuthContext';
import React from 'react';

const HomePage = () => {
  const { user, logout } = useAuthContext();
  return (
    <>
      <div>HomePage</div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default HomePage;
