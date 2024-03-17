import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components';

const RightContainer = () => {
  return (
    <div className="flex-1">
      {/* header section */}
      <Header />
      <section className="h-[calc(100vh-80px)] w-full">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default RightContainer;

