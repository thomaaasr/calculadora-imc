// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { calcularImc, classificarImc } = require("../imc");

// Responde aos pedidos de cálculo vindos da tela, usando a regra testada.
ipcMain.handle("imc:calcular", (event, peso, altura) => {
  const imc = calcularImc(peso, altura);
  return { imc: Math.round(imc * 100) / 100, classificacao: classificarImc(imc) };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 520,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});