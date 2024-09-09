import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import InvoiceContainer from '../components/InvoiceContainer';

const allInvoicesQuery = (params) => {
  console.log('params::55 ', params);

  return {
    queryKey: ['allinvoices'],

    queryFn: async () => {
      const { data } = await customFetch.get('/invoices', {
        params,
      });

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
    console.log('params: ', params);

    await queryClient.ensureQueryData(allInvoicesQuery(params));
    return { searchValues: { ...params } };
  };

const AllInvoicesContext = createContext();

const AllInvoices = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allInvoicesQuery(searchValues));

  return (
    <AllInvoicesContext.Provider value={{ data, searchValues }}>
      <InvoiceContainer />
    </AllInvoicesContext.Provider>
  );
};

export const useAllInvoicesContext = () => useContext(AllInvoicesContext);

export default AllInvoices;
