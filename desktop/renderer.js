window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const res = document.getElementById("resultado");

  btn.addEventListener("click", async() => {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (!peso || !altura || peso <= 0 || altura <= 0) {
      res.textContent = "Informe peso e altura válidos!";
      return;
    }

    const { imc, classificacao } = await window.imc.calcular(peso, altura);

    res.innerHTML = `IMC: <strong>${imc}</strong><br>${classificacao}`;
  });
});