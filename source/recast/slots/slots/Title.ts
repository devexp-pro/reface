import { createSlot } from "../slot.ts";
import { title } from "@reface/recast/elements";

export const TitleSlot = createSlot(
  "head.title",
  (content) => title`${content}`,
);
