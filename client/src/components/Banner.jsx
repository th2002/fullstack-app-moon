import React from 'react';
import { useNavigate } from 'react-router-dom';
import { One, Two, Three, Four, Five } from '../assets';

import { BiSolidCopyAlt } from 'react-icons/bi';
import {
  MdConfirmationNumber,
  MdLogout,
  MdPoll,
  MdSportsFootball
} from 'react-icons/md';
import { FaAward } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  return (
    <div className="bg-fourth relative h-64 w-full overflow-hidden rounded-[40px] shadow-lg shadow-[rgba(0,0,0,0.6)] xl:h-96">
      {/* slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={One} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Two} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Three} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Four} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Five} />
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-0 z-40 flex items-end justify-end">
        <div className="relative flex h-auto w-full flex-wrap items-center justify-start gap-6  bg-gradient-to-b  from-transparent to-[rgba(0,0,0,0.9)] px-8 py-4 backdrop-blur-md">
          {/*  */}
          <div className="group flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center  justify-center rounded-md bg-textSecondary group-hover:bg-secondary">
              <MdConfirmationNumber className="text-heroPrimary " />
            </div>
            <p className="text-sm text-textSecondary group-hover:text-secondary">
              Luck Numbers
            </p>
          </div>

          {/*  */}
          <div className="group flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center  justify-center rounded-md bg-textSecondary group-hover:bg-secondary">
              <MdSportsFootball className="text-heroPrimary " />
            </div>
            <p className="text-sm text-textSecondary group-hover:text-secondary">
              Soccer
            </p>
          </div>

          {/*  */}
          <div className="group flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center  justify-center rounded-md bg-textSecondary group-hover:bg-secondary">
              <FaAward className="text-heroPrimary " />
            </div>
            <p className="text-sm text-textSecondary group-hover:text-secondary">
              Jacpot
            </p>
          </div>

          {/*  */}
          <div className="group flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center  justify-center rounded-md bg-textSecondary group-hover:bg-secondary">
              <MdPoll className="text-heroPrimary " />
            </div>
            <p className="text-sm text-textSecondary group-hover:text-secondary">
              Bet Games
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Slide = ({ image }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth', { replace: true });
  };

  return (
    <div className="h-full w-full">
      <img src={image} className="h-full w-full object-cover" alt="" />
      <div className="absolute inset-0 z-50 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-transparent">
        <div className="flex h-full w-full flex-col items-start justify-start px-4 py-2 lg:px-8 lg:py-6  ">
          <h1
            className="text-xl font-bold tracking-wide text-white lg:text-3xl"
            style={{ textShadow: '5px 5px 8px rgba(0,0,0,0.6)' }}
          >
            We give money for the{' '}
            <span className="block">first registration!</span>
          </h1>
          <p className="mt-2 text-white">
            <span className="font-semibold text-gray-700">Free $100!</span>{' '}
            Register and enter a special code
          </p>

          <div className="mt-3 flex items-center justify-center gap-8">
            <div className="bg-bgGlobal flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-secondary px-4 py-2">
              <BiSolidCopyAlt className="text-secondary" />
              <p className="text-sm font-bold text-white">#FREE5</p>
            </div>

            <button
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-heroPrimary to-heroSecondary px-4 py-2 shadow-lg hover:scale-105"
              onClick={handleSignUp}
            >
              <MdLogout className=" text-black" />
              <p className="text-sm font-medium text-black">SignUp</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

