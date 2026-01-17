import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useForm } from "react-hook-form";
import { successToaster } from "../../Utils/Toasters.utils";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [formKey, setFormKey] = useState(0);

  const onSubmit = async () => {
    try {
      setTimeout(() => {
        reset();
        setFormKey((prev) => prev + 1);
      }, 3000);
      successToaster("Your message has been recived, we'll get back to you soon");
    } catch (error) {
      console.error(error);
    }
  };

  const contactInfo = [
    { icon: LocalPhoneOutlinedIcon, text: "020 7482 1932", label: "Phone" },
    { icon: LocationOnOutlinedIcon, text: "369 Brick Lane, London", label: "Location" },
    { icon: EmailOutlinedIcon, text: "johnmarch@gmail.com", label: "Email" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0" }}>
        {/* Header */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Contact Info Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#d4dde9",
                          borderRadius: "10px",
                          flexShrink: 0,
                        }}
                      >
                        <Icon style={{ width: 28, height: 28, color: "#000000" }} />
                      </Box>
                      <Box>
                        <Typography
                          className="contact-label"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#64748b",
                            mb: 0.5,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          className="contact-text"
                          sx={{
                            color: "#0f172a",
                            fontWeight: 500,
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            wordBreak: "break-word",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* Form Section */}
          <Card sx={{ borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography sx={{ fontSize: "2.5rem", color: "#0f172a", mb: 4, textAlign: "center" }}>Contact Us</Typography>

              <Box key={formKey} component="div" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#475569", mb: 1 }}>
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    hiddenLabel
                    placeholder="Harsh Patel"
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          borderColor: "#4f46e5",
                          boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
                        },
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
                </Box>

                {/* Email and Phone Row */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#475569",
                        mb: 1,
                      }}
                    >
                      Email Address <span style={{ color: "#ef4444" }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      hiddenLabel
                      placeholder="harsh@example.com"
                      variant="filled"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          borderRadius: "12px",
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#cbd5e1",
                          },
                          "&.Mui-focused": {
                            bgcolor: "#fff",
                            borderColor: "#4f46e5",
                            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
                          },
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
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#475569",
                        mb: 1,
                      }}
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      hiddenLabel
                      placeholder="+91 98765 43210"
                      variant="filled"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          borderRadius: "12px",
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#cbd5e1",
                          },
                          "&.Mui-focused": {
                            bgcolor: "#fff",
                            borderColor: "#4f46e5",
                            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
                          },
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
                  </Box>
                </Box>

                {/* Message Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#475569",
                      mb: 1,
                    }}
                  >
                    Your Message <span style={{ color: "#ef4444" }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    hiddenLabel
                    multiline
                    rows={6}
                    placeholder="Tell us about your project..."
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          borderColor: "#4f46e5",
                          boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
                        },
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
                </Box>

                {/* Submit Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: "12px",
                    background: "#000",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "none",
                    transition: "all 0.3s",
                    "&:hover": {
                      background: "#1f2937",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                  endIcon={<SendOutlinedIcon size={25} sx={{ transform: "rotate(-45deg)", mb : 0.4}} />}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
