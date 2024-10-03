import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  AddClient,
  AllClients,
  EditClient,
  EditInvoice,
  AddInvoice,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';
import { loader as editClientLoader } from './pages/EditClient';
import { action as editClientAction } from './pages/EditClient';
import { loader as editInvoiceLoader } from './pages/EditInvoice';
import { action as editInvoiceAction } from './pages/EditInvoice';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as deleteClientAction } from './pages/DeleteClient';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { action as addAddClientAction } from './pages/AddClient';
import { loader as allClientsLoader } from './pages/AllClients';
import { loader as allInvoicesLoader } from './pages/AllInvoices';
import { loader as allClientsLoader3 } from './pages/AddInvoice';
import { loader as statsLoader } from './pages/Stats';
import ErrorElement from './components/ErrorElement';
import AllInvoices from './pages/AllInvoices';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddClient />,
            action: addAddClientAction(queryClient),
          },
          {
            path: 'all-clients',
            element: <AllClients />,
            loader: allClientsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-client/:id',
            element: <EditClient />,
            loader: editClientLoader(queryClient),
            action: editClientAction(queryClient),
          },
          {
            path: 'delete-client/:id',
            action: deleteClientAction(queryClient),
          },
          {
            path: 'all-invoices',
            element: <AllInvoices />,
            loader: allInvoicesLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-invoice/:id',
            element: <EditInvoice />,
            loader: editInvoiceLoader(queryClient),
            action: editInvoiceAction(queryClient),
          },
          {
            path: 'add-invoice',
            element: <AddInvoice />,
            loader: allClientsLoader3(queryClient),
          },
          /*
          {
            path: 'add-job',
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
           */
          ,
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
