import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeNamespace } from "jsr:@deno/doc";
import { DocNodeItem } from "../DocNode.tsx";
const Container = styled.div /*css*/`
  & {
    font-family: ${theme.typography.fonts.mono};
  }
`;

const Declaration = styled.div /*css*/`
  & {
    color: ${theme.colors.text.base};
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
    border-radius: ${theme.sizes.xs};
  }
`;

const Members = styled.div /*css*/`
  & {
    margin-top: ${theme.spacing.md};
    padding-left: ${theme.spacing.lg};
  }
`;

const Keyword = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
  }
`;

export const NamespaceNode = component<{ node: DocNodeNamespace }>((props) => {
  const { namespaceDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>namespace</Keyword> {props.node.name}
      </Declaration>

      <Members>
        {namespaceDef.elements.map((element) => <DocNodeItem node={element} />)}
      </Members>
    </Container>
  );
});

export const renderNamespace = (node: DocNodeNamespace) => (
  <NamespaceNode node={node} />
);
