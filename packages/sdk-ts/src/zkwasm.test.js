const { JSModule, verify } = require("../dist/zkwasm.js");

test("runs basic JSModule correctly", async () => {
  const mod = await JSModule.fromSource(`
    function add(a, b) {
        return a + b;
    }
    function subtract(a, b) {
        return a - b;
    }
  `);
  const a = Math.random();
  const b = Math.random();
  const { result, proof } = await mod.call("subtract", [a, b]);
  mod.destroy();
  expect(result).toBe(a - b);
  expect(await verify(proof)).toBe(true);
}, 15_000);
