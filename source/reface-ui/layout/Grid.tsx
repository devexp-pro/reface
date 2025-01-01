import { component } from "@reface/recast";
import { styled } from "@reface/recast";
import { theme } from "../theme.ts";

type GridProps = {
  columns?: number | string;
  gap?: keyof typeof theme.spacing;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  class?: string;
};

type GridColProps = {
  span?: number;
  offset?: number;
  start?: number;
  end?: number;
  class?: string;
};

const GridContainer = styled.div /*css*/`
  & {
    display: grid;
    width: 100%;
  }

  &.columns-auto {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  &.align-start { align-items: start; }
  &.align-center { align-items: center; }
  &.align-end { align-items: end; }
  &.align-stretch { align-items: stretch; }

  &.justify-start { justify-content: start; }
  &.justify-center { justify-content: center; }
  &.justify-end { justify-content: end; }
  &.justify-space-between { justify-content: space-between; }
  &.justify-space-around { justify-content: space-around; }

  &.gap-xs { gap: ${theme.spacing.xs}; }
  &.gap-sm { gap: ${theme.spacing.sm}; }
  &.gap-md { gap: ${theme.spacing.md}; }
  &.gap-lg { gap: ${theme.spacing.lg}; }
  &.gap-xl { gap: ${theme.spacing.xl}; }
`;

const GridColContainer = styled.div /*css*/`
  & {
    min-width: 0;
  }
`;

export const Grid = component(
  (
    { columns, gap, align, justify, class: className, ...props },
    children: JSX.Element,
  ) => {
    const gridTemplateColumns = typeof columns === "number"
      ? `repeat(${columns}, 1fr)`
      : columns === "auto"
      ? undefined
      : columns;

    const classes = [
      columns === "auto" && "columns-auto",
      align && `align-${align}`,
      justify && `justify-${justify}`,
      gap && `gap-${gap}`,
      className,
    ].filter(Boolean).join(" ");

    return GridContainer({
      ...props,
      class: classes,
      style: gridTemplateColumns
        ? `grid-template-columns: ${gridTemplateColumns};`
        : undefined,
    })`${children}`;
  },
);

export const GridCol = component(
  (
    { span = 1, offset, start, end, class: className, ...props },
    children: JSX.Element,
  ) => {
    let gridColumn = "";

    if (start) {
      gridColumn = `${start}`;
    } else if (offset) {
      gridColumn = `${offset + 1}`;
    }

    if (end) {
      gridColumn += ` / ${end}`;
    } else if (span) {
      gridColumn += gridColumn ? ` / span ${span}` : `span ${span}`;
    }

    return GridColContainer({
      ...props,
      class: className,
      style: gridColumn ? `grid-column: ${gridColumn};` : undefined,
    })`${children}`;
  },
);
