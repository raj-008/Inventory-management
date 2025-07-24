import React from "react";
import "./hero.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <img src="./InventoryManagement_Hero@3x.png" style={{ maxHeight: "264px", maxWidth: "351px" }} alt="hero_img"></img>
          <div className="h1">Welcome to StockVenture</div>
          <p>Simplify your stock management and focus on what matters most.</p>
          <Link to="/register">
            <Button variant="contained" className="btn">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
