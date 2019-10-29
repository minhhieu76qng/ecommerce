import React from 'react';
import { Form, Button } from 'antd';
import './index.scss'

const Login = ({ form, isOpen, close }) => {
  const { getFieldDecorator } = form;

  if (isOpen) {
    return (
      <div className='form_wrapper'>
        <div className='wrapper'>
          <button onClick={close} className='reset-button exit-button'><img src='/imgs/cross.svg' /></button>

          <Form className='form'>
            <h2 className='form-title'>Log In</h2>
            <Form.Item label="Email" colon={false} className='form-item'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    validator: function (rule, value, cb) {
                      const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
                      if (!pattern.test(value)) {
                        return cb('Please enter a valid e-mail!')
                      }
                      cb();
                    }
                  }
                ]
              })(<input className='input-field' type='text' placeholder='Enter your email...' />)}
            </Form.Item>
            <Form.Item label="Password" colon={false} className='form-item'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    min: 6,
                    message: 'Your passwords must be more than 6 characters!'
                  }
                ]
              })(<input className='input-field' type='password' placeholder='Enter your password...' />)}
            </Form.Item>

            <Button size='large' className='button-submit'>Register</Button>

            <div className='bottom-form'>
              <div className='text'>Don't have an account? <a className='highlight' href='#'>Register</a></div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  return <></>
};

const WrappedLogin = Form.create('form_Login')(Login);

export default WrappedLogin;