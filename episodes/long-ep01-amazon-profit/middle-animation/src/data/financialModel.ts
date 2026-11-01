export const input = {
  revenue: 100000,
  productCost: 15000,
  international: 12000,
  referral: 15000,
  fulfillment: 18000,
  storage: 6000,
  advertising: 20000,
  returns: 7000,
  comparisonUnitPrice: 20,
} as const;
export const feeExamples = {
  homeKitchen: 0.15,
  computers: 0.08,
  consumerElectronics: 0.08,
} as const;
export const lineItems = [
  {
    key: "product",
    zh: "商品采购",
    en: "Product Cost",
    amount: input.productCost,
  },
  {
    key: "international",
    zh: "国际物流",
    en: "International Logistics",
    amount: input.international,
  },
  {
    key: "referral",
    zh: "销售佣金",
    en: "Referral Fee",
    amount: input.referral,
  },
  {
    key: "fulfillment",
    zh: "订单履约",
    en: "FBA Fulfillment",
    amount: input.fulfillment,
  },
  {
    key: "storage",
    zh: "仓储及库存",
    en: "Storage & Inventory",
    amount: input.storage,
  },
  {
    key: "advertising",
    zh: "广告费用",
    en: "Advertising",
    amount: input.advertising,
  },
  {
    key: "returns",
    zh: "退货及其他",
    en: "Returns & Other",
    amount: input.returns,
  },
];
let remaining: number = input.revenue;
export const steps = lineItems.map((item) => {
  const before = remaining;
  remaining -= item.amount;
  return { ...item, before, after: remaining };
});
export const totalListedCosts = lineItems.reduce(
  (sum, item) => sum + item.amount,
  0,
);
export const remainingBalance = input.revenue - totalListedCosts;
export const balanceRatio = remainingBalance / input.revenue;
export const tacos = input.advertising / input.revenue;
export const acos: number | null = null;
export const platformTotal = input.referral + input.fulfillment;
export const money = (n: number, signed = false) =>
  (n < 0 ? "−" : signed ? "+" : "") +
  "$" +
  Math.round(Math.abs(n)).toLocaleString("en-US");
export const percent = (n: number) => Math.round(n * 100) + "%";
