import React from 'react';
import { Link } from 'react-router-dom';
import { Banner, MainLoader } from 'components';
import useApps from 'hooks/useApps';
import { AnimatePresence, motion } from 'framer-motion';
import { MdStar } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { ChatContainer } from 'containers';

const Home = () => {
  const { data: apps, isLoading: appsLoading } = useApps();

  if (appsLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <div className="grid h-full w-full grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-12">
        {/* left section */}
        <div className="col-span-12 overflow-y-scroll scrollbar-none lg:col-span-9">
          <Banner />

          <div className="my-6 grid w-full grid-cols-1 gap-6 py-4 lg:grid-cols-4 lg:gap-8">
            {apps &&
              apps.length > 0 &&
              apps.map((app, idx) => (
                <React.Fragment key={idx}>
                  <div className="group relative w-full cursor-pointer overflow-hidden rounded-md duration-300">
                    <img
                      src={app?.cover}
                      alt="cover"
                      className="h-64 w-full object-cover duration-300"
                    />

                    <AnimatePresence>
                      <Link
                        to={`/detail/${app?._id}`}
                        className="hidden transition-all duration-300 ease-in-out group-hover:block"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-between bg-[rgba(0,0,0,0.8)] px-2 py-4"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                              <MdStar className="text-base text-heroPrimary" />
                              <p className="text-xs text-white 2xl:text-base">
                                {app?.totalReviews}
                              </p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                              <FaHeart className="text-base text-red-500 " />
                            </div>
                          </div>

                          <div className="flex w-full flex-col items-start justify-start gap-2">
                            <p className="text-[rgba(255,255,255,0.8] text-sm 2xl:text-base">
                              {app?.title}
                            </p>
                            <p className="text-xs text-heroPrimary 2xl:text-base">
                              {app?.company}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </AnimatePresence>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* right section */}
        <div className="col-span-3 hidden h-full lg:block">
          <ChatContainer />
        </div>
      </div>
    </>
  );
};

export default Home;

