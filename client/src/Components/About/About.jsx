import React from "react";
import "./about.css";
import { Element } from "react-scroll";

const About = ({ aboutRef }) => {
  return (
    <Element name="about">
      <div className="about" ref={aboutRef}>
        {/* LEFT: TEXT */}
        <div className="about-text">
          <div className="about-title">About</div>
          <p className="about-content-text">
            StockVenture is a modern inventory management system designed to help businesses take control of their stock, sales, and operations with clarity and confidence. We built StockVenture to eliminate the complexity and inefficiencies that traditional inventory tracking creates for growing businesses.
          </p>
          <p className="about-content-text" style={{ paddingTop : "18px" }}>
            Our platform brings together inventory tracking, product and category management, billing, and sales insights into a single, intuitive system. Whether you manage a small retail store or a fast-growing business, StockVenture helps you stay organized, reduce errors, and make informed decisions in real time. Our mission is to simplify inventory management by providing a reliable, scalable, and easy-to-use solution that empowers businesses to focus on growth rather than operational friction.
          </p>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="about-image-section">
          <div className="decorative-circle"></div>

          <div className="about-image-wrapper">
            <img
              src="about_us.png"
              alt="Team collaboration and business growth"
              className="about-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div class="image-fallback">📊</div>';
              }}
            />
          </div>
        </div>
      </div>
    </Element>
  );
};

export default About;
