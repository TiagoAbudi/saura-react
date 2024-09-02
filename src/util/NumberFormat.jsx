import React from "react";
import numeral from "numeral";

numeral.register("locale", "teste", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  abbreviations: {
    thousand: "K",
    million: "M",
    billion: "B",
    trillion: "T",
  },
  currency: {
    symbol: "R$",
  },
});

const NumberFormat = ({ format, children }) => {
  numeral.locale("teste");

  const price = numeral(children);
  const formatted = price.format("$ 0.00a");

  return <span>{formatted}</span>;
};

export default NumberFormat;
