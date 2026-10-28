const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  { stripTypeScriptTypes } = require("node:module");
(async () => {
  const {
    model: m,
    totalFrames,
    demo,
  } = await import(
    "data:text/javascript;base64," +
      Buffer.from(
        stripTypeScriptTypes(fs.readFileSync("src/config.ts", "utf8")),
      ).toString("base64")
  );
  assert.deepEqual(
    [
      m.originalPrice,
      m.discountPrice,
      m.quantity,
      m.unitProductionCost,
      m.totalProductionCost,
      m.salesRevenue,
      m.grossProfit,
      m.grossPerLoaf,
      m.discardRevenue,
      m.incrementalCash,
      m.discountPercent,
    ],
    [6, 3, 50, 2, 100, 150, 50, 1, 0, 150, 50],
  );
  assert.equal(m.salesRevenue - m.totalProductionCost, m.grossProfit);
  assert.equal(
    m.salesRevenue - m.discardRevenue - m.extraSellingCosts,
    m.incrementalCash,
  );
  assert.equal(totalFrames, 1784);
  assert.equal(demo.safeHeight, 1248);
  const p = JSON.parse(fs.readFileSync("src/captions/timed.json"));
  assert.equal(p.length, 35);
  let last = 0;
  for (const c of p) {
    assert.ok(c.start >= last && c.end > c.start && c.end <= demo.duration);
    last = c.end;
    assert.equal(c.characters.map((x) => x.text).join(""), c.zh);
    assert.equal(c.words.map((x) => x.text).join(" "), c.en);
    for (const xs of [c.characters, c.words])
      for (const x of xs) assert.ok(x.end > x.start && x.end <= c.end + 0.001);
  }
  console.log(
    "EP10: 50 loaves, revenue/cost/gross profit/cash recovery, 1784 frames and 35 caption groups PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
