import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderContainer from '../containers/HeaderContainer';

const PageLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div style={{ width: 1180, margin: '0 auto' }}>
          <HeaderContainer />
          <div className='wrapper-content'>
            <Component {...matchProps} />
          </div>
          <Footer />
        </div>
      )}
    />
  );
};

export default PageLayout;
