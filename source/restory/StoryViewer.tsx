import { type Children, component, styled } from "@recast";
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

const ViewerWrapper = styled.div /*css*/`
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
`;

type StoryViewerProps = {
  component?: () => Children;
  name?: string;
  path?: string;
  publicPath?: string;
};

export const StoryViewer = component((props: StoryViewerProps) => {
  return (
    <ViewerWrapper>
      <ViewerFrame
        src={`${
          props.publicPath || "/"
        }iframe/${props.path}?story=${props.name}`}
      />
    </ViewerWrapper>
  );
});
