import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';


const PageLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <React.Fragment>
        <Header />
        <div className='wrapper-content'>
          <Component {...matchProps} />
        </div>
        <Footer />
      </React.Fragment>
    )} />
  )
}

export default PageLayout;