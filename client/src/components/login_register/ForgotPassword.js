import React from "react";
import { Form, Button } from "antd";
import "./index.scss";

const ForgotPassword = ({ form, isOpen, close, openLogin }) => {
  const { getFieldDecorator } = form;

  if (isOpen) {
    return (
      <div className="form_wrapper">
        <div className="wrapper">
          <button onClick={close} className="reset-button exit-button">
            <img src="/imgs/cross.svg" />
          </button>

          <Form className="form">
            <h2 className="form-title">Forgot Password</h2>

            <Form.Item label="Email" colon={false} className="form-item">
              {getFieldDecorator("email", {})(
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your email..."
                />
              )}
            </Form.Item>

            <Button size="large" className="button-submit">
              Submit
            </Button>

            <div className="bottom-form">
              <div className="text">
                I remember my password now.
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

const WrappedForgotPassword = Form.create("form_ForgotPW")(ForgotPassword);

export default WrappedForgotPassword;
