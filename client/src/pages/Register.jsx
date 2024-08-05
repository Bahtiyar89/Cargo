import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Fragment>
      <h1>Register</h1>
      <Link to={'/login'}>Login page </Link>
    </Fragment>
  );
};

export default Register;
