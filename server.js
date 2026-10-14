// server.js
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { calcularImc, classificarImc } = require("./imc");

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

  const imc = calcularImc(p, h);
  const imcFinal = Math.round(imc * 10) / 10;

  const classificacao = classificarImc(imc);
  
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