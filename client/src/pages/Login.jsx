import React, { Fragment } from 'react';
import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import { FormRow, Logo, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
