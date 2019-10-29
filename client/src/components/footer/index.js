import React from "react";
import "./index.scss";
import NavFooter from "./navFooter";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <a className="footer-icon" href="/">
          <img src="/imgs/logo.svg" />
        </a>

        <NavFooter />

        <div className="social-network">
          <a className="icon" href="#" title="Twitter">
            <img src="/imgs/twitter-icon.svg" />
          </a>
          <a className="icon" href="#" title="Facebook">
            <img src="/imgs/facebook-icon.svg" />
          </a>
          <a className="icon" href="#" title="Instagram">
            <img src="/imgs/instagram-6-icon.svg" />
          </a>
        </div>
      </div>
      <div className="bottom-footer">
        <NavFooter />
        <div className="extra-links">
          <a className="link" href="#">
            Privacy Policy
          </a>
          <a className="link" href="#">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
