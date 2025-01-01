import { createSlot } from "../slot.ts";
import { title } from "@reface/elements";

export const Title = createSlot("head.title", (content) => title`${content}`);
