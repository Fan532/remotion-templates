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
      m.customers,
      m.revenue,
      m.variableCosts,
      m.unitContribution,
      m.totalContribution,
      m.fixedCosts,
      m.operatingProfit,
      m.breakEvenCustomers,
    ],
    [208, 12480, 7280, 25, 5200, 5000, 200, 200],
  );
  assert.equal(m.breakEvenDaily, 200 / 26);
  assert.equal(Math.ceil(m.breakEvenDaily), 8);
  assert.equal(m.breakEvenCustomers * m.unitContribution - m.fixedCosts, 0);
  assert.equal(totalFrames, 1746);
  assert.equal(demo.safeHeight, 1248);
  const p = JSON.parse(fs.readFileSync("src/captions/timed.json"));
  assert.equal(p.length, 28);
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
    "EP09: unit/monthly results, exact break-even, 8/day profit, 1746 frames and 28 caption groups PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
