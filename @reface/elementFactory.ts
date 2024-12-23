import { createElementTemplate } from "./elements.ts";

export const elementFactory = (tag: string) => {
  return createElementTemplate({ tag });
};
