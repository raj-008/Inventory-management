import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <img src="./InventoryManagement_Hero@3x.png" style={{ maxHeight: "264px", maxWidth: "351px" }} alt="Hero Image"></img>
          <h1>Welcome to Our Website</h1>
          <p>
            Manage Your Inventory seemless Easily & Explore our services and products Manage Your Inventory seemless Easily & Explore our services and products Manage Your Inventory seemless Easily &
            Explore our services and products
          </p>
          <a href="#" className="btn">
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
