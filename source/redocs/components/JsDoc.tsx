import { component } from "@reface";
import { styled } from "@recast";
import { theme } from "@reface-ui";
import { type JsDoc, type JsDocTag } from "jsr:@deno/doc";

const Container = styled.div /*css*/`
  & {
    margin: ${theme.spacing.md} 0;
  }
`;

const Description = styled.div /*css*/`
  & {
    color: ${theme.colors.text.base};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.md};
  }
`;

const Tags = styled.div /*css*/`
  & {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const Tag = styled.div /*css*/`
  & {
    display: flex;
    gap: ${theme.spacing.sm};
    font-size: ${theme.sizeUtils.linear(6)};
  }
`;

const TagName = styled.span /*css*/`
  & {
    color: ${theme.colors.accent.base};
    font-family: ${theme.typography.fonts.mono};
  }
`;

const TagContent = styled.span /*css*/`
  & {
    color: ${theme.colors.text.dimmed};
  }
`;

function renderTag(tag: JsDocTag): JSX.Element {
  switch (tag.kind) {
    case "param":
      return (
        <Tag>
          <TagName>@param</TagName>
          {tag.type && <TagContent>{tag.type}</TagContent>}
          <TagContent>{tag.name}</TagContent>
          {tag.doc && <TagContent>- {tag.doc}</TagContent>}
        </Tag>
      );

    case "return":
      return (
        <Tag>
          <TagName>@returns</TagName>
          {tag.type && <TagContent>{tag.type}</TagContent>}
          {tag.doc && <TagContent>- {tag.doc}</TagContent>}
        </Tag>
      );

    case "example":
      return (
        <Tag>
          <TagName>@example</TagName>
          <TagContent>{tag.doc}</TagContent>
        </Tag>
      );

    case "deprecated":
      return (
        <Tag>
          <TagName>@deprecated</TagName>
          {tag.doc && <TagContent>{tag.doc}</TagContent>}
        </Tag>
      );

    default:
      if ("doc" in tag) {
        return (
          <Tag>
            <TagName>@{tag.kind}</TagName>
            <TagContent>{tag.doc}</TagContent>
          </Tag>
        );
      }
      return (
        <Tag>
          <TagName>@{tag.kind}</TagName>
        </Tag>
      );
  }
}

export const JsDocView = component<{ jsDoc: JsDoc }>((props) => (
  <Container>
    {props.jsDoc.doc && <Description>{props.jsDoc.doc}</Description>}
    {props.jsDoc.tags && (
      <Tags>
        {props.jsDoc.tags.map(renderTag)}
      </Tags>
    )}
  </Container>
));

export const renderJsDoc = (jsDoc: JsDoc) => <JsDocView jsDoc={jsDoc} />;
