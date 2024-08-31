import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();
  console.log('error', error);
  return <h4>There was an error...</h4>;
};
export default ErrorElement;
