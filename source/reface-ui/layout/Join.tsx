import { component, styled } from "@reface/recast";
import { theme } from "../theme.ts";

const JoinContainer = styled.div`
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
`;

const Separator = styled.div`
  & {
    flex: 0 0 auto;
  }

  &.horizontal {
    width: 1px;
    height: 24px;
    background: ${theme.colors.border.base};
  }

  &.vertical {
    height: 1px;
    background: ${theme.colors.border.base};
  }
`;

type JoinProps = {
  direction?: "vertical" | "horizontal";
  gap?: string;
  separator?: JSX.Element;
  children: JSX.Element[];
};

export const Join = component((props: JoinProps, children) => (
  <JoinContainer
    class={props.direction || "horizontal"}
    style={`gap: ${props.gap || theme.spacing.md}`}
  >
    {children.map((child, index) => (
      <>
        {child}
        {index < children.length - 1 && (
          props.separator || (
            <Separator class={props.direction || "horizontal"} />
          )
        )}
      </>
    ))}
  </JoinContainer>
));
