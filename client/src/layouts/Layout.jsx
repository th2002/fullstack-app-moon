import React from 'react';
import { MainLoader } from 'components';
import { LeftContainer, RightContainer } from 'containers';
import { useUser } from 'hooks';
import useApps from 'hooks/useApps';

const Layout = () => {
  const { isLoading: userLoading } = useUser();
  const { isLoading: appsLoading } = useApps();

  if (userLoading || appsLoading) {
    return <MainLoader />;
  }
  return (
    <div className="flex h-screen min-h-screen w-screen flex-1 items-start justify-start">
      {/* Left section */}
      <LeftContainer />

      {/* Right section */}
      <RightContainer />
    </div>
  );
};

export default Layout;

