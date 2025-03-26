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
// import Plan from "../Plan/Plan";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Link as ScrollableLink, Element } from "react-scroll";

function Header(props) {
  const drawerWidth = 240;
  const { token } = useAuth();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isScroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  function ElevationScroll(props) {
    const { children } = props;

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
      StockVenture
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding style={{ justifyContent: "center" }}>
          <ScrollableLink to="home" smooth={true} duration={500} style={{ textDecoration: "none", color: "black !important" }}>
            <Button sx={{ width: "100%", textAlign: "center" }}>
              <ListItemText primary="Home" />
            </Button>
          </ScrollableLink>
        </ListItem>
        <ListItem disablePadding style={{ justifyContent: "center" }}>
          <ScrollableLink to="features" style={{ textDecoration: "none", color: "black !important" }} smooth={true} duration={500} offset={-100}>
            <Button sx={{ width: "100%", textAlign: "center" }}>
              <ListItemText primary="Features" />
            </Button>
          </ScrollableLink>
        </ListItem>
        <ListItem disablePadding style={{ justifyContent: "center" }}>
          <ScrollableLink to="about" smooth={true} duration={500} offset={-100} style={{ textDecoration: "none", color: "black !important" }}>
            <Button sx={{ width: "100%", textAlign: "center" }}>
              <ListItemText primary="About" />
            </Button>
          </ScrollableLink>
        </ListItem>
        <ListItem disablePadding style={{ justifyContent: "center" }}>
          <ScrollableLink to="contact" smooth={true} duration={500} offset={-150} style={{ textDecoration: "none", color: "black !important" }}>
            <Button sx={{ width: "100%", textAlign: "center" }}>
              <ListItemText primary="Contact" />
            </Button>
          </ScrollableLink>
        </ListItem>
        {token ? (
          <ListItem disablePadding style={{ justifyContent: "center" }}>
            <Link to="dashboard" style={{ textDecoration: "none", color: "black !important" }}>
              <Button sx={{ width: "100%", textAlign: "center" }} className="main-btn">
                <ListItemText primary="Dashboard" />
              </Button>
            </Link>
          </ListItem>
        ) : (
          <ListItem disablePadding style={{ justifyContent: "center" }}>
            <Link to="login" style={{ textDecoration: "none", color: "black !important" }}>
              <Button sx={{ width: "100%", textAlign: "center" }} className="main-btn">
                <ListItemText primary="Sign In" />
              </Button>
            </Link>
          </ListItem>
        )}
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
            <img src="stockventri-logo.png" className="app-logo" alt="app_logo" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, color: "#000000" }}>
              StockVenture
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ScrollableLink to="home" smooth={true} duration={500}>
                <Button className="nav-btn" sx={{ color: "#000000" }}>
                  Home
                </Button>
              </ScrollableLink>
              <ScrollableLink to="features" smooth={true} duration={500} offset={-100}>
                <Button className="nav-btn" sx={{ color: "#000000" }}>
                  Features
                </Button>
              </ScrollableLink>
              <ScrollableLink to="about" smooth={true} duration={500} offset={-100}>
                <Button className="nav-btn" sx={{ color: "#000000" }}>
                  About
                </Button>
              </ScrollableLink>
              <ScrollableLink to="contact" smooth={true} duration={500} offset={-100}>
                <Button className="nav-btn" sx={{ color: "#000000" }}>
                  Contact
                </Button>
              </ScrollableLink>
              {token ? (
                <Link to="dashboard">
                  <Button sx={{ color: "#000000" }} variant="contained" className="main-btn">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="login">
                  <Button sx={{ color: "#000000" }} variant="contained" className="main-btn">
                    Sign In
                  </Button>
                </Link>
              )}
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
      <Element name="home">
        <Box component="main">
          <Hero />
          <Box sx={{ p: 2 }}>
            <Feature />
            {/* <Plan /> */}
            <About />
            <Contact />
          </Box>
        </Box>
      </Element>
    </Box>
  );
}

export default Header;
