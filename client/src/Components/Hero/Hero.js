import React from "react";
import "./hero.css";
import Button from "@mui/material/Button";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <img src="./InventoryManagement_Hero@3x.png" style={{ maxHeight: "264px", maxWidth: "351px" }} alt="Hero Image"></img>
          <div className="h1">Welcome to Inventory</div>
          <p>
            Manage Your Inventory seemless Easily & Explore our services and products Manage Your Inventory seemless Easily & Explore our services and products Manage Your Inventory seemless Easily &
            Explore our services and products
          </p>
          <Button variant="contained" className="btn">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
