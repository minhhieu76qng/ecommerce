import React from 'react';
import NavBar from './navbar';
import './scss/index.scss';
import TopHeaderContainer from '../../containers/TopHeaderContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import LoginContainer from '../../containers/LoginContainer';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';

const Header = ({ openLogin, openRegister, openForgotPw }) => {
  return (
    <div className='header'>
      <TopHeaderContainer />
      <NavBar />
      {openRegister && <RegisterContainer />}
      {openLogin && <LoginContainer />}
      {openForgotPw && <ForgotPasswordContainer />}
    </div>
  );
};

export default Header;
