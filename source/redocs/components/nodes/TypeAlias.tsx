import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeTypeAlias } from "jsr:@deno/doc";
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

export const TypeAliasNode = component<{ node: DocNodeTypeAlias }>((props) => {
  const { typeAliasDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>type</Keyword> {props.node.name}
        {typeAliasDef.typeParams.length > 0 && (
          <>
            &lt;{typeAliasDef.typeParams.map((param) => param.name).join(
              ", ",
            )}&gt;
          </>
        )} = {renderType(typeAliasDef.tsType)}
      </Declaration>
    </Container>
  );
});

export const renderTypeAlias = (node: DocNodeTypeAlias) => (
  <TypeAliasNode node={node} />
);
