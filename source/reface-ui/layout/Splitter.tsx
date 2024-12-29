import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const SplitterContainer = styled.div`
  & {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &.vertical {
    flex-direction: column;
  }

  &.horizontal {
    flex-direction: row;
  }
`;

const SplitterHandle = styled.div`
  & {
    background: ${theme.colors.border.base};
    transition: background 0.2s;
  }

  &.horizontal {
    cursor: col-resize;
    width: 4px;
    margin: 0 -2px;
    z-index: 1;
  }

  &.vertical {
    cursor: row-resize;
    height: 4px;
    margin: -2px 0;
    z-index: 1;
  }

  &:hover {
    background: ${theme.colors.accent.base};
  }
`;

type SplitterProps = {
  direction?: "vertical" | "horizontal";
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
};

export const Splitter = component<SplitterProps>((props, children) => {
  return (
    <SplitterContainer class={props.direction || "horizontal"}>
      <div style={`flex: 0 0 ${props.defaultSize || 200}px`}>
        {children?.[0]}
      </div>
      <SplitterHandle class={props.direction || "horizontal"} />
      <div style="flex: 1">
        {children?.[1]}
      </div>
    </SplitterContainer>
  );
});
