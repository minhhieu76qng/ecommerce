import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className='wrapper-content'>{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
