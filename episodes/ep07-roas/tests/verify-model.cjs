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
    m.scenarios.map((s) => [
      s.revenue,
      s.variableCost,
      s.beforeAds,
      s.afterAds,
      s.roas,
    ]),
    [
      [5000, 3500, 1500, 500, 5],
      [3000, 2100, 900, -100, 3],
    ],
  );
  assert.equal(m.totalFrames, 2430);
  assert.equal(m.demo.size.height - m.demo.safeHeight, 672);
  const p = JSON.parse(fs.readFileSync("src/captions/timed.json", "utf8"));
  assert.equal(p.length, 41);
  let last = 0;
  for (const c of p) {
    assert.ok(c.start >= last && c.end > c.start && c.end <= m.demo.duration);
    last = c.end;
    assert.equal(c.characters.map((x) => x.text).join(""), c.zh);
    assert.equal(c.words.map((x) => x.text).join(" "), c.en);
    for (const xs of [c.characters, c.words])
      for (const x of xs) assert.ok(x.end > x.start && x.end <= c.end + 0.001);
  }
  console.log(
    "EP07: two scenario endpoints/ROAS,2430frames,41 bilingual subtitle groups PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
