const fs = require("node:fs"),
  assert = require("node:assert/strict"),
  { stripTypeScriptTypes } = require("node:module");
(async () => {
  const s = stripTypeScriptTypes(
    fs.readFileSync("src/data/financialModel.ts", "utf8"),
  );
  const m = await import(
    "data:text/javascript;base64," + Buffer.from(s).toString("base64")
  );
  assert.equal(m.totalListedCosts, 93000);
  assert.equal(m.remainingBalance, 7000);
  assert.equal(m.balanceRatio, 0.07);
  assert.equal(m.platformTotal, 33000);
  assert.equal(m.tacos, 0.2);
  assert.equal(m.acos, null);
  assert.deepEqual(
    m.steps.map((s) => s.after),
    [85000, 73000, 58000, 40000, 34000, 14000, 7000],
  );
  assert.equal(new Set(m.lineItems.map((x) => x.key)).size, 7);
  assert.equal(m.input.revenue * m.feeExamples.homeKitchen, m.input.referral);
  assert.equal(m.feeExamples.computers, 0.08);
  assert.equal(m.feeExamples.consumerElectronics, 0.08);
  assert(!("netProfit" in m));
  console.log(
    "PASS: all balances, fee examples, no duplicate categories, TACOS, ACOS unavailable and no net-profit calculation",
  );
})();
