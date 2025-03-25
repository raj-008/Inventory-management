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
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useAuth } from "../../Context/AuthContext";
import PersonIcon from '@mui/icons-material/Person';

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
  const navigate = useNavigate();

  const { logOut, user } = useAuth();

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

  let pageTitle;

  let pathParts = location.pathname.split("/").filter(Boolean); 
  let part1 = pathParts.length > 0 ? `/${pathParts[0]}` : "";
  let part2 = pathParts.length > 1 ? `/${pathParts[1]}` : "";
  let url = part1 + part2;
  
  switch (url) {
    case "/admin/settings":
      pageTitle = "Settings";
      break;
    case "/admin/dashboard":
      pageTitle = "Dashboard";
      break;
    case "/dashboard":
      pageTitle = "Dashboard";
      break;
    case "/bill":
      pageTitle = "Bills";
      break;
    case "/brands":
      pageTitle = "Brands";
      break;
    case "/category":
      pageTitle = "Category";
      break;
    case "/product":
      pageTitle = "Product";
      break;
    case "/settings":
      pageTitle = "Settings";
      break;
    case "/product/create":
      pageTitle = "Create Product";
      break;
    case "/product/edit":
      pageTitle = "Edit Product";
      break;
    case "/bill/create":
      pageTitle = "Create Bill";
      break;
    case "/bill/edit":
      pageTitle = "Edit Bill";
      break;
    case "/profile":
      pageTitle = "Profile";
      break;
    default:
      pageTitle = "Inventory";
  }

  const company = JSON.parse(localStorage.getItem('user')).company || user.company;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className="header" style={{ background: "#003399", boxShadow: "none" }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: "none" }) }}>
              <MenuIcon />
            </IconButton>

            <Typography noWrap component="div" className="page-title">
              {pageTitle}
            </Typography>

            <div className="profile">
              <div className="profile-img-container">
                <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180" alt="profile_img" className="profile-img" style={{ height: "44px", width: "44px", marginTop:"6px" }} />
              </div>

              <Typography variant="h6" noWrap component="div" className="header-title">
                {company}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="sidebar sidebar-header" style={{ background: "#003399" }}>
            <div className="sidebar-logo" style={{ color: "white" }}>
              LOGO
            </div>
            <IconButton onClick={handleDrawerClose} style={{ color: "black" }}>
              {theme.direction === "rtl" ? <ChevronRightIcon style={{ color: "white" }} /> : <ChevronLeftIcon style={{ color: "white" }} />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List className="sidebar siderbar-links">
            {user.role === "user" ? (
              <>
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
                <Link to="/bill" className="sidebar-link">
                  <ListItem key="Bill" disablePadding sx={{ display: "block" }} className={location.pathname === "/bill" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <ReceiptLongIcon />
                        {/* <ReceiptIcon /> */}
                      </ListItemIcon>
                      <ListItemText primary="Bill" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to="/brands" className="sidebar-link">
                  <ListItem key="Brand" disablePadding sx={{ display: "block" }} className={location.pathname === "/brands" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <BubbleChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Brand" sx={{ opacity: open ? 1 : 0 }} />
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
                <Link to="/product" className="sidebar-link">
                  <ListItem key="Product" disablePadding sx={{ display: "block" }} className={location.pathname === "/product" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <InventoryIcon />
                      </ListItemIcon>
                      <ListItemText primary="Product" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to="/profile" className="sidebar-link">
                  <ListItem key="Profile" disablePadding sx={{ display: "block" }} className={location.pathname === "/settings" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                {/* <Link to="/settings" className="sidebar-link">
                  <ListItem key="Setting" disablePadding sx={{ display: "block" }} className={location.pathname === "/settings" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link> */}
              </>
            ) : null}
            {user.role === "admin" ? (
              <>
                <Link to="/admin/dashboard" className="sidebar-link">
                  <ListItem disablePadding sx={{ display: "block" }} className={location.pathname === "/admin/dashboard" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <GridViewRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                {/* <Link to="/admin/settings" className="sidebar-link">
                  <ListItem disablePadding sx={{ display: "block" }} className={location.pathname === "/admin/settings" ? "active-nav" : ""}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link> */}
              </>
            ) : null}

            <Link to="/" onClick={logOut} className="sidebar-link">
              <ListItem key="Setting" disablePadding sx={{ display: "block" }} className={location.pathname === "/logout" ? "active-nav" : ""}>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
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
