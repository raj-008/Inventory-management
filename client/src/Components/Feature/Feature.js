import React from "react";
import "./feature.css";
import HelpIcon from "@mui/icons-material/Help";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import InsightsIcon from "@mui/icons-material/Insights";

const Feature = () => {
  return (
    <div className="feature-container">
      <div className="feature-card">
        <HelpIcon className="feature-icon" />
        <h2>Feature Title 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
      <div className="feature-card">
        <ImportExportIcon className="feature-icon" />
        <h2>Feature Title 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
      <div className="feature-card">
        <ReceiptIcon  className="feature-icon"/>
        <h2>Feature Title 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
      <div className="feature-card">
        <BrandingWatermarkIcon className="feature-icon" />
        <h2>Feature Title 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
      <div className="feature-card">
        <DashboardCustomizeIcon className="feature-icon" />
        <h2>Feature Title 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
      <div className="feature-card">
        <InsightsIcon className="feature-icon" />
        <h2>Feature Title 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a libero ullamcorper, dapibus elit nec, rhoncus nisl.</p>
      </div>
    </div>
  );
};

export default Feature;
