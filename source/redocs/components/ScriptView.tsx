import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNode } from "jsr:@deno/doc";
import { DocNodeItem, renderDocNode } from "./DocNode.tsx";

const Container = styled.div /*css*/`
  & {
    max-width: 800px;
    margin: 0 auto;
    padding: ${theme.spacing.lg};
  }
`;

const Header = styled.header /*css*/`
  & {
    margin-bottom: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
  }
`;

const Title = styled.h1 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.sizeUtils.golden(6)};
    font-weight: ${theme.typography.weights.bold};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const Path = styled.div /*css*/`
  & {
    color: ${theme.colors.text.dimmed};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.sizeUtils.linear(7)};
  }
`;

const Content = styled.div /*css*/`
  & {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xl};
  }
`;

export interface ScriptViewProps {
  url: string;
  name: string;
  nodes: DocNode[];
}

export const ScriptView = component<ScriptViewProps>((props) => (
  <Container>
    <Header>
      <Title>{props.name}</Title>
      <Path>{props.url}</Path>
    </Header>
    <Content>
      {props.nodes.map((node) => <DocNodeItem node={node} />)}
    </Content>
  </Container>
));
