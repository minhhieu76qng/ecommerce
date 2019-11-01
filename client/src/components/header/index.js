import React from 'react';
import NavBar from './navbar';
import './scss/index.scss';
import TopHeaderContainer from '../../containers/TopHeaderContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import LoginContainer from '../../containers/LoginContainer';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';

const Header = () => {
  return (
    <div className='header'>
      <TopHeaderContainer />
      <NavBar />
      <RegisterContainer />
      <LoginContainer />
      <ForgotPasswordContainer />
    </div>
  );
};

export default Header;
