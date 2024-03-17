import React, { useState } from 'react';
import { Rewards } from 'assets';
import UserProfileContainer from './UserProfileContainer';

const Header = () => {
  const [searchItem, setSerchItem] = useState('');

  return (
    <div className="flex w-full items-center justify-end bg-third pl-6 lg:justify-between">
      <img
        src={Rewards}
        alt="gif"
        className="hidden h-auto w-64 object-cover lg:block"
      />

      {/* section here */}
      <div className="hidden items-center justify-center rounded-full bg-[#2a2a2a] px-4 py-3 shadow-lg lg:flex">
        <input
          type="text"
          placeholder="Search for Apps"
          onChange={e => setSerchItem(e.target.value)}
          className="border-none bg-transparent text-base font-medium tracking-wider text-textSecondary outline-none placeholder:text-textPrimary lg:w-64 2xl:w-96"
        />
      </div>

      {/* profile section */}
      <UserProfileContainer />
    </div>
  );
};

export default Header;

