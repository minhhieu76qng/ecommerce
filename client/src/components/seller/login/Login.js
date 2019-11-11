import React, { useState } from 'react';
import { Form, Button, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import './index.scss';
import Axios from 'axios';
import { UserToken } from '../../../utils/LocalStorage';

const userToken = new UserToken();

const Login = ({ form }) => {

  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState(null);

  const user = userToken.getUserFromToken();

  if (user && user.isSeller) {
    return <Redirect to='/seller' />
  }


  const { getFieldDecorator, validateFields, getFieldValue } = form;

  const handleSubmit = event => {
    event.preventDefault();

    validateFields(err => {
      if (!err) {
        // submit
        const email = getFieldValue('email');
        const password = getFieldValue('password');

        setIsFetching(true);

        Axios.post('/api/auth/login', { email, password })
          .then(response => {
            const user = response.data.user;

            if (!user.isSeller) {
              return setErrors([{
                message: 'You are not a seller!'
              }])
            }

            const token = response.data.token;

            // save token to localStorage
            userToken.setToken(token);
          })
          .catch(err => {
            const errors = err.response.data.errors;
            return setErrors(errors);
          })
          .finally(() => {
            setIsFetching(false);
          })
      }
    })
  }

  return (
    <div className='login_wrapper' style={{ minHeight: window.innerHeight }}>
      <div className='form-wrapper'>
        <Spin spinning={isFetching} size='large'>
          <Form className='form-card' hideRequiredMark={true} onSubmit={handleSubmit}>
            <h3 className='title'>Log in</h3>

            {errors &&
              <div className='message-errors'>
                {errors.map(el => (
                  <p>{el.message}</p>
                ))}
              </div>
            }

            <Form.Item label='Email' colon={false} className='form-item'>
              {getFieldDecorator('email', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Field is required!',
                  },
                  {
                    validator: function (rule, value, cb) {
                      const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

                      if (!pattern.test(value)) {
                        return cb('Email is not valid!');
                      } else {
                        return cb();
                      }
                    }
                  },
                ],
              })(
                <input
                  className='input-field'
                  type='email'
                  placeholder='email@sample.com'
                />
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
                  placeholder='Enter password'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button className='btn submit-btn' htmlType='submit' block onClick={handleSubmit}>Log in</Button>
            </Form.Item>

            <Link className='link' to='/seller/forgot-password'>Forgot password</Link>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

const SellerLogin = Form.create('login_seller')(Login);
export default SellerLogin;