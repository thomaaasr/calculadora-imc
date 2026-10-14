const { test } = require("node:test");
const assert = require("node:assert/strict");
const { calcularImc, classificarImc } = require("./imc");

test("calcula o IMC", () => {
  assert.equal(calcularImc(70, 1.75).toFixed(1), "22.9");
});

test("classifica cada faixa", () => {
  assert.equal(classificarImc(18), "magreza");
  assert.equal(classificarImc(22), "eutrofia");
  assert.equal(classificarImc(27), "sobrepeso");
  assert.equal(classificarImc(32), "obesidade grau I");
  assert.equal(classificarImc(37), "obesidade grau II");
  assert.equal(classificarImc(45), "obesidade grau III");
});

test("respeita os limites entre as faixas", () => {
  assert.equal(classificarImc(24.95), "eutrofia");   // o bug que você corrigiu
  assert.equal(classificarImc(25), "sobrepeso");
  assert.equal(classificarImc(39.99), "obesidade grau II");
  assert.equal(classificarImc(40), "obesidade grau III");
});