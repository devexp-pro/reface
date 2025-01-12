import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeFunction } from "jsr:@deno/doc";
import { renderType } from "../TypeDef.tsx";

const Container = styled.div /*css*/`
  & {
    font-family: ${theme.typography.fonts.mono};
  }
`;

const Signature = styled.div /*css*/`
  & {
    color: ${theme.colors.text.base};
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
    border-radius: ${theme.sizes.xs};
    overflow-x: auto;
  }
`;

const Keyword = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
  }
`;

const ParamList = styled.div /*css*/`
  & {
    margin-top: ${theme.spacing.md};
  }
`;

export const FunctionNode = component<{ node: DocNodeFunction }>((props) => {
  const { functionDef } = props.node;

  return (
    <Container>
      <Signature>
        <Keyword>function</Keyword> {props.node.name}
        ({functionDef.params.map((param, i) => (
          <>
            {param.name}
            {param.tsType && <>: {renderType(param.tsType)}</>}
            {i < functionDef.params.length - 1 && ", "}
          </>
        ))})
        {functionDef.returnType && <>: {renderType(functionDef.returnType)}</>}
      </Signature>
    </Container>
  );
});

export const renderFunction = (node: DocNodeFunction) => (
  <FunctionNode node={node} />
);
