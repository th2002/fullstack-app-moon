import React from 'react';
import { PuffLoader } from 'react-spinners';

const MainLoader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <PuffLoader color="#a55eea" size={80} />
    </div>
  );
};

export default MainLoader;

