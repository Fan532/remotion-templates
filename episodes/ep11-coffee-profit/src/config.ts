import config from "./config.json";
export const demo = config;
export const input = config.input;
const scenario = (s: typeof input.last) => ({
  ...s,
  unitContribution: s.price - s.variableCost,
  revenue: s.price * s.cups,
  totalContribution: (s.price - s.variableCost) * s.cups,
});
export const model = {
  last: scenario(input.last),
  current: scenario(input.current),
  volumeGrowth: (input.current.cups - input.last.cups) / input.last.cups,
  contributionChange:
    ((input.current.price - input.current.variableCost) * input.current.cups -
      (input.last.price - input.last.variableCost) * input.last.cups) /
    ((input.last.price - input.last.variableCost) * input.last.cups),
};
export const totalFrames = Math.ceil(demo.duration * demo.fps);
export type LabelKey = keyof typeof config.labels;

export const formatLabel=(text:string)=>text.split('{lastUnit}').join('$'+model.last.unitContribution).split('{currentUnit}').join('$'+model.current.unitContribution).split('{iconCups}').join(String(demo.iconCups));
