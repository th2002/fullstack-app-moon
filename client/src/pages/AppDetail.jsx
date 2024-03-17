import React, { useEffect, useState } from 'react';
import useApps from 'hooks/useApps';
import { MainLoader } from '../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  MdArrowBack,
  MdArrowForward,
  MdBookmarkAdd,
  MdShare,
  MdStar
} from 'react-icons/md';
import { FaComputer } from 'react-icons/fa6';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AppDetail = () => {
  const { appid } = useParams();

  const [loadedApp, setLoadedApp] = useState(null);

  const { data: apps, isLoading: appsLoading } = useApps();

  useEffect(() => {
    if (apps && appid && apps.length > 0) {
      setLoadedApp(apps.find(app => app._id === appid));
    }
  }, [apps, appid]);

  if (appsLoading) {
    return <MainLoader />;
  }

  return (
    <div className="h-full overflow-y-scroll scrollbar-none">
      <AppBanner loadedApp={loadedApp} />

      <div className="grid h-full w-full grid-cols-1 gap-4 px-8 py-4 lg:grid-cols-12 ">
        {/* left section */}
        <div className="col-span-12 flex  flex-col items-center justify-start gap-3 lg:col-span-8">
          {/* Slider */}
          <div className="w-full  overflow-x-scroll py-6 scrollbar-none">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              grabCursor={true}
              centeredSlides={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {loadedApp?.banners &&
                loadedApp?.banners?.map((img, index) => (
                  <SwiperSlide style={{ width: 500 }} key={index}>
                    <div className="relative h-64 w-auto overflow-hidden  rounded duration-200">
                      <img
                        src={img?.url}
                        className="h-full w-auto object-cover"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* about this game */}
          <div className="flex w-full flex-col items-start justify-start gap-3 py-6">
            <div className="flex items-center justify-center gap-12">
              <p className="text-2xl text-gray-300">About this game</p>

              <MdArrowForward className="text-2xl text-gray-300" />
            </div>
            <p className="text-base text-gray-400">{loadedApp?.shortDes}</p>
          </div>
        </div>

        {/* Simillar card section */}
        <div className="col-span-4 hidden h-full flex-col items-start justify-start gap-4 px-2 py-4 lg:flex">
          <div className="flex items-center justify-center gap-12">
            <p className="text-2xl text-gray-300">Simillar Apps</p>

            <MdArrowForward className="text-2xl text-gray-300" />
          </div>
          {apps &&
            apps
              .filter(game => game._id !== appid)
              .map((value, index) => (
                <Link to={`/detail/${value?._id}`}>
                  <div
                    className="flex w-full items-start justify-start gap-2 px-3 py-2"
                    key={index}
                  >
                    <img
                      src={value?.appIcon}
                      className="h-12 w-12 rounded-md object-cover"
                      alt=""
                    />
                    <div className="flex flex-col items-start justify-start gap-2">
                      <p className="text-lg font-medium text-gray-400">
                        {value?.title}
                      </p>
                      <div className="flex items-center justify-start gap-1">
                        <p className="text-sm font-medium text-gray-600">
                          {value?.reviews}
                        </p>
                        <MdStar className="text-gray-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export const AppBanner = ({ loadedApp }) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[550px] w-full bg-[#282828]">
      <img
        src={loadedApp?.cover}
        className="h-full w-full object-cover"
        alt=""
      />

      {/* absolute overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-between bg-gradient-to-tr from-black via-[rgba(0,0,0,0.8)] to-transparent">
        <div
          className="cursor-pointer px-8 pt-8 duration-200 hover:translate-x-3"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack className="text-3xl text-gray-200" />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-5 px-8 py-12">
          {/* Title */}
          <h2 className="text-3xl font-medium text-gray-200 lg:text-5xl">
            {loadedApp?.title}
          </h2>

          {/* company details */}
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg font-medium text-secondary">
              {loadedApp?.company}
            </p>
            <p className="flex items-center justify-center gap-2 text-xs text-gray-400 lg:text-base">
              Contains ads
              <span>
                <div className="h-[1px] w-[1px] rounded-full bg-gray-400"></div>
              </span>
              In-app purchases
            </p>
          </div>

          {/* logo , ratings sections */}
          <div className=" flex items-center justify-center gap-8">
            <img
              src={loadedApp?.appIcon}
              className="h-12 w-12 rounded-lg object-cover"
              alt=""
            />
            {/* ratings */}
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="flex items-center justify-center text-base  font-medium text-gray-200">
                {loadedApp?.reviews}
                <MdStar className="text-xs text-gray-200" />
              </p>
              <span className="text-[12px]  text-gray-400">
                {loadedApp?.totalReviews} reviews
              </span>
            </div>

            {/* downloads */}
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-base font-medium text-gray-200">
                {loadedApp?.dowloads}
              </p>
              <span className="text-[12px]  text-gray-400">Downloads</span>
            </div>

            {/* rated */}
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="flex items-center justify-center bg-gray-200  text-sm font-medium text-black">
                {loadedApp?.rated}
              </p>
              <span className="text-[12px]  text-gray-400">
                Rated for {loadedApp?.totalReviews}
              </span>
            </div>
          </div>

          {/* download */}
          <div className="flex items-center justify-center gap-8">
            <button className="rounded-md border-none bg-heroSecondary bg-gradient-to-r from-heroPrimary px-12 py-2 font-medium outline-none">
              Install
            </button>

            <MdShare className="cursor-pointer text-2xl text-secondary" />

            <MdBookmarkAdd className="cursor-pointer text-2xl text-secondary" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-2">
              <FaComputer className="text-sm text-gray-400" />
              <p className="text-xs text-gray-400 lg:text-base">
                This app is not available for your device
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/1d_Ubja0DGaHuhzY8zJga9oG7gS0xwPomKryvehUMEnT667MbNI_SIV2uf6C_BYcX17dlpioO28Qr-dq9ngIbUVcOpNxBrF_D9_yJ7mfDRFG5zbN7Q=s1000"
                alt=""
                className="h-auto w-4 object-contain"
              />
              <p className="text-xs text-gray-400 lg:text-base">
                Get items in this app or game with Play Points. Learn more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;

