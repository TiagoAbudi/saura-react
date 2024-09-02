import React, { useEffect, useState } from "react";
import { CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DashboardPadrao from "../../components/DashboardPadrao";

const Home = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [width, setWidth] = useState(window.innerWidth);
  const [filial, setFilial] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ height: "90%", width: "90%", alignContent: "center" }}>
        <CircularProgress sx={{ marginLeft: "50%" }} />
      </div>
    );
  } else if (filial && cargo) {
    console.log("A filial é", filial);
    if (!cargo.dashboard_especifico) {
      console.log("O dashboard não é específico, mostrando padrão");
      return <DashboardPadrao colors={colors} width={width} />;
    } else {
      if (filial.nome.includes("...")) {
        console.log("Mostrando dashbaord da ...");
      } else {
        if (filial.nome.includes("....")) {
          console.log("Mostrando dashbaord do ....");
        } else {
          console.log("Mostrando dashboard padrão");
          return <DashboardPadrao colors={colors} width={width} />;
        }
      }
    }
  } else {
    console.log("Não foi encontrado cargo nem filial");
    return <DashboardPadrao colors={colors} width={width} />;
  }
};

export default Home;
