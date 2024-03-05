import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useEffect } from "react";
import "./layout.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const location = useLocation();

  const isBigScreen = useMediaQuery("(min-width: 1140px)", false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(isBigScreen);

  useEffect(() => {
    setOpen(isBigScreen);
  }, [isBigScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className="header" style={{ background: "#003399", boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography noWrap component="div" className="page-title">
              Dashboard
            </Typography>

            <div className="profile">
              <div className="profile-img-container">
                <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180" alt="profile_img" className="profile-img" style={{ height: "52px", width: "48px" }} />
              </div>
              <Typography variant="h6" noWrap component="div" className="header-title">
                Mini variant drawer
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="sidebar sidebar-header" style={{ background: "#003399" }}>
            <div className="sidebar-logo">LOGO</div>
            <IconButton onClick={handleDrawerClose} style={{ color: "black" }}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List className="sidebar siderbar-links">
            <Link to="/dashboard" className="sidebar-link">
              <ListItem key="Dashboard" disablePadding sx={{ display: "block" }} className={location.pathname === "/dashboard" ? "active-nav" : ""}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                    <GridViewRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/category" className="sidebar-link">
              <ListItem key="Category" disablePadding sx={{ display: "block" }} className={location.pathname === "/category" ? "active-nav" : ""}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                    <GrainRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Category" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/setting" className="sidebar-link">
              <ListItem key="Setting" disablePadding sx={{ display: "block" }} className={location.pathname === "/setting" ? "active-nav" : ""}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Box component="main" className="main-content" sx={{ flexGrow: 1, py: 2, px: 2, overflow: "hidden" }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}
