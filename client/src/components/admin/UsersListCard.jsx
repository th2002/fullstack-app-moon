import React from 'react';
import { updateUserDataToCloud } from 'api';
import { Avatar } from 'assets';
import { useUsers } from 'hooks';
import { toast } from 'react-toastify';

const UsersListCard = ({ user }) => {
  const { refetch: refetchAllUsers } = useUsers();

  const updateUserRole = async role => {
    await updateUserDataToCloud({ _id: user?.uid, role: role }).then(() => {
      toast.success('User role updated');
      refetchAllUsers();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-zinc-700 p-4">
      <img
        src={user?.picture ? user.picture : Avatar}
        alt=""
        className="size-24 rounded-md object-cover"
      />

      <p className="text-xl font-semibold">{user?.name}</p>
      <p className="text-base font-semibold">Role: {user?.role}</p>

      {user?.role === 'admin' ? (
        <button
          className="cursor-pointer rounded-md bg-zinc-700 px-2 py-1 text-sm font-semibold"
          onClick={() => updateUserRole('member')}
        >
          Mark as Member
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-md bg-zinc-700 px-2 py-1 text-sm font-semibold"
          onClick={() => updateUserRole('admin')}
        >
          Mark as Admin
        </button>
      )}
    </div>
  );
};

export default UsersListCard;

