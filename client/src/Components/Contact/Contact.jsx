import React, { useState } from "react";
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
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import { useForm } from "react-hook-form";

const Contact = () => {

  const {register, handleSubmit, reset, formState: { errors }} = useForm();

  const [formKey, setFormKey] = useState(0);

  const onSubmit = async () => {
    try {
      successToaster("Your message has been recived, we'll get back to you soon");
      reset();
      setFormKey(prev => prev + 1);
  
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

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
            <Box sx={{ minWidth: 275 }} style={{ maxWidth: "100%", maxHeight: "100%" }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div" className="contact-title">
                    <span> Contact</span>
                  </Typography>

                  <div sx={{ my: 1.5 }} color="text.secondary" className="form-container">
                    <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
                      <TextField className="contact-input" name="name" style={{ width: "100%" }} label="Name" variant="filled"
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                        }}
                        {...register("name", {
                          required: { value: true, message: "Name is required" },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Only text are allowed",
                          },
                        })}
                        helperText={errors.name ? errors.name.message : ""}
                        error={!!errors.name}
                      />

                      <TextField className="contact-input contact-email" name="email" style={{ width: "100%" }} label="Email" variant="filled"
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                        }}
                        {...register("email", {
                          required: { value: true, message: "Email is required" },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        helperText={errors.email ? errors.email.message : ""}
                        error={!!errors.email}
                      />

                      <TextField className="contact-input contact-phone" name="phone" style={{ width: "100%" }} label="Phone" variant="filled"
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                        }}
                        {...register("phone", {
                          pattern: {
                            value: /^(?:\+91|91|0)?[6-9]\d{9}$/,
                            message: "Enter a valid Indian phone number",
                          },
                        })}
                        helperText={errors.phone ? errors.phone.message : ""}
                        error={!!errors.phone}
                      />

                      <TextField id="filled-multiline-static" label="Your Message" multiline style={{ width: "100%" }} rows={8} name="message" variant="filled" className="contact-input input-inquiry"
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                        }}
                        {...register("message", {
                          required: { value: true, message: "Message is required" },
                          pattern: {
                            value: /^[A-Za-z0-9\s]+$/,
                            message: "Only letters, numbers, and spaces are allowed",
                          },
                        })}
                        helperText={errors.message ? errors.message.message : ""}
                        error={!!errors.message}
                      />

                      <div className="button-wrapper">
                        <Button variant="contained" className="inquiry-submit" type="submit">
                          Send
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Contact;
