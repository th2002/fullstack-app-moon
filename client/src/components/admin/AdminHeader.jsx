import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from 'assets';
import UserProfileContainer from 'components/UserProfileContainer';

const AdminHeader = () => {
  return (
    <div className="flex w-full items-center justify-between">
      {/* logo */}
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-auto w-16 object-cover" />
      </Link>

      {/* user profile section */}
      <UserProfileContainer />
    </div>
  );
};

export default AdminHeader;

