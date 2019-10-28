import React from 'react';
import TopHeader from './topHeader';
import NavBar from './navbar';
import './scss/index.scss';

const Header = () => {
  return (
    <div className='header'>
      <TopHeader />
      <NavBar />
    </div>
  );
};

export default Header;