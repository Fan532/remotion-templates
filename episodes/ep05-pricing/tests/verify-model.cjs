const assert = require("node:assert/strict");
const fs = require("node:fs");
const { stripTypeScriptTypes } = require("node:module");
(async () => {
  const m = await import(
    "data:text/javascript;base64," +
      Buffer.from(
        stripTypeScriptTypes(fs.readFileSync("src/config.ts", "utf8")),
      ).toString("base64")
  );
  assert.deepEqual(
    m.planResults.map((x) => x.unitContribution),
    [10, 20, 30],
  );
  assert.deepEqual(
    m.planResults.map((x) => x.totalContribution),
    [10000, 14000, 12000],
  );
  assert.deepEqual(
    m.planResults.map((x) => x.operatingProfit),
    [2000, 6000, 4000],
  );
  assert.equal(
    m.planResults.reduce((a, b) =>
      a.operatingProfit > b.operatingProfit ? a : b,
    ).price,
    40,
  );
  assert.equal(m.totalFrames, 2283);
  assert.ok(
    m.totalFrames / m.demo.fps >= 75 && m.totalFrames / m.demo.fps <= 85,
  );
  assert.equal(m.demo.size.height - m.demo.safeHeight, 672);
  const t = m.demo.timings;
  assert.ok(
    t.plans < t.planB &&
      t.planB < t.planC &&
      t.planC < t.twist &&
      t.twist < t.profit &&
      t.profit < t.profitNumbers &&
      t.profitNumbers < t.ending &&
      t.ending < t.brand,
  );
  console.log(
    "EP05 data, winning price, duration, cue order and safe area PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
