import React from "react";
import "./about.css";
import { Element } from "react-scroll";

const About = ({ aboutRef }) => {
  return (
    <>
      <Element name="about">
        <div className="about" ref={aboutRef}>
          <div className="about-text">
            <div className="about-title">About</div>
            <p className="about-content-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam, aliquam dolore excepturi quae. Distinctio
              enim at eligendi perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus quia corrupti alias distinctio nostrum. Minima
              ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis asperiores, exercitationem eius nostrum
              consequuntur iure aliquam itaque, assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus soluta porro reprehenderit eos inventore facere, fugit, molestiae ab
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam, aliquam dolore excepturi quae. Distinctio
              enim at eligendi perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus quia corrupti alias distinctio nostrum Minima
              ex dolor.
            </p>
          </div>

          <div className="about-img-container">
            <img
              src="about_us.jpg"
              alt="about_us"
              className="about-img"
            />
          </div>
        </div>
      </Element>
    </>
  );
};

export default About;
