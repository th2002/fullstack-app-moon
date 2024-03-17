import React from 'react';
import { useUsers } from 'hooks';
import { MainLoader, UsersListCard } from 'components';

const AdminUsers = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-evenly gap-4">
      {users && users.length > 0 ? (
        <React.Fragment>
          {users?.map(user => (
            <UsersListCard key={user.uid} user={user} />
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

export default AdminUsers;

