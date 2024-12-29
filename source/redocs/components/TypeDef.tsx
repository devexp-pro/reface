import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type TsTypeDef } from "jsr:@deno/doc";

const TypeText = styled.span /*css*/`
  & {
    color: ${theme.colors.text.base};
  }
`;

const Keyword = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
  }
`;

export const TypeDef = component<{ type: TsTypeDef }>((props) => {
  const { type } = props;

  switch (type.kind) {
    case "keyword":
      return <Keyword>{type.keyword}</Keyword>;

    case "literal":
      return (
        <TypeText>
          {type.literal.kind === "string" && '"'}
          {type.literal.kind === "number" && type.literal.number}
          {type.literal.kind === "string" && type.literal.string}
          {type.literal.kind === "boolean" && type.literal.boolean.toString()}
          {type.literal.kind === "string" && '"'}
        </TypeText>
      );

    case "union":
      return (
        <TypeText>
          {type.union.map((t, i) => (
            <>
              {renderType(t)}
              {i < type.union.length - 1 && " | "}
            </>
          ))}
        </TypeText>
      );

    case "array":
      return <TypeText>{renderType(type.array)}[]</TypeText>;

    case "typeRef":
      return (
        <TypeText>
          {type.typeRef.typeName}
          {type.typeRef.typeParams && type.typeRef.typeParams.length > 0 && (
            <>
              &lt;{type.typeRef.typeParams.map((t, i) => (
                <>
                  {renderType(t)}
                  {i < type.typeRef.typeParams.length - 1 && ", "}
                </>
              ))}&gt;
            </>
          )}
        </TypeText>
      );

    default:
      return <TypeText>{type.repr}</TypeText>;
  }
});

export const renderType = (type: TsTypeDef) => <TypeDef type={type} />;
