import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeImport } from "jsr:@deno/doc";

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

const Keyword = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
  }
`;

export const ImportNode = component<{ node: DocNodeImport }>((props) => {
  const { importDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>import</Keyword>{" "}
        {importDef.imported ? `{ ${importDef.imported} }` : "*"}
        <Keyword>from</Keyword> "{importDef.src}"
      </Declaration>
    </Container>
  );
});

export const renderImport = (node: DocNodeImport) => <ImportNode node={node} />;
