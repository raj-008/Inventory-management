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
            <a href="javscript:void(0);">
              <FacebookIcon className="social-icon" />
            </a>
            <a href="javscript:void(0);">
              <InstagramIcon className="social-icon" />
            </a>
            <a href="javscript:void(0);">
              <YouTubeIcon className="social-icon" />
            </a>
            <a href="javscript:void(0);">
              <XIcon className="social-icon" />
            </a>
          </div>

          <div className="row">
            <ul>
              <li>
                <a href="javscript:void(0);">Contact us</a>
              </li>
              <li>
                <a href="javscript:void(0);">Our Services</a>
              </li>
              <li>
                <a href="javscript:void(0);">Privacy Policy</a>
              </li>
              <li>
                <a href="javscript:void(0);">Terms & Conditions</a>
              </li>
              <li>
                <a href="javscript:void(0);">Career</a>
              </li>
            </ul>
          </div>

          <div className="row">StockVenture Copyright © {(new Date().getFullYear())} | StockVenture - All rights reserved</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
