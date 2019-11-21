import React from 'react';
import Fade from 'react-reveal/Fade';
import { Form, Button, Checkbox } from 'antd';
import './index.scss';

const Login = ({
  form,
  close,
  loggedIn,
  openForgotPw,
  openRegister,
  errors,
  login,
}) => {
  const { getFieldDecorator, getFieldValue, validateFields } = form;

  if (loggedIn) {
    close();
  }

  const handleSubmit = event => {
    event.preventDefault();
    validateFields(function (err) {
      if (!err) {
        // submit
        const email = getFieldValue('email');
        const password = getFieldValue('password');

        login(email, password);
      }
    });
  };

  return (
    <div className='form_wrapper'>
      <Fade>
        <div className='wrapper'>
          <button onClick={close} className='reset-button exit-button'>
            <img src='/imgs/cross.svg' />
          </button>

          <Form className='form' onSubmit={handleSubmit}>
            <h2 className='form-title'>Log In</h2>
            {errors &&
              errors.map(e => <p className='message-error'>{e.message}</p>)}
            <Form.Item label='Email' colon={false} className='form-item'>
              {getFieldDecorator('email', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Field is required!',
                  },
                  {
                    validator: function (rules, value, cb) {
                      const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
                      if (!pattern.test(value)) {
                        return cb('Email is not valid!');
                      }
                      return cb();
                    },
                  },
                ],
              })(
                <input
                  className='input-field'
                  type='text'
                  placeholder='Enter your email...'
                />,
              )}
            </Form.Item>
            <Form.Item label='Password' colon={false} className='form-item'>
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Field is required!',
                  },
                  {
                    min: 6,
                    message: 'Password required at least 6 characters!',
                  },
                ],
              })(
                <input
                  className='input-field'
                  type='password'
                  placeholder='Enter your password...'
                />,
              )}
            </Form.Item>
            <div className='extra-login'>
              <div className='remember-me'>
                <Checkbox checked={true}>Remember password</Checkbox>
              </div>
              <div className='forgot-password'>
                <a
                  onClick={e => {
                    e.preventDefault();
                    openForgotPw();
                  }}
                  href=''>
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button
              size='large'
              className={`button-submit`}
              htmlType='submit'
              onClick={handleSubmit}>
              Log In
            </Button>

            <div className='bottom-form'>
              <div className='text'>
                Don't have an account?{' '}
                <a
                  onClick={e => {
                    e.preventDefault();
                    openRegister();
                  }}
                  className='highlight'
                  href='#'>
                  Register
                </a>
              </div>
            </div>
          </Form>
        </div>
      </Fade>
    </div>
  );
};

const WrappedLogin = Form.create('form_Login')(Login);

export default WrappedLogin;
