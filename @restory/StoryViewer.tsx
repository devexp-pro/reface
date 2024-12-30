import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "@reface-ui";

const ViewerFrame = styled.iframe`
  & {
    width: 100%;
    height: 100%;
    border: none;
    background: ${theme.colors.bg.base};
    border-radius: 4px;
  }
`;

const ViewerWrapper = styled.div`
  & {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    background-color: ${theme.colors.bg.panel};
    background-image: 
      linear-gradient(rgba(130, 130, 130, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(130, 130, 130, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    pointer-events: none;
    z-index: 1;
  }

  /* Верхний левый уголок */
  &:before {
    top: 0;
    left: 0;
    border-top: 2px solid ${theme.colors.accent.base};
    border-left: 2px solid ${theme.colors.accent.base};
  }

  /* Нижний правый уголок */
  &:after {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid ${theme.colors.accent.base};
    border-right: 2px solid ${theme.colors.accent.base};
  }
`;

type StoryViewerProps = {
  component: () => JSX.Element;
  path: string;
};

export const StoryViewer = component((props: StoryViewerProps) => {
  return (
    <ViewerWrapper>
      <ViewerFrame
        src={`/iframe${props.path}`}
      />
    </ViewerWrapper>
  );
});
