export const demo = {
  fps: 30,
  size: { width: 1080, height: 1920 },
  safeHeight: 1248,
  // Scene durations in seconds: sales, payment rows, waterfall, comparison.
  durations: [3, 4, 4, 4],
  colors: {
    blue: "#168BFA",
    teal: "#00AB87",
    coral: "#F56862",
    purple: "#8756EB",
    yellow: "#FFD04B",
    ink: "#17304F",
    muted: "#64748B",
    line: "#DCE7F3",
  },
  sales: { previous: 100000, current: 130000 },
  flows: [
    { zh: "客户回款", en: "Customer Payments", value: 80000, color: "teal" },
    {
      zh: "新库存采购",
      en: "Inventory Payments",
      value: -50000,
      color: "blue",
    },
    {
      zh: "经营费用",
      en: "Operating Expenses",
      value: -20000,
      color: "purple",
    },
    {
      zh: "供应商旧账",
      en: "Previous Supplier Payments",
      value: -40000,
      color: "coral",
    },
  ],
} as const;
export const totalFrames = Math.round(
  demo.durations.reduce((a, b) => a + b, 0) * demo.fps,
);
export const cumulative = demo.flows.reduce<number[]>(
  (a, x) => [...a, (a[a.length - 1] ?? 0) + x.value],
  [],
);
export const netCash = demo.flows.reduce((a, x) => a + x.value, 0);
export const salesGrowth = (demo.sales.current / demo.sales.previous - 1) * 100;
