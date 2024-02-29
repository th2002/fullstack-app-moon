import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';
import { useUser } from 'hooks';
import { firebaseApp } from 'config/firebase.config';
import { bgVideo } from 'assets';
import Loading from 'components/Loading';

const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

  const { data: user, isLoading, isError, refetch } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loading />;
  }

  const handleLoginAction = async () => {
    try {
      const userCred = await signInWithRedirect(
        firebaseApp.auth,
        googleProvider
      );

      if (userCred) {
        console.log(userCred);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center overflow-hidden px-4 py-6">
      <video
        className="-z-1 absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="flex w-full flex-col items-center justify-center gap-8 rounded-md bg-[rgba(255,255,255,0.15)] px-4 py-6 backdrop-blur-md sm:w-96">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl text-white">Welcome Back!</p>
          <p className="text-lg text-gray-700">Sign in to access your store</p>
        </div>

        <div
          onClick={handleLoginAction}
          className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-gray-400 bg-[rgba(255,255,255,0.2)] px-4 py-3 transition-all duration-150 ease-in-out active:scale-95"
        >
          <FcGoogle className="text-3xl" />
          <p className="text-lg font-semibold text-white">
            Sign in with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

