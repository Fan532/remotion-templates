export const demo = {
  fps: 30,
  size: { width: 1080, height: 1920 },
  safeHeight: 1248,
  duration: 75.781208,
  musicVolume: 0.24,
  colors: {
    blue: "#179CFA",
    teal: "#00B99B",
    coral: "#FF7B61",
    purple: "#9664ED",
    yellow: "#FFD159",
    ink: "#24364F",
    muted: "#708298",
    line: "#DEE8F2",
  },
  cash: 20000,
  bills: [6000, 3000, 8000],
  withdrawal: 10000,
  timings: {
    concept: 9.15,
    bills: 21.93,
    payroll: 28.47,
    rent: 30.39,
    supplier: 31.83,
    total: 33.99,
    waterfall: 36.87,
    deduct: 39.63,
    result: 42.57,
    withdraw: 44.13,
    conclusion: 48.69,
    brand: 73.17,
  },
} as const;
export const remaining = demo.cash - demo.bills.reduce((a, b) => a + b, 0);
export const shortage = remaining - demo.withdrawal;
export const totalFrames = Math.ceil(demo.duration * demo.fps);
