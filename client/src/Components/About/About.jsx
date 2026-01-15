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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde fugit veniam eius,
            perspiciatis sunt? Corporis qui ducimus quibusdam, aliquam dolore excepturi quae.
            Distinctio enim at eligendi perferendis in cum quibusdam sed quae.
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
