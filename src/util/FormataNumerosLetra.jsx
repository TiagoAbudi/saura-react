import numeral from "numeral";

if (!numeral.locales["formatoString"]) {
  try {
    numeral.register("locale", "formatoString", {
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
  } catch (error) {
    window.location.reload();
  }
}

const formatValueLetters = (e) => {
  numeral.locale("formatoString");

  const price = numeral(Number(e));
  const formatted = price.format("$ 0.00a");

  return formatted;
};

export default formatValueLetters;
