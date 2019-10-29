import React from "react";
import { Form, Input, Button } from "antd";
import "./index.scss";

const Register = ({ form, isOpen, close, openLogin }) => {
  const { getFieldDecorator } = form;

  if (isOpen) {
    return (
      <div className="form_wrapper">
        <div className="wrapper">
          <button onClick={close} className="reset-button exit-button">
            <img src="/imgs/cross.svg" />
          </button>

          <Form className="form">
            <h2 className="form-title">Register</h2>
            <Form.Item label="Name" colon={false} className="form-item">
              {getFieldDecorator("name", {
                rules: [
                  {
                    validator: function(rule, value, cb) {
                      if (value.includes(" ")) {
                        return cb("Please enter a valid name!");
                      }
                      cb();
                    }
                  }
                ]
              })(
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your name..."
                />
              )}
            </Form.Item>
            <Form.Item label="Email" colon={false} className="form-item">
              {getFieldDecorator("email", {
                rules: [
                  {
                    validator: function(rule, value, cb) {
                      const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
                      if (!pattern.test(value)) {
                        return cb("Please enter a valid e-mail!");
                      }
                      cb();
                    }
                  }
                ]
              })(
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your email..."
                />
              )}
            </Form.Item>
            <Form.Item label="Password" colon={false} className="form-item">
              {getFieldDecorator("password", {
                rules: [
                  {
                    min: 6,
                    message: "Your passwords must be more than 6 characters!"
                  }
                ]
              })(
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter your password..."
                />
              )}
            </Form.Item>

            <div className="text">
              By creating an account you agree to the{" "}
              <a href="#" className="highlight">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="highlight">
                Privacy Policy
              </a>
            </div>

            <Button size="large" className="button-submit">
              Register
            </Button>

            <div className="bottom-form">
              <div className="text">
                Do you have an account?{" "}
                <a
                  onClick={e => {
                    e.preventDefault();
                    openLogin();
                  }}
                  className="highlight"
                  href="#"
                >
                  Log In
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

const WrappedRegister = Form.create("form_Register")(Register);

export default WrappedRegister;
