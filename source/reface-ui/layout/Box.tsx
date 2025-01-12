import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const StyledBox = styled.div`
  & {
    box-sizing: border-box;
    width: 100%;
  }

  &.flex {
    display: flex;
  }

  &.grid {
    display: grid;
  }

  &.padding-sm { padding: ${theme.spacing.sm}; }
  &.padding-md { padding: ${theme.spacing.md}; }
  &.padding-lg { padding: ${theme.spacing.lg}; }

  &.border {
    border: 1px solid ${theme.colors.border.base};
    border-radius: 4px;
  }

  &.background {
    background: ${theme.colors.bg.panel};
  }
`;

type BoxProps = {
  display?: "flex" | "grid";
  padding?: "sm" | "md" | "lg";
  border?: boolean;
  background?: boolean;
};

export const Box = component((props: BoxProps, children) => (
  <StyledBox
    class={[
      props.display,
      props.padding && `padding-${props.padding}`,
      props.border && "border",
      props.background && "background",
    ].filter(Boolean).join(" ")}
  >
    {children}
  </StyledBox>
));
