import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { tokens } from "../theme";
import { history } from "../history";
import logo from "../../src/img/logo.png";
import { useSidebar } from "../context/SidebarContext";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0,
    right: 0,
    bottom: 0,
    transition: "opacity 0.4s",
  },
  visible: {
    opacity: 1,
  },
}));

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        history.push(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [width, setWidth] = useState(window.innerWidth);
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [selected, setSelected] = useState("Dashboard");
  const [cargo, setCargo] = useState([]);
  const [nomeFilial, setNomeFilial] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [logoMenu, setLogoMenu] = useState(logo);

  const getSelected = () => {
    switch (window.location.pathname) {
      case "/":
        setSelected("Dashboard");
        break;
      case "/cargos":
        setSelected("Cargos");
        break;
      case "/empresas":
        setSelected("Empresas");
        break;
      case "/filiais":
        setSelected("Filiais");
        break;
      case "/usuarios":
        setSelected("Usuários");
        break;
      case "/processos":
        setSelected("Processos");
        break;
      default:
        setSelected("Dashboard");
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getSelected();
  }, []);

  const isCollapsedSize = width <= 680 ? props.isCollapsed : isCollapsed;
  const sidebarStyle = width <= 680 ? { position: "absolute" } : {};

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsedSize}
        id="menu-lateral"
        style={sidebarStyle}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={toggleCollapsed}
            icon={isCollapsed ? <ChevronRightIcon /> : undefined}
            style={{
              margin: "0 0 20px 0",
              color: colors.grey[100],
              background:""
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Saura ERP
                </Typography>
                <IconButton onClick={toggleCollapsed}>
                <ChevronLeftIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            {/* HOME */}
            <Item
              title="Painel de Controle"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Clientes"
              to="/clientes"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Regionais"
              to="/regionais"
              icon={<SouthAmericaIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* CADASTROS */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 5px" }}
            >
              Cadastros
            </Typography>

            <Item
              title="Agências"
              to="/agencias"
              icon={<ApartmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Usuáarios"
              to="/usuarios"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* IMPORTAÇÕES */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 5px" }}
            >
              Importações
            </Typography>

            <Item
              title="Arquivos de Retorno"
              to="/aquivosDeRetorno"
              icon={<CachedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Tipos Arquivo Retorno"
              to="/tiposArquivoRetorno"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* DASHBOARDS */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 5px" }}
            >
              Dashboards
            </Typography>

            <Item
              title="Regional"
              to="/regional"
              icon={<DataThresholdingIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Diretoria"
              to="/diretoria"
              icon={<DataThresholdingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
