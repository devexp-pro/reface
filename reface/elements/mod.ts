import { createElementFactory } from "./factory.ts";
import type { HTMLAttributes } from "../core/Template.ts";

export * from "./elements.ts";

// Реэкспортируем styled
export { styled } from "./styled.ts";
export type { StyledComponent, StyledFactory } from "./styled.types.ts";
