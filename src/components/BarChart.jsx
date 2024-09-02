import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";
import NumberFormat from "../util/NumberFormat";
import { mockBarData } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dadosBar, setDadosBar] = useState([]);
    const dataFinal = new Date();
    const dataInicial = new Date();
    //dataInicial.setDate(1);
    //dataInicial.setMonth(0);

    const getBarChartData = () => {

    };

    const handleKeys = (array) => {
        return array.map((dado) => dado.vendedor);
    };

    useEffect(() => {
        getBarChartData();
    }, []);

    //   if (dadosBar.length === 0) {
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           height: "250px",
    //           padding: "8px",
    //         }}
    //       >
    //         <span>
    //           O gráfico está vazio neste momento. Parece que ainda não há vendas
    //           registradas para o dia.
    //         </span>
    //       </div>
    //     );
    //   }

    return (
        <ResponsiveBar
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
                tooltip: {
                    container: {
                        color: colors.grey[600],
                    },
                },
            }}
            data={mockBarData}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            tooltip={(point) => (
                <div
                    style={{
                        background: colors ? colors.grey[700] : "#f2f2f2",
                        color: colors ? colors.primary[100] : "#000000",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <div>Vendedor: {point.data.vendedor ? point.data.vendedor : ""}</div>
                    <div>
                        Valor:{" "}
                        {point.value ? (
                            <span>
                                {Number(point.value) >= 0 ? (
                                    <NumberFormat>{Number(point.value)}</NumberFormat>
                                ) : (
                                    `-`
                                )}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}
            role="application"
            isInteractive={true}
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
    );
};

export default BarChart;
