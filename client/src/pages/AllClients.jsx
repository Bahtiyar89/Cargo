import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import ClientsContainer from '../components/ClientsContainer';

const allClientsQuery = (params) => {
  console.log('params::55 ', params);
  return {
    queryKey: ['clients'],

    queryFn: async () => {
      const { data } = await customFetch.get('/clients', {
        params,
      });
      console.log('data:: 1111', data);

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allClientsQuery(params));
    return { searchValues: { ...params } };
  };

const AllClientsContext = createContext();

const AllClients = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allClientsQuery(searchValues));
  console.log('111:', data);

  return (
    <AllClientsContext.Provider value={{ data, searchValues }}>
      <ClientsContainer />
    </AllClientsContext.Provider>
  );
};

export const useAllClientsContext = () => useContext(AllClientsContext);

export default AllClients;
