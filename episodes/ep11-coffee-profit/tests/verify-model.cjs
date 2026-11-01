const assert = require("node:assert/strict");
const fs = require("node:fs");
const { stripTypeScriptTypes } = require("node:module");
(async () => {
  let s = fs
    .readFileSync("src/config.ts", "utf8")
    .replace(
      /import config from ["']\.\/config\.json["'];/,
      "const config=" + fs.readFileSync("src/config.json", "utf8") + ";",
    );
  const { model: m, totalFrames } = await import(
    "data:text/javascript;base64," +
      Buffer.from(stripTypeScriptTypes(s)).toString("base64")
  );
  assert.deepEqual(
    [
      m.last.cups,
      m.last.price,
      m.last.variableCost,
      m.last.unitContribution,
      m.last.revenue,
      m.last.totalContribution,
    ],
    [500, 8, 3, 5, 4000, 2500],
  );
  assert.deepEqual(
    [
      m.current.cups,
      m.current.price,
      m.current.variableCost,
      m.current.unitContribution,
      m.current.revenue,
      m.current.totalContribution,
    ],
    [1000, 3, 2, 1, 3000, 1000],
  );
  assert.equal(m.volumeGrowth, 1);
  assert.equal(m.contributionChange, -0.6);
  assert(!("netProfit" in m));
  assert.equal(totalFrames, 2092);
  let c = JSON.parse(fs.readFileSync("src/captions/timed.json"));
  assert.equal(c.length, 37);
  for (let i = 0; i < c.length; i++) {
    assert(c[i].end > c[i].start);
    assert(c[i].end < 69.721);
    if (i) assert(c[i].start >= c[i - 1].end);
  }
  console.log(
    "Financial scenarios, growth rates, frame count and caption ordering: PASS",
  );
})();
