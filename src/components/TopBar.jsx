import {
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { history } from "../history";
import { logout } from "../chamadasApi/usuarioApi";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSidebar } from "../context/SidebarContext";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sair = () => {
    logout()
      .then((data) => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        sessionStorage.clear();
        history.push("/");
      })
      .catch((error) => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        sessionStorage.clear();
        history.push("/");
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton id="menu-appbar" onClick={handleMenu}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={sair}>Sair</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
