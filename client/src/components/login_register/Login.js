import React, { useState } from "react";
import { Form, Button, Checkbox } from "antd";
import "./index.scss";

const Login = ({ form, isOpen, close, openForgotPw, openRegister }) => {
  const { getFieldDecorator } = form;

  if (isOpen) {
    return (
      <div className="form_wrapper">
        <div className="wrapper">
          <button onClick={close} className="reset-button exit-button">
            <img src="/imgs/cross.svg" />
          </button>

          <Form className="form">
            <h2 className="form-title">Log In</h2>
            <p className="message-error">error</p>
            <Form.Item label="Email" colon={false} className="form-item">
              {getFieldDecorator("email", {})(
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your email..."
                />
              )}
            </Form.Item>
            <Form.Item label="Password" colon={false} className="form-item">
              {getFieldDecorator("password", {})(
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter your password..."
                />
              )}
            </Form.Item>
            <div className="extra-login">
              <div className="remember-me">
                <Checkbox checked={true}>Remember password</Checkbox>
              </div>
              <div className="forgot-password">
                <a
                  onClick={e => {
                    e.preventDefault();
                    openForgotPw();
                  }}
                  href=""
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button size="large" className={`button-submit`}>
              Log In
            </Button>
            openRegister
            <div className="bottom-form">
              <div className="text">
                Don't have an account?{" "}
                <a
                  onClick={e => {
                    e.preventDefault();
                    openRegister();
                  }}
                  className="highlight"
                  href="#"
                >
                  Register
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  return <></>;
};

const WrappedLogin = Form.create("form_Login")(Login);

export default WrappedLogin;
