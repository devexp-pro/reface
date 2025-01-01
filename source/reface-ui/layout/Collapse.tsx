import { component } from "@reface/recast";
import { styled } from "@reface/recast";
import { theme } from "../theme.ts";

const StyledCollapse = styled.div /*css*/`
  & {
    display: flex;
    flex-direction: column;
  }

  & .content {
    overflow: hidden;
    transition: height 0.2s ease;
  }

  & .content.collapsed {
    height: 0;
  }
`;

type CollapseProps = {
  expanded?: boolean;
  children: JSX.Element;
  slots?: {
    header: JSX.Element;
  };
};

export const Collapse = component((
  { expanded = false, slots, ...attrs }: CollapseProps,
  children,
) => (
  <StyledCollapse {...attrs}>
    {slots?.header}
    <div class={["content", !expanded && "collapsed"]}>
      {children}
    </div>
  </StyledCollapse>
));
