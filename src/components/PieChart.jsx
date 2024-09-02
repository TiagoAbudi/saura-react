import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data, mockPieData } from "../data/mockData";
import React, { useEffect, useState } from "react";
import NumberFormat from "../util/NumberFormat";
import formatValueLetters from "../util/FormataNumerosLetra";

const PieChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dadosPie, setDadosPie] = useState([]);
    const dataFinal = new Date();
    const dataInicial = new Date();
    dataInicial.setDate(1);
    //dataInicial.setMonth(0);

    const getPieChartData = () => {

    };

    const usedColors = new Set();

    const getRandomPastelColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        let isUnique = false;

        while (!isUnique) {
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            if (!usedColors.has(color)) {
                usedColors.add(color);
                isUnique = true;
            } else {
                color = "#";
            }
        }

        return color;
    };

    useEffect(() => {
        getPieChartData();
    }, []);

    //   if (dadosPie.length === 0) {
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
    //           registradas para este mês.
    //         </span>
    //       </div>
    //     );
    //   }

    return (
        <ResponsivePie
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
            data={mockPieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            tooltip={(point) => (
                <div
                    style={{
                        background: colors ? colors.grey[700] : "#f2f2f2",
                        color: colors ? colors.primary[100] : "#000000",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <div>Vendedor: {point.datum.label ? point.datum.label : ""}</div>
                    <div>
                        Valor:{" "}
                        {point.datum.value ? (
                            <span>
                                {Number(point.datum.value) >= 0 ? (
                                    <NumberFormat>{Number(point.datum.value)}</NumberFormat>
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
            legends={
                !isDashboard
                    ? [
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 25,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "top-to-bottom",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
                                    },
                                },
                            ],
                        },
                    ]
                    : []
            }
        />
    );
};

export default PieChart;
