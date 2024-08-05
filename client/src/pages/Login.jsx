import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Fragment>
      <h1>Login</h1>
      <Link to="/register">Register page </Link>
    </Fragment>
  );
};

export default Login;
