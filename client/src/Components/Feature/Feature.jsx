import React, { useState } from "react";
import { Element } from "react-scroll";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import InsightsIcon from "@mui/icons-material/Insights";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

const Feature = () => {
  const [isHovered, setIsHovered] = useState(true);

  const features = [
    {
      icon: <HelpOutlineIcon sx={{ fontSize: 48 }} />,
      title: "24*7 Support",
      description: "Round-the-clock assistance to help you with any queries or issues. Our dedicated support team is always ready to help.",
      color: "#035789",
      hoverColor: "#000000",
    },
    {
      icon: <ImportExportIcon sx={{ fontSize: 48 }} />,
      title: "Easy To Maintain",
      description: "Streamlined maintenance process that saves time and reduces complexity. Keep your business running smoothly.",
      color: "#0067a6",
      hoverColor: "#000000",
    },
    {
      icon: <ReceiptOutlinedIcon sx={{ fontSize: 48 }} />,
      title: "Create Bills",
      description: "Generate professional invoices and bills in seconds. Customizable templates for all your business needs.",
      color: "#0081ce",
      hoverColor: "#000000",
    },
    {
      icon: <PaymentOutlinedIcon sx={{ fontSize: 48 }} />,
      title: "Easy Payments",
      description: "Seamless payment processing with multiple payment options. Fast, secure, and hassle-free transactions.",
      color: "#0081ce",
      hoverColor: "#000000",
    },
    {
      icon: <DashboardCustomizeOutlinedIcon sx={{ fontSize: 48 }} />,
      title: "Product Listings",
      description: "Manage and showcase your products efficiently. Complete inventory control at your fingertips.",
      color: "#0081ce",
      hoverColor: "#000000",
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 48 }} />,
      title: "Business Statistics",
      description: "Comprehensive analytics and insights to drive growth. Make data-driven decisions for your business.",
      color: "#0081ce",
      hoverColor: "#000000",
    },
  ];

  return (
    <Element name="feature" style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.grid}>
          {features.map((feature, index) => {
            return (
              <div key={index} style={styles.card}>
                <div style={styles.iconWrapper}>
                  <div style={{
                      ...styles.iconCircle,
                      backgroundColor: isHovered ? `${feature.color}15` : "#f5f5f5",
                    }}>
                    {React.cloneElement(feature.icon, {
                      style: {
                        color: isHovered ? feature.hoverColor : feature.color,
                        transition: "color 0.3s ease",
                      },
                    })}
                  </div>
                </div>

                <h3 style={styles.cardTitle}>{feature.title}</h3>

                <p style={styles.cardDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Element>
  );
};

const styles = {
  container: {
    padding: "64px 16px",
  },
  wrapper: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#212121",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    maxWidth: "672px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "32px",
    textAlign: "center",
    transition: "all 0.3s ease",
    border: "1px solid #e0e0e0",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "24px",
  },
  iconCircle: {
    padding: "16px",
    backgroundColor: "#f5f5f5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#212121",
    marginBottom: "12px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
};

export default Feature;
