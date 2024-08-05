import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Fragment>
      <p>Error</p>
      <Link to={'/'}>Back home</Link>
    </Fragment>
  );
};

export default Error;
