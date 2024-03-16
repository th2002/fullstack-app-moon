import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getAppUsersFromTheCloud } from 'api';

const useUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'users',
    async () => {
      try {
        const users = await getAppUsersFromTheCloud();
        return users;
      } catch (error) {
        toast.error('Error: ', error.message);
        return null;
      }
    },
    {
      refetchOnWindowFocus: false
    }
  );

  return { data, isLoading, isError, refetch };
};

export default useUsers;

