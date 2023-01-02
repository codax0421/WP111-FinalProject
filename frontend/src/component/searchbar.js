import { useState, useContext, React, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import DirectionsIcon from "@mui/icons-material/Directions";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
const pages = ["Products", "Pricing", "Blog"];

const ResponsiveAppBar = () => {
  const { auth, setAuth, setValue, value, setToken } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([]);
  const [searchEntry, setsearchEntry] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userMail) {
      setSettings([
        { id: "Home", icon: "HomeIcon" },
        { id: "Add Art", icon: "HomeIcon" },
        { id: "User", icon: "HomeIcon" },
        { id: "Logout", icon: "HomeIcon" },
      ]);
    } else {
      setSettings([
        { id: "Register", icon: "HomeIcon" },
        { id: "Login", icon: "HomeIcon" },
      ]);
    }
  }, [auth, value]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSearch = async (e) => {
    setsearchEntry(e.target.value);
  };
  const handleNav = (settingName) => {
    if (settingName === "Home") {
      navigate("/");
      setValue(value + 1);
      setStatus(true);
    } else if (settingName === "Product") {
      navigate("/product");
      setStatus(true);
    } else if (settingName === "User") {
      navigate("/user");
      setStatus(true);
    } else if (settingName === "Register") {
      navigate("/register");
      setStatus(true);
    } else if (settingName === "Login") {
      navigate("/login");
      setStatus(true);
    } else if (settingName === "Logout") {
      navigate("/");
      setToken("1");
      setStatus(true);
      setValue(value + 1);
      setAuth({});
    } else if (settingName === "Add Art") {
      navigate("/addArt");
      setStatus(true);
    }

    console.log(settingName);
  };
  const handleHome = () => {
    navigate("/");
    setValue(value + 1);
  };

  const handleSearchButton = () => {
    navigate("/search", {
      state: {
        search: searchEntry,
      },
    });
    setValue(value + 1);
  };
  // const getAvatarIcon = (icon) => {
  //   switch (icon) {
  //     case "Home":
  //       return <HomeIcon />;
  //     case "Product":
  //       return <HomeIcon />;
  //     case "User":
  //       return <HomeIcon />;
  //     case "Register":
  //       return <HomeIcon />;

  //     case "Login":
  //       return <HomeIcon />;
  //     case "Login":
  //       return <HomeIcon />;
  //     default:
  //       return <HomeIcon />;
  //   }
  // };
  return (
    <AppBar
      position="static"
      style={{
        display: "flex",
        flexWrap: "wrap",
        position: "Fixed",
        zIndex: "900",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PaletteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              width: "300px",
            }}
          >
            NTU ARTS
          </Typography>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 800,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Arts"
              inputProps={{ "aria-label": "search google maps" }}
              value={searchEntry}
              onChange={(e) => handleSearch(e)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearchButton}
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 0, marginLeft: "150px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleNav(setting.id)}
                  >
                    {setting.id}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
