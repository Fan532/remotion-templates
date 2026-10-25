const assert = require("node:assert/strict");
const fs = require("node:fs");
const p = JSON.parse(fs.readFileSync("src/captions/timed.json", "utf8"));
assert.equal(p.length, 37);
let previous = 0;
for (const page of p) {
  assert.ok(page.start >= previous);
  assert.ok(page.end > page.start && page.end <= 82.106009);
  previous = page.end;
  for (const key of ["characters", "words"]) {
    const a = page[key];
    assert.ok(a.length > 0);
    let end = page.start - 0.04;
    for (const w of a) {
      assert.ok(w.start >= end - 0.02, JSON.stringify(w));
      assert.ok(w.end > w.start && w.end <= page.end + 0.001);
      end = w.end;
    }
  }
  assert.equal(page.characters.map((x) => x.text).join(""), page.zh);
  assert.equal(page.words.map((x) => x.text).join(" "), page.en);
}
const english = p.map((x) => x.en).join(" ");
for (const value of [
  "$20,000",
  "$10,000",
  "$14,000",
  "$4,000",
  "$2,000",
  "$6,000",
  "$500",
  "$3,500",
  "$1,500",
])
  assert.ok(english.includes(value), value);
console.log(
  "37 bilingual pages, Chinese character/English word timing, bounds and all financial amounts PASS",
);
