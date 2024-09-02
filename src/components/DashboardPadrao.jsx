import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import NumberFormat from "../util/NumberFormat";
import Header from "./Header";
import StatBox from "./StatBox";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const DashboardPadrao = (props) => {
  const [carregandoPedidos, setCarregandoPedidos] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const dataFinal = new Date();
  const dataInicial = new Date();
  dataInicial.setDate(1);
  const [resumoMes, setResumoMes] = useState("");
  const [resumoDia, setResumoDia] = useState("");

  useEffect(() => {
    getPedidos();
    getResumo();
    getResumoDia();
  }, []);

  const getPedidos = () => {
    setCarregandoPedidos(true);
    
  };

  const getResumo = () => {
    
  };

  const getResumoDia = () => {
    
  };

  const handleData = (data) => {
    const [date, time, timezone] = data.split(" ");

    var [year, month, day] = date.split("-");

    var [hour, minute, seconds] = time.split(":");

    var newDate = new Date(year, month - 1, day, hour, minute, seconds);

    return newDate.toLocaleTimeString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <Box m="20px">
      {/* CABEÇALHO */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Painel de Controle" />

        {/* <Box>
                      <Button
                          sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "10px 20px",
                          }}
                      >
                          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                          Baixar relatórios
                      </Button>
                  </Box> */}
      </Box>

      {/* GRID E GRÁFICOS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* LINHA 1 */}
        <Box
          sx={{ borderRadius: 5 }}
          gridColumn={props.width < 770 ? "span 6" : "span 4"}
          backgroundColor={props.colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              Number(resumoMes.percentual_rentabilidade) >= 0
                ? Number(resumoMes.percentual_rentabilidade).toFixed(2)
                : `-`
            }
            subtitle="Consórcios 12 meses"
          />
        </Box>
        <Box
          sx={{ borderRadius: 5 }}
          gridColumn={props.width < 770 ? "span 6" : "span 4"}
          backgroundColor={props.colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              Number(resumoMes.total_clientes_atendidos) >= 0
                ? Number(resumoMes.total_clientes_atendidos)
                : `-`
            }
            subtitle="Aumento médio mensal Consórcios"
          />
        </Box>
        <Box
          sx={{ borderRadius: 5 }}
          gridColumn={props.width < 770 ? "span 6" : "span 4"}
          backgroundColor={props.colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              Number(resumoMes.total_liquido) > 0 ? (
                <NumberFormat>{Number(resumoMes.total_liquido)}</NumberFormat>
              ) : (
                `-`
              )
            }
            subtitle="Consignado 12 meses"
          />
        </Box>

        {/* LINHA 2 */}
        <Box
          sx={{ borderRadius: 5 }}
          gridColumn={props.width < 770 ? "span 12" : "span 6"}
          gridRow="span 3"
          backgroundColor={props.colors.primary[400]}
          alignItems="center"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            textAlign="center"
            width="100%"
          >
            <Box mx="auto">
              <Typography
                variant="h5"
                fontWeight="600"
                color={props.colors.grey[100]}
              >
                Novos Consórcios
              </Typography>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          sx={{ borderRadius: 5 }}
          gridColumn={props.width < 770 ? "span 12" : "span 6"}
          gridRow="span 3"
          backgroundColor={props.colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Novos Clientes
          </Typography>
          <Box height="420px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPadrao;
