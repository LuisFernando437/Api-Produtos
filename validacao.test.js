

const test = require("node:test");
const assert = require("node:assert/strict");
test("verificar se o preço é inválido", () => {
  const resultado = precoValido(-50);

  assert.equal(resultado, false);
});

function precoValido(preco) {
  return typeof preco === "number" && preco > 0;
}
test("verificar se o preço é válido", () => {
  const resultado = precoValido(150);
  assert.equal(resultado, true);
});