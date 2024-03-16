import { ListOfApps, NewApp } from 'containers';
import React from 'react';

const AdminApps = () => {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      {/* left section */}
      <NewApp />
      {/* right section */}
      <ListOfApps />
    </div>
  );
};

export default AdminApps;

