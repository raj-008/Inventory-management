import React from "react";
import "./feature.css";
import HelpIcon from "@mui/icons-material/Help";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import InsightsIcon from "@mui/icons-material/Insights";
import { Element } from "react-scroll";

const Feature = () => {
  return (
    <Element name="features">
      <div className="feature-container">
        <div className="feature-card">
          <HelpIcon className="feature-icon" />
          <h2>24*7 Support</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
        <div className="feature-card">
          <ImportExportIcon className="feature-icon" />
          <h2>Easy To Maintain</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
        <div className="feature-card">
          <ReceiptIcon className="feature-icon" />
          <h2>Create Bills</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
        <div className="feature-card">
          <BrandingWatermarkIcon className="feature-icon" />
          <h2>Easy Payments</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
        <div className="feature-card">
          <DashboardCustomizeIcon className="feature-icon" />
          <h2>Product Listings</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
        <div className="feature-card">
          <InsightsIcon className="feature-icon" />
          <h2>Business Statasics</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
        </div>
      </div>
    </Element>
  );
};

export default Feature;
