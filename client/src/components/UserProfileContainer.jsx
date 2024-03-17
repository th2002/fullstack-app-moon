import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useUser } from 'hooks';
import { Menus } from 'utils/helpers';

import { TbCurrencyDollar } from 'react-icons/tb';
import { FaChevronDown } from 'react-icons/fa';
import { dropDownMenu } from 'animation';
import { Avatar } from 'assets';
import { auth } from 'config/firebase.config';
import { toast } from 'react-toastify';

const UserProfileContainer = () => {
  const { data: user } = useUser();

  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      toast.success('Logged out successfully');
      navigate('/auth', { replace: true });
    });
  };

  const handleSignUp = () => {
    navigate('/auth', { replace: true });
  };

  const [isHoverred, setHoverred] = useState(false);

  return (
    <div className="relative flex cursor-pointer items-center justify-center gap-4 pr-4">
      {/* name content */}
      <div className="flex flex-col items-start justify-start gap-1">
        <h2 className="text-lg font-bold capitalize text-textPrimary">
          {user?.name}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="boder-gray-600 flex size-6 items-center justify-center rounded-full border bg-secondary">
            <TbCurrencyDollar className="text-sm text-heroSecondary" />
          </div>

          {user?.walletBalance ? (
            <React.Fragment>
              <p className="text-lg font-semibold text-heroPrimary">
                {user?.walletBalance}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-lg font-semibold text-heroPrimary">
                {user ? 1000 : 0}
              </p>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* image content */}
      <div
        className="size-min-12 relative flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-heroPrimary to-heroSecondary p-1"
        onMouseEnter={() => setHoverred(true)}
      >
        <img
          src={user?.picture ? user?.picture : Avatar}
          alt="Avatar profile"
          className="h-full w-full rounded-full object-cover"
        />
        <div className="absolute bottom-1 right-0 flex size-4 items-center justify-center rounded-full border border-gray-600 bg-secondary">
          <FaChevronDown className="text-[10px] text-textSecondary" />
        </div>
      </div>

      {/* drop down section */}
      <AnimatePresence>
        {isHoverred && (
          <motion.div
            {...dropDownMenu}
            className="absolute right-0 top-16 z-50 flex w-64 flex-col items-start justify-start gap-4 rounded-md bg-secondary px-3 py-2 shadow-md"
            onMouseLeave={() => setHoverred(false)}
          >
            {Menus &&
              Menus.map(menu => (
                <React.Fragment key={menu.id}>
                  {(user?.role === 'admin' ||
                    (user?.role === 'member' && !menu.isAdmin)) && (
                    <Link
                      to={menu.url}
                      className="px-1 py-2 font-semibold hover:text-heroSecondary"
                    >
                      {menu.menu}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            <button
              type="button"
              onClick={handleSignOut}
              className={`w-full rounded-md bg-textPrimary px-4 py-2 text-primary transition-all duration-150 ease-in-out active:scale-95 ${user && user?.role ? 'block' : 'hidden'}`}
            >
              Sign Out
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              className={`w-full rounded-md bg-heroPrimary px-4 py-2 text-primary transition-all duration-150 ease-in-out active:scale-95 ${user && user?.role && 'hidden'}`}
            >
              Sign up
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileContainer;

