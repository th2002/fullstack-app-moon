import { toast } from 'react-toastify';
import { getAllAppsFromTheCloud } from 'api';

const { useQuery } = require('react-query');

const useApps = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'apps',
    async () => {
      try {
        const apps = await getAllAppsFromTheCloud();
        return apps;
      } catch (error) {
        console.error(error);
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

export default useApps;

