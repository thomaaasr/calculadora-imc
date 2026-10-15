window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const res = document.getElementById("resultado");

  btn.addEventListener("click", () => {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (!peso || !altura || peso <= 0 || altura <= 0) {
      res.textContent = "Informe peso e altura válidos!";
      return;
    }

    const imc = peso / (altura * altura);
    const imcFinal = imc.toFixed(1);

    let classificacao = "";
    if (imc < 18.5) classificacao = "magreza";
    else if (imc <= 24.9) classificacao = "eutrofia";
    else if (imc <= 29.9) classificacao = "sobrepeso";
    else if (imc <= 34.9) classificacao = "obesidade grau I";
    else if (imc <= 40) classificacao = "obesidade grau II";
    else classificacao = "obesidade grau III";

    res.innerHTML = `IMC: <strong>${imcFinal}</strong><br>${classificacao}`;
  });
});