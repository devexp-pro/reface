import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type DocNode } from "jsr:@deno/doc";
import { renderJsDoc } from "./JsDoc.tsx";
import { FunctionNode } from "./nodes/Function.tsx";
import { VariableNode } from "./nodes/Variable.tsx";
import { ClassNode } from "./nodes/Class.tsx";
import { InterfaceNode } from "./nodes/Interface.tsx";
import { TypeAliasNode } from "./nodes/TypeAlias.tsx";
import { EnumNode } from "./nodes/Enum.tsx";
import { NamespaceNode } from "./nodes/Namespace.tsx";
import { ImportNode } from "./nodes/Import.tsx";
import { ModuleDocNode } from "./nodes/ModuleDoc.tsx";

const Section = styled.section /*css*/`
  & {
    padding: ${theme.spacing.lg};
    background: ${theme.colors.bg.panel};
    border-radius: ${theme.sizes.sm};
    border: 1px solid ${theme.colors.border.base};
  }
`;

const NodeHeader = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};
  }
`;

const NodeName = styled.h2 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.sizeUtils.golden(5)};
    font-weight: ${theme.typography.weights.semibold};
  }
`;

const NodeKind = styled.span /*css*/`
  & {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: ${theme.colors.accent.base};
    color: ${theme.colors.text.inverse};
    border-radius: ${theme.sizes.xs};
    font-size: ${theme.sizeUtils.linear(6)};
    text-transform: capitalize;
  }
`;

const NodeContent = styled.div /*css*/`
  & {
    margin-top: ${theme.spacing.md};
  }
`;

export const DocNodeItem = component<{ node: DocNode }>((props) => (
  <Section>
    <NodeHeader>
      <NodeName>{props.node.name}</NodeName>
      <NodeKind>{props.node.kind}</NodeKind>
    </NodeHeader>
    {props.node.jsDoc && renderJsDoc(props.node.jsDoc)}
    <NodeContent>
      {(() => {
        switch (props.node.kind) {
          case "function":
            return <FunctionNode node={props.node} />;
          case "variable":
            return <VariableNode node={props.node} />;
          case "class":
            return <ClassNode node={props.node} />;
          case "interface":
            return <InterfaceNode node={props.node} />;
          case "typeAlias":
            return <TypeAliasNode node={props.node} />;
          case "enum":
            return <EnumNode node={props.node} />;
          case "namespace":
            return <NamespaceNode node={props.node} />;
          case "import":
            return <ImportNode node={props.node} />;
          case "moduleDoc":
            return <ModuleDocNode node={props.node} />;
          default:
            return <div>Unknown node type: {props.node.kind}</div>;
        }
      })()}
    </NodeContent>
  </Section>
));
