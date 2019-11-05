import React from 'react';
import './scss/index.scss';
import TopHeaderContainer from '../../containers/TopHeaderContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import LoginContainer from '../../containers/LoginContainer';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';
import NavBarContainer from '../../containers/NavBarContainer';

const Header = ({ openLogin, openRegister, openForgotPw }) => {
  return (
    <div className='header'>
      <TopHeaderContainer />
      <NavBarContainer />
      {openRegister && <RegisterContainer />}
      {openLogin && <LoginContainer />}
      {openForgotPw && <ForgotPasswordContainer />}
    </div>
  );
};

export default Header;
