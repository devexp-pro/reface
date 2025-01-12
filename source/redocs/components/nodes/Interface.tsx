import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeInterface } from "jsr:@deno/doc";
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

const Members = styled.div /*css*/`
  & {
    margin-top: ${theme.spacing.md};
    padding-left: ${theme.spacing.lg};
  }
`;

const Member = styled.div /*css*/`
  & {
    margin: ${theme.spacing.sm} 0;
  }
`;

const Keyword = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
  }
`;

export const InterfaceNode = component<{ node: DocNodeInterface }>((props) => {
  const { interfaceDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>interface</Keyword> {props.node.name}
        {interfaceDef.extends.length > 0 && (
          <>
            <Keyword>extends</Keyword>{" "}
            {interfaceDef.extends.map(renderType).join(", ")}
          </>
        )}
      </Declaration>

      <Members>
        {interfaceDef.properties.map((prop) => (
          <Member>
            {prop.readonly && <Keyword>readonly</Keyword>}
            {prop.name}
            {prop.optional && "?"}
            {prop.tsType && <>: {renderType(prop.tsType)}</>}
          </Member>
        ))}

        {interfaceDef.methods.map((method) => (
          <Member>
            {method.name}
            {method.optional && "?"}
            ({method.params.map((param, i) => (
              <>
                {param.name}
                {param.tsType && <>: {renderType(param.tsType)}</>}
                {i < method.params.length - 1 && ", "}
              </>
            ))})
            {method.returnType && <>: {renderType(method.returnType)}</>}
          </Member>
        ))}
      </Members>
    </Container>
  );
});

export const renderInterface = (node: DocNodeInterface) => (
  <InterfaceNode node={node} />
);
