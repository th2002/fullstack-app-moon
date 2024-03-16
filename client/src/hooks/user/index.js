import { useQuery } from 'react-query';

import { getAuthenticatedUser } from 'api';
import { toast } from 'react-toastify';

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'user',
    async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        return userDetail;
      } catch (error) {
        console.error(error);
        if (!error.message.includes('User is not authenticated')) {
          toast.error('Error: ', error.message);
        }
        return null;
      }
    },
    {
      refetchOnWindowFocus: false
    }
  );

  return { data, isLoading, isError, refetch };
};

export default useUser;

