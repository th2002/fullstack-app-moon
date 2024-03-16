import { deleteAnAppFromCloud } from 'api';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from 'hooks';
import useApps from 'hooks/useApps';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminAppListCard = ({ data }) => {
  const { data: user } = useUser();
  const { data: apps, refetch: refetchApps } = useApps();

  const [isDelete, setIsDelete] = useState(false);

  const removeAnApp = async () => {
    await deleteAnAppFromCloud(data?._id);
    setIsDelete(false);
    refetchApps();
    toast.success('App deleted successfully');
  };

  return (
    <div className="relative flex h-24 items-center justify-start gap-3 rounded-md border-2 border-heroPrimary px-3 py-2">
      <img
        src={data?.appIcon}
        alt={data?.title}
        className="size-16 rounded-md object-cover"
      />
      <h2 className="text-xl font-semibold text-textPrimary">
        {data?.title}
        <span className=" block text-base font-normal">{data?.company}</span>
      </h2>

      {user?.role === 'admin' && (
        <button
          type="button"
          onClick={() => setIsDelete(!isDelete)}
          className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-md bg-red-500"
        >
          <FaTrash className="text-sm text-white" />
        </button>
      )}

      <AnimatePresence>
        {isDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-heroPrimary p-4">
              <h2 className="text-2xl font-medium">
                Are you sure, Do you want to delete it?
              </h2>

              <div className="flex items-center justify-center gap-4">
                <button
                  className="rounded-md border border-heroPrimary px-6 py-2 outline-none hover:border-none hover:bg-green-400 hover:text-black"
                  onClick={removeAnApp}
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsDelete(!isDelete)}
                  className="rounded-md border border-heroPrimary px-6 py-2 outline-none hover:border-none hover:bg-red-400 hover:text-black"
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAppListCard;

