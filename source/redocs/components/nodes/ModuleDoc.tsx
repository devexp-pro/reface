import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeModuleDoc } from "jsr:@deno/doc";
import { renderJsDoc } from "../JsDoc.tsx";

const Container = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.panel};
    border-radius: ${theme.sizes.xs};
    border-left: 4px solid ${theme.colors.accent.base};
  }
`;

export const ModuleDocNode = component<{ node: DocNodeModuleDoc }>((props) => (
  <Container>
    {renderJsDoc(props.node.jsDoc)}
  </Container>
));

export const renderModuleDoc = (node: DocNodeModuleDoc) => (
  <ModuleDocNode node={node} />
);
