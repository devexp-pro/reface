import { createSlot } from "../slot.ts";
import { title } from "@recast/element";

export const TitleSlot = createSlot(
  "head.title",
  (content: string[]) => content.join(" | "),
);
