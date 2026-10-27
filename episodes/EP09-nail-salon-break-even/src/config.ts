export const input = {
  price: 60,
  customersPerDay: 8,
  days: 26,
  variablePerCustomer: 35,
  fixedCosts: 5000,
} as const;
export const model = {
  ...input,
  customers: input.days * input.customersPerDay,
  unitContribution: input.price - input.variablePerCustomer,
  revenue: input.price * input.days * input.customersPerDay,
  variableCosts: input.variablePerCustomer * input.days * input.customersPerDay,
  totalContribution:
    (input.price - input.variablePerCustomer) *
    input.days *
    input.customersPerDay,
  operatingProfit:
    (input.price - input.variablePerCustomer) *
      input.days *
      input.customersPerDay -
    input.fixedCosts,
  breakEvenCustomers:
    input.fixedCosts / (input.price - input.variablePerCustomer),
  breakEvenDaily:
    input.fixedCosts / (input.price - input.variablePerCustomer) / input.days,
};
export const demo = {
  fps: 30,
  size: { width: 1080, height: 1920 },
  safeHeight: 1248,
  duration: 58.174667,
  musicVolume: 0.17,
  colors: {
    blue: "#299FF0",
    teal: "#00B59C",
    coral: "#FF7F8D",
    purple: "#AB7CE7",
    yellow: "#FFD16B",
    ink: "#293B53",
    muted: "#748798",
    line: "#E4EAF2",
  },
  timings: {
    concept: 9.09,
    conceptName: 11.07,
    calculation: 17.31,
    guests: 19.77,
    revenue: 21.99,
    costs: 25.71,
    variable: 28.11,
    contribution: 29.55,
    monthly: 32.79,
    profit: 35.97,
    breakEven: 38.49,
    divide: 40.89,
    answer: 42.57,
    daily: 44.13,
    ending: 48.87,
    brand: 55.71,
  },
} as const;
export const totalFrames = Math.ceil(demo.duration * demo.fps);
