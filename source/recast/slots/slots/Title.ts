import { createSlot } from "../slot.ts";

export const TitleSlot = createSlot(
  "head.title",
  (content: string[]) => `<title>${content.join(" | ")}</title>`,
);
