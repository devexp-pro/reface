import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeVariable } from "jsr:@deno/doc";
import { renderType } from "../TypeDef.tsx";

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

export const VariableNode = component<{ node: DocNodeVariable }>((props) => {
  const { variableDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>{variableDef.kind}</Keyword> {props.node.name}
        {variableDef.tsType && <>: {renderType(variableDef.tsType)}</>}
      </Declaration>
    </Container>
  );
});

export const renderVariable = (node: DocNodeVariable) => (
  <VariableNode node={node} />
);
