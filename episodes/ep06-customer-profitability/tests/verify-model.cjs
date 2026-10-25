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
    m.customers.map((x) => x.contribution),
    [2000, 3500],
  );
  assert.equal(m.advantage, 1500);
  assert.equal(m.totalFrames, 2464);
  assert.equal(m.demo.size.height - m.demo.safeHeight, 672);
  const t = m.demo.timings;
  assert.ok(
    t.aRevenue < t.aProduct &&
      t.aProduct < t.aService &&
      t.aService < t.aContribution &&
      t.aContribution < t.customerB,
  );
  assert.ok(
    t.bRevenue < t.bProduct &&
      t.bProduct < t.bService &&
      t.bService < t.bContribution &&
      t.bContribution < t.reversal,
  );
  assert.ok(t.reversal < t.delta && t.delta < t.ending && t.ending < t.brand);
  console.log(
    "EP06 financial endpoints, $1500 difference, cue order,2464frames and subtitle safe area PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
