import { Reface } from "./framework/Reface/Reface.ts";

const refaceProxy = new Proxy(
  {},
  {
    get(_, prop) {
      const instance = Reface.getReface();
      if (!instance) {
        throw new Error(
          `Reface is not initialized yet. Call setup() before accessing '${
            String(prop)
          }'.`,
        );
      }
      return (instance as any)[prop];
    },
  },
);

export const setupReface = Reface.setup;
export const reface = refaceProxy as Reface;
