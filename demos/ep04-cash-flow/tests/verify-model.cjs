const assert = require("node:assert/strict");
const fs = require("node:fs");
const { stripTypeScriptTypes } = require("node:module");
(async () => {
  const source = fs.readFileSync("src/config.ts", "utf8");
  const code = stripTypeScriptTypes(source);
  const model = await import(
    "data:text/javascript;base64," + Buffer.from(code).toString("base64")
  );
  assert.deepEqual(model.cumulative, [80000, 30000, 10000, -30000]);
  assert.equal(model.netCash, -30000);
  assert.ok(Math.abs(model.salesGrowth - 30) < 1e-9);
  assert.equal(model.totalFrames, 450);
  assert.equal(model.demo.size.height - model.demo.safeHeight, 672);
  assert.deepEqual(
    model.demo.flows.map((x) => Math.abs(x.value) / 80000),
    [1, 0.625, 0.25, 0.5],
  );
  console.log(
    "EP04 model: cumulative endpoints, net cash, sales growth, 450 frames, chart ratios and 35% safe area PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
