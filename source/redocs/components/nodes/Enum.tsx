import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNodeEnum } from "jsr:@deno/doc";
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

export const EnumNode = component<{ node: DocNodeEnum }>((props) => {
  const { enumDef } = props.node;

  return (
    <Container>
      <Declaration>
        <Keyword>enum</Keyword> {props.node.name}
      </Declaration>

      <Members>
        {enumDef.members.map((member) => (
          <Member>
            {member.name}
            {member.init && <>= {renderType(member.init)}</>}
          </Member>
        ))}
      </Members>
    </Container>
  );
});

export const renderEnum = (node: DocNodeEnum) => <EnumNode node={node} />;
