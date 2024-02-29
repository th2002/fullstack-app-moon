import React from 'react';
import { manGif } from 'assets';

const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <img
        className="size-[150px] object-cover object-center sm:size-[300px]"
        src={manGif}
        alt="Loading..."
      />
      <p className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl ">
        Loading...
      </p>
    </div>
  );
};

export default Loading;

