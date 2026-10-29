import config from "./config.json";
export const demo = config;
export const input = config.input;
export const model = {
  ...input,
  returnCost: input.returnShipping + input.handling,
  withReturnExtraResult:
    input.netRecovery - input.returnShipping - input.handling,
  savedBySkipping:
    input.noReturnExtraResult -
    (input.netRecovery - input.returnShipping - input.handling),
};
export const totalFrames = Math.ceil(demo.duration * demo.fps);
export type LabelKey = keyof typeof config.labels;
