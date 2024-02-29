import React from "react";
import "./footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="row">
            <a href="#">
              <FacebookIcon className="social-icon" />
            </a>
            <a href="#">
              <InstagramIcon className="social-icon" />
            </a>
            <a href="#">
              <YouTubeIcon className="social-icon" />
            </a>
            <a href="#">
              <XIcon className="social-icon" />
            </a>
          </div>

          <div className="row">
            <ul>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Our Services</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
            </ul>
          </div>

          <div className="row">INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Raj Shingala</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
