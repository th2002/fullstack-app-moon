import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useUser } from 'hooks';
import { AdminHeader, MainLoader } from 'components';
import { FaHouse } from 'react-icons/fa6';

const AdminLayout = () => {
  const { data: user, isLoading: userLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (user?.role === 'member' || !user)) {
      navigate('/', { replace: true });
    }
  }, [user]);

  if (userLoading) {
    return <MainLoader />;
  }

  return (
    <div className="flex h-auto w-screen flex-col items-center justify-start px-4 py-3">
      <AdminHeader />
      {/* navigational container */}
      <div className="flex h-auto w-full items-center justify-center gap-12 p-4">
        {/* navigation container */}

        <Link to="/">
          <FaHouse className="text-2xl hover:text-heroPrimary" />
        </Link>

        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && 'text-heroPrimary'}`
          }
          to={'/admin/home'}
        >
          Dashboard
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && 'text-heroPrimary'}`
          }
          to={'/admin/apps'}
        >
          Apps
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && 'text-heroPrimary'}`
          }
          to={'/admin/users'}
        >
          Users
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminLayout;

