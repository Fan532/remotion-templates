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
  assert.equal(
    m.demo.bills.reduce((a, b) => a + b, 0),
    17000,
  );
  assert.equal(m.remaining, 3000);
  assert.equal(m.shortage, -7000);
  assert.deepEqual(
    m.demo.bills.reduce((a, b) => [...a, a[a.length - 1] - b], [m.demo.cash]),
    [20000, 14000, 11000, 3000],
  );
  assert.equal(m.totalFrames, 2274);
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
    "EP08: bills, waterfall endpoints, withdrawal shortfall, 2274 frames, 41 caption groups PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
