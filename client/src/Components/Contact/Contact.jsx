import React from "react";
import "./contact.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import { Element } from "react-scroll";

const card = (
  <CardContent>
    <Typography variant="h5" component="div" className="contact-title">
      <span> Contact</span>
    </Typography>
    <div sx={{ my: 1.5 }} color="text.secondary" className="form-container">
      <form>
        <TextField className="contact-input" name="name" style={{ width: "100%" }} label="Name" variant="filled" />
        <TextField className="contact-input contact-email" name="email" style={{ width: "100%" }} label="Email" variant="filled" />

        <TextField className="contact-input contact-phone" name="phone" style={{ width: "100%" }} label="Phone" variant="filled" />

        <textarea className="contact-input input-inquiry" rows={8} placeholder="Enter Your Message"></textarea>

        <div className="button-wrapper">
          <Button variant="contained" className="inquiry-submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  </CardContent>
);

const Contact = () => {
  return (
    <>
    <Element name="contact">
      <div className="contact">
        <div className="contact-details">
          <div className="contact-conent">
            <div className="contact-item phone">
              <LocalPhoneIcon className="contact-icon" />
              +91 7894561230
            </div>

            <div className="contact-item location">
              <LocationOnIcon className="contact-icon" />
              A-1 Brick Lane, London
            </div>

            <div className="contact-item mail">
              <MailIcon className="contact-icon" />
              rajshingala07@gmail.com
            </div>
          </div>
        </div>

        <div className="contact-form">
          {
            <Box sx={{ minWidth: 275 }} style={{ maxWidth: "100%", maxHeight: "100%" }}>
              <Card variant="outlined">{card}</Card>
            </Box>
          }
        </div>
      </div>
      </Element>
    </>
  );
};

export default Contact;
