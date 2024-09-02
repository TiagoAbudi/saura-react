import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NumberFormat from "../util/NumberFormat";
import { mockLineData } from "../data/mockData";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataFinal = new Date();
  const dataInicial = new Date();
  dataInicial.setDate(1);
  //dataInicial.setMonth(0);
  const [arrayData, setArrayData] = useState([
    {
      id: "valor",
      color: "#4cceac",
      data: [
        { x: "Sem dados", y: 0.0 },
        { x: "Sem dados", y: 0.0 },
      ],
    },
  ]);

  function dataAtualFormatada(date) {
    const dataString = date;
    const partesData = dataString.split("-");
    var data = new Date(partesData[0], partesData[1] - 1, partesData[2]),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear();

    return diaF + "/" + mesF + "/" + anoF;
  }

  let formatArray = (data) => {
    const arrayDataCopy = [...arrayData];
    arrayDataCopy[0].data = data.map((d) => ({
      x: dataAtualFormatada(d.datapedido),
      y: Number(d.valor).toFixed(2),
    }));
    setArrayData(arrayDataCopy);
  };

  const getLineChartData = async () => {

  };

  useEffect(() => {
    getLineChartData();
  }, []);

  // if (
  //   arrayData.length === 0 ||
  //   (arrayData.length === 1 && arrayData[0].data[0].x === "Sem dados")
  // ) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "250px",
  //         padding: "8px",
  //       }}
  //     >
  //       <span>
  //         O gráfico está vazio neste momento. Parece que ainda não há vendas
  //         registradas para o mês.
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <>
      <ResponsiveLine
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
              color: colors.primary[500],
            },
          },
        }}
        data={mockLineData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </>
  );
};

export default LineChart;
