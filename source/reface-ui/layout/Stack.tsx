import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const StyledStack = styled.div`
  & {
    display: flex;
    width: 100%;
    min-height: 0;
  }

  &.vertical {
    flex-direction: column;
  }

  &.horizontal {
    flex-direction: row;
  }

  &.wrap {
    flex-wrap: wrap;
  }

  &.stretch {
    align-items: stretch;
  }

  &.start {
    align-items: flex-start;
  }

  &.end {
    align-items: flex-end;
  }

  &.center {
    align-items: center;
  }

  &.space-between {
    justify-content: space-between;
  }

  & > * {
    flex: 1;
    min-width: 0;
    min-height: 0;
  }
`;

type StackProps = {
  direction?: "vertical" | "horizontal";
  gap?: "none" | "xs" | "sm" | "md" | "lg";
  wrap?: boolean;
  align?: "stretch" | "start" | "end" | "center";
  justify?: "start" | "end" | "center" | "space-between";
};

export const Stack = component((props: StackProps, children) => (
  <StyledStack
    class={[
      `stack-${props.direction || "horizontal"}`,
      props.direction || "horizontal",
      props.wrap && "wrap",
      props.align || "stretch",
      props.justify,
      props.gap === "none" && "no-gap",
    ].filter(Boolean).join(" ")}
    style={props.gap !== "none"
      ? `gap: ${theme.spacing[props.gap || "md"]}`
      : ""}
  >
    {children}
  </StyledStack>
));
