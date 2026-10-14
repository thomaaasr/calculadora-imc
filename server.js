// server.js
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");

// Detectar o diretório real, mesmo dentro do .exe
const basePath = process.pkg
  ? path.dirname(process.execPath)
  : __dirname;

console.log(">> BasePath carregado:", basePath);

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(basePath, "public")));

// Forçar abrir o index.html corretamente
app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "public", "index.html"));
});

// API para calcular IMC
app.post("/api/imc", (req, res) => {
  const { peso, altura } = req.body;

  if (!peso || !altura) {
    return res.status(400).json({ error: "Envie peso e altura." });
  }

  const p = parseFloat(peso);
  const h = parseFloat(altura);

  if (!isFinite(p) || !isFinite(h) || p <= 0 || h <= 0) {
    return res
      .status(400)
      .json({ error: "Peso e altura devem ser números válidos." });
  }

  const imc = p / (h * h);
  const imcFinal = Math.round(imc * 10) / 10;

  let classificacao = "";
  if (imc < 18.5) classificacao = "magreza";
  else if (imc <= 24.9) classificacao = "eutrofia";
  else if (imc <= 29.9) classificacao = "sobrepeso";
  else if (imc <= 34.9) classificacao = "obesidade grau I";
  else if (imc <= 40) classificacao = "obesidade grau II";
  else classificacao = "obesidade grau III";

  return res.json({ imc: imcFinal, classificacao });
});

// Abrir navegador automaticamente
function abrirNavegador(url) {
  exec(`start "" "${url}"`);
}

const PORT = 3010;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  abrirNavegador(`http://localhost:${PORT}`);
});