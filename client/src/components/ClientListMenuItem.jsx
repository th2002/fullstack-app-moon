import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

const ClientListMenuItem = ({ menu, isClose }) => {
  const [isSubMenu, setIsSubMenu] = useState(false);

  return (
    <>
      <li
        className={`group flex w-full cursor-pointer items-center gap-x-4 rounded-md px-3 py-2 hover:bg-[#282828] hover:shadow-lg ${menu.spacing ? 'mt-12' : 'mt-4'} ${isSubMenu ? 'bg-[#282828]' : 'bg-primary'}`}
        onClick={() => setIsSubMenu(!isSubMenu)}
      >
        <span
          className={`bg-thrird flex size-8 items-center justify-center rounded-full group-hover:bg-gradient-to-br group-hover:from-heroPrimary group-hover:to-heroSecondary ${isSubMenu && 'bg-gradient-to-br from-heroPrimary to-heroSecondary'}`}
        >
          {
            <menu.Icon
              className={`float-left block text-xl text-textPrimary hover:text-textSecondary ${isSubMenu && 'text-textSecondary'}`}
            />
          }
        </span>
        <span
          className={`flex-1 text-base font-medium text-textPrimary duration-300 group-hover:text-textSecondary ${isClose && 'hidden'} ${isSubMenu && 'text-textSecondary'}`}
        >
          {menu.title}
        </span>
        {menu.submenu && !isClose && (
          <FaChevronDown
            className={`text-textPrimary duration-300 ${isSubMenu && 'rotate-180 text-textSecondary'}`}
          />
        )}
      </li>

      {/* sub menu */}
      <AnimatePresence>
        {isSubMenu && menu.submenu && !isClose && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 rounded-md bg-primary"
          >
            {menu.subMenuItems.map((item, idx) => (
              <li
                key={idx}
                className="group flex w-full cursor-pointer items-center gap-x-4 px-4 py-3"
              >
                <span>
                  {
                    <item.Icon className="float-left block text-xl text-textPrimary group-hover:text-textSecondary" />
                  }
                </span>
                <span
                  className={`flex-1 text-base font-medium text-textPrimary duration-300 group-hover:text-heroPrimary ${isClose && 'hidden'}`}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientListMenuItem;

