import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect
} from 'firebase/auth';

import { MainLoader } from 'components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { bgVideo } from 'assets';

import { useUser } from 'hooks';
import { auth } from 'config/firebase.config';

const Authentication = () => {
  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const { data: user, isLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <MainLoader />;
  }

  const handleLoginAction = async provider => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  // Login with Google
  const handleGoogleLogin = () => {
    handleLoginAction(googleProvider);
  };

  // Login with Facebook
  const handleFacebookLogin = () => {
    handleLoginAction(facebookProvider);
  };

  // Login with Github
  const handleGithubLogin = () => {
    handleLoginAction(githubProvider);
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

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div
            onClick={handleGoogleLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-gray-400 bg-[rgba(255,255,255,0.2)] px-4 py-3 transition-all duration-150 ease-in-out active:scale-95"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-lg font-semibold text-white">
              Sign in with Google
            </p>
          </div>

          <div
            onClick={handleFacebookLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-gray-400 bg-[#0866ff] px-4 py-3 transition-all duration-150 ease-in-out active:scale-95"
          >
            <FaFacebookF className="text-2xl text-white" />
            <p className="text-lg font-semibold text-white">
              Sign in with Facebook
            </p>
          </div>

          <div
            onClick={handleGithubLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border border-gray-400 bg-black px-4 py-3 transition-all duration-150 ease-in-out active:scale-95"
          >
            <FaGithub className="text-2xl text-white" />
            <p className="text-lg font-semibold text-white">
              Sign in with Github
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

