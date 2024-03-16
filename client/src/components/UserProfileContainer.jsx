import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryClient } from 'react-query';

import { useUser } from 'hooks';
import { Menus, singOutTheUser } from 'utils/helpers';

import { TbCurrencyDollar } from 'react-icons/tb';
import { FaChevronDown } from 'react-icons/fa';
import { dropDownMenu } from 'animation';
import { Avatar } from 'assets';

const UserProfileContainer = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();

  const queryClient = useQueryClient();

  const [isHoverred, setHoverred] = useState(false);

  return (
    <div className="relative flex cursor-pointer items-center justify-center gap-4">
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
              <p className="text-lg font-semibold text-heroPrimary">0</p>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* image content */}
      <div
        className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-heroPrimary to-heroSecondary p-1"
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
                  {menu.isAdmin ? (
                    <Link className="px-1 py-2 font-semibold hover:text-heroSecondary">
                      {menu.menu}
                    </Link>
                  ) : (
                    <Link className="px-1 py-2 font-semibold hover:text-heroSecondary">
                      {menu.menu}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            <button
              type="button"
              onClick={() => singOutTheUser(queryClient)}
              className="w-full rounded-md bg-textPrimary px-4 py-2 text-primary transition-all duration-150 ease-in-out active:scale-95"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileContainer;

