import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <p>Admin header</p>
      <Outlet></Outlet>
      <p>Admin footer</p>
    </div>
  );
};

export default AdminLayout;
