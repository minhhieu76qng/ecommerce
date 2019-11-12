import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserToken } from '../utils/LocalStorage';
import SellerLayout from './SellerLayout';

const userToken = new UserToken();

const SellerPrivateRoute = ({ component: Component, title, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => {
        if (!userToken.isSeller()) {
          return <Redirect to='/seller/login' />;
        }

        return (
          <div>
            <SellerLayout title={title}>
              <Component {...matchProps} />
            </SellerLayout>
          </div>
        );
      }}
    />
  );
};

export default SellerPrivateRoute;
