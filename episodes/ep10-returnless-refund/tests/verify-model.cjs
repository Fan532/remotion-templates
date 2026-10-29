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
  assert.equal(m.returnCost, 9);
  assert.equal(m.withReturnExtraResult, -4);
  assert.equal(m.noReturnExtraResult, 0);
  assert.equal(m.savedBySkipping, 4);
  assert.equal(m.price, m.refund);
  assert.equal(totalFrames, 2666);
  const cues = JSON.parse(fs.readFileSync("src/captions/timed.json"));
  for (let i = 0; i < cues.length; i++) {
    assert(cues[i].end > cues[i].start);
    assert(cues[i].end < 88.843);
    if (i) assert(cues[i].start >= cues[i - 1].end);
  }
  assert.equal(cues.length, 49);
  console.log(
    "Financial comparison, common refund, frame count and caption ordering: PASS",
  );
})();
