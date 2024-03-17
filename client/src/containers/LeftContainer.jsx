import React, { useState } from 'react';
import { Flag, Logo } from 'assets';
import { ClientListMenuItem } from 'components';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { ClientMenus } from 'utils/helpers';
import { Link } from 'react-router-dom';

const LeftContainer = () => {
  const [isClose, setIsClose] = useState(false);

  return (
    <div
      className={`${isClose ? 'w-20 px-3' : 'w-80'} relative flex h-full flex-col items-center justify-start border-r border-secondary bg-third py-3 transition-all duration-300 ease-in-out`}
    >
      {/* absolute action button */}
      <div
        className="group absolute -right-3 cursor-pointer rounded-md bg-gradient-to-br from-heroPrimary to-heroSecondary px-1 py-4"
        onClick={() => setIsClose(!isClose)}
      >
        <FaChevronRight
          className={`${!isClose && 'rotate-[540deg]'} text-sm text-white transition-all duration-300 ease-in-out`}
        />
      </div>

      {/* top section */}
      <div
        className={`imtes-center inline-flex w-full justify-between gap-2 duration-200 ${!isClose && 'px-6'}`}
      >
        {/* image container */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="float-left mr-5 block h-auto w-12 min-w-[48px] object-contain"
            />
          </Link>
          <p
            className={`font-serif font-extrabold uppercase tracking-[5px] text-textPrimary ${isClose && 'scale-0'} duration-300`}
          >
            App <span className="block text-heroPrimary">Moon</span>
          </p>
        </div>

        {/* location change */}
        <div className={`${isClose && 'scale-0'} relative duration-300`}>
          <div className="flex items-center justify-center">
            <img src={Flag} alt="flag" className="h-auto w-12 object-contain" />
            <div className="absolute -bottom-1 -right-2 flex size-4 items-center justify-center rounded-full bg-secondary">
              <FaChevronDown className="text-[10px] text-gray-50" />
            </div>
          </div>
        </div>
      </div>

      {/* menu section */}
      <ul className={`w-full pt-2 ${!isClose && 'px-4'}`}>
        {ClientMenus.map((menu, idx) => (
          <React.Fragment key={idx}>
            <ClientListMenuItem menu={menu} isClose={isClose} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default LeftContainer;

