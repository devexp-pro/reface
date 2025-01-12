import { component } from "@recast";
import { styled } from "@recast";
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
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "stretch";
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
    display: flex;
    flex-direction: column;
  }

  &.align-start { justify-content: flex-start; }
  &.align-center { justify-content: center; }
  &.align-end { justify-content: flex-end; }
  &.align-stretch { 
    justify-content: stretch;
    & > * { flex-grow: 1; }
  }

  &.justify-start { align-items: flex-start; }
  &.justify-center { align-items: center; }
  &.justify-end { align-items: flex-end; }
  &.justify-stretch { align-items: stretch; }
`;

export const Grid = component(
  (
    { columns, gap, align, justify, class: className, ...props },
    children,
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
  ({
    span = 1,
    offset,
    start,
    end,
    align,
    justify,
    class: className,
    ...props
  }, children) => {
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

    const classes = [
      align && `align-${align}`,
      justify && `justify-${justify}`,
      className,
    ].filter(Boolean).join(" ");

    return GridColContainer({
      ...props,
      class: classes,
      style: gridColumn ? `grid-column: ${gridColumn};` : undefined,
    })`${children}`;
  },
);
