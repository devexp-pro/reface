import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "../theme.ts";

const StyledStack = styled.div`
  & {
    display: flex;
    width: 100%;
  }

  &.vertical {
    flex-direction: column;
  }

  &.horizontal {
    flex-direction: row;
    align-items: center;
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
`;

type StackProps = {
  direction?: "vertical" | "horizontal";
  gap?: string;
  wrap?: boolean;
  align?: "stretch" | "start" | "end" | "center";
  justify?: "start" | "end" | "center" | "space-between";
  children: JSX.Element;
};

export const Stack = component((props: StackProps, children) => (
  <StyledStack
    class={[
      props.direction || "horizontal",
      props.wrap && "wrap",
      props.align,
      props.justify,
    ].filter(Boolean).join(" ")}
    style={`gap: ${props.gap || theme.spacing.md}`}
  >
    {children}
  </StyledStack>
));
