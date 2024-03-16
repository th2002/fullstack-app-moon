import React from 'react';
import useApps from 'hooks/useApps';
import { AdminAppListCard } from 'components';
import { PuffLoader } from 'react-spinners';

const ListOfApps = () => {
  const { data: apps, isLoading } = useApps();

  if (isLoading) {
    return <PuffLoader color="#a55eea" size={80} />;
  }
  return (
    <div className="grid h-fit w-full grid-cols-1 gap-4 py-3 lg:grid-cols-2">
      {apps?.length > 0 && apps ? (
        <React.Fragment>
          {apps?.map(app => (
            <AdminAppListCard key={app._id} data={app} />
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>No data</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default ListOfApps;

