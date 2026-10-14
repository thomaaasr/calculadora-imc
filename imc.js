// Regras do IMC, separadas do servidor para poderem ser testadas.

function calcularImc(peso, altura) {
  return peso / (altura * altura);
}

function classificarImc(imc) {
  if (imc < 18.5) return "magreza";
  if (imc < 25) return "eutrofia";
  if (imc < 30) return "sobrepeso";
  if (imc < 35) return "obesidade grau I";
  if (imc < 40) return "obesidade grau II";
  return "obesidade grau III";
}

module.exports = { calcularImc, classificarImc };