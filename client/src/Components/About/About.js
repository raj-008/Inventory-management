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
            </p>
          </div>

          <div className="about-img-container">
            <img
              src="https://media.istockphoto.com/id/1288148699/photo/young-business-woman-in-office-stock-photo.jpg?s=2048x2048&w=is&k=20&c=INLng5rZnkj7fzRHCWp_As_INJB0MN6L0Z27uk1gqPY="
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
