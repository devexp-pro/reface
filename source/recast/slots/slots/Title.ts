import type { SlotComponent } from "../types.ts";

import { createSlot } from "../slot.ts";

export const TitleSlot: SlotComponent = createSlot(
  "head.title",
  (content: string[]) => `<title>${content.join(" | ")}</title>`,
);
