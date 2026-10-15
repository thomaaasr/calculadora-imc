// Define exatamente o que a tela pode pedir ao processo principal.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("imc", {
  calcular: (peso, altura) => ipcRenderer.invoke("imc:calcular", peso, altura),
});