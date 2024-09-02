export const stringToDecimal = (stringComVirgula) => {
  // Substitui a vírgula por um ponto
  const stringComPonto = stringComVirgula.replace(",", ".");

  // Converte a string para um número de ponto flutuante
  const numeroDecimal = parseFloat(stringComPonto);

  return numeroDecimal;
};
