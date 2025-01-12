import { component, type Element, styled } from "@recast";

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
  slots?: {
    header: Element;
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
