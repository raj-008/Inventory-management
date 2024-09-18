import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import "./header.css";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Hero from "../Hero/Hero";
import Feature from "../Feature/Feature";
import Plan from "../Plan/Plan";
import { Link } from "react-router-dom";
import { useRef } from "react";
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
const navPaths = ["/", "/#", "/contact"];

const isLoggedIn = localStorage.getItem("_authToken");

if (isLoggedIn) {
  navItems.push("Dashboard");
  navPaths.push("/dashboard");
} else {
  navItems.push("Sign In");
  navPaths.push("/login");
}

function Header(props) {
  const aboutRef = useRef();
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isScroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = isScroll;

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" className="app-title" sx={{ my: 2 }}>
        MUI
      </Typography>

      <Divider />

      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding style={{ justifyContent: "center" }}>
            <Link to={navPaths[index]} key={index} style={{ textDecoration: "none", color: "black !important" }}>
              <Button sx={{ width: "100%", textAlign: "center" }} className={item === "Sign In" || item === "Dashboard" ? "main-btn" : ""} onClick={item === "About" && scrollToAbout}>
                <ListItemText primary={item} />
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar component="nav" className="app-bar" sx={{ background: isScroll ? "white" : "transparent" }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon style={{ color: "#000000" }} />
            </IconButton>
            <img src="https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png" className="app-logo" alt="app_logo" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, color: "#000000" }}>
              Stockventri
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item, index) => (
                <Link to={navPaths[index]} key={index}>
                  <Button
                    key={item}
                    variant={item === "Sign In" || item === "Dashboard" ? "contained" : ""}
                    className={item === "Sign In" || item === "Dashboard" ? "main-btn" : "nav-btn"}
                    sx={{ color: "#000000" }}
                  >
                    {item}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main">
        <Hero />

        <Box sx={{ p: 2 }}>
          <Feature />
          <Plan />
          <About aboutRef={aboutRef} />
          <Contact />
        </Box>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
