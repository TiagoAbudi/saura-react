import { Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import DialogMeta from "./DialogMeta";
import { tokens } from "../theme";
import NumberFormat from "../util/NumberFormat";

const GoalsChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [meta, setMeta] = useState("");
    const [metaVendida, setMetaVendida] = useState(0);
    const [mostrarMeta, setMostrarMeta] = useState(false);
    const [dataVenda, setDataVenda] = useState(null);
    const [periodoVenda, setPeriodoVenda] = useState("");

    function getStartOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);

        const startOfWeek = new Date(date.setDate(diff));
        startOfWeek.setHours(0, 0, 0, 0);
        console.log(startOfWeek);
        return startOfWeek;
    }

    function getStartOfMonth(date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        return startOfMonth;
    }

    const getMeta = () => {

    };

    useEffect(() => {
        getMeta();
    }, []);

    useEffect(() => {

    }, [dataVenda]);

    return (
        <>
            <DialogMeta
                mostrar={mostrarMeta}
                titulo="Definir meta"
                textoSim="Sim"
                textoNao="Não"
                meta={meta}
                callbackNao={() => {
                    setMostrarMeta(false);
                }}
                colors={colors}
                callbackSim={(resp) => {
                    console.log(resp);

                }}
            />
            <div
                style={{
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "5px" }}>
                    {meta ? `Meta de vendas ${meta.tipo}` : "Meta de vendas"}
                </Typography>
            </div>
            <div style={{ width: "100%", height: "40px" }}>
                {colors ? (
                    <Button
                        style={{ width: "150px", height: "40px", float: "right" }}
                        sx={{
                            backgroundColor: colors.greenAccent[500],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            ":hover": {
                                backgroundColor: colors.greenAccent[600],
                            },
                        }}
                        variant="outlined"
                        onClick={() => setMostrarMeta(true)}
                    >
                        Alterar meta
                    </Button>
                ) : null}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                }}
            >
                <Typography variant="h6" color={colors.greenAccent[500]}>
                    Meta
                </Typography>
                <Typography variant="h7" fontWeight="600" sx={{ marginBottom: "15px" }}>
                    {meta ? <NumberFormat>{meta.meta}</NumberFormat> : `R$ 0`}
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                    Vendido
                </Typography>
                <Typography variant="h7" fontWeight="600" sx={{ marginBottom: "15px" }}>
                    {metaVendida ? <NumberFormat>{metaVendida}</NumberFormat> : `R$ 0`}
                </Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: `${props.isPage ? "70%" : "100px"}`,
                }}
            >
                <GaugeChart
                    id="gauge-chart1"
                    percent={meta ? metaVendida / meta.meta : 0}
                    textColor={colors.grey[100]}
                    colors={["#FF0000", "#00FF00"]}
                    style={{
                        width: "100%",
                    }}
                />
            </div>
        </>
    );
};
export default GoalsChart;
