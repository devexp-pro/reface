import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeClass } from "jsr:@deno/doc";
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

const Modifier = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.hover};
  }
`;

export const ClassNode = component<{ node: DocNodeClass }>((props) => {
  const { classDef } = props.node;

  return (
    <Container>
      <Declaration>
        {classDef.isAbstract && <Modifier>abstract</Modifier>}
        <Keyword>class</Keyword> {props.node.name}
        {classDef.extends && (
          <>
            <Keyword>extends</Keyword> {classDef.extends}
          </>
        )}
        {classDef.implements.length > 0 && (
          <>
            <Keyword>implements</Keyword>{" "}
            {classDef.implements.map(renderType).join(", ")}
          </>
        )}
      </Declaration>

      <Members>
        {classDef.constructors.map((ctor) => (
          <Member>
            <Keyword>constructor</Keyword>
            ({ctor.params.map((param, i) => (
              <>
                {param.name}
                {param.tsType && <>: {renderType(param.tsType)}</>}
                {i < ctor.params.length - 1 && ", "}
              </>
            ))})
          </Member>
        ))}

        {classDef.properties.map((prop) => (
          <Member>
            {prop.isStatic && <Modifier>static</Modifier>}
            {prop.readonly && <Modifier>readonly</Modifier>}
            {prop.accessibility && <Modifier>{prop.accessibility}</Modifier>}
            {prop.name}
            {prop.tsType && <>: {renderType(prop.tsType)}</>}
          </Member>
        ))}

        {classDef.methods.map((method) => (
          <Member>
            {method.isStatic && <Modifier>static</Modifier>}
            {method.accessibility && (
              <Modifier>{method.accessibility}</Modifier>
            )}
            {method.name}({method.functionDef.params.map((param, i) => (
              <>
                {param.name}
                {param.tsType && <>: {renderType(param.tsType)}</>}
                {i < method.functionDef.params.length - 1 && ", "}
              </>
            ))})
            {method.functionDef.returnType && (
              <>: {renderType(method.functionDef.returnType)}</>
            )}
          </Member>
        ))}
      </Members>
    </Container>
  );
});

export const renderClass = (node: DocNodeClass) => <ClassNode node={node} />;
