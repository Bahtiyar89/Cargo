import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <Fragment>
      <Outlet />
      {/** content of child page will appear here */}
    </Fragment>
  );
};

export default HomeLayout;
