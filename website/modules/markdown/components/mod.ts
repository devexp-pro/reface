export * from "./base.tsx";
export * from "./code.tsx";
export * from "./content.tsx";

import * as base from "./base.tsx";
import { Code, InlineCode } from "./code.tsx";
import * as content from "./content.tsx";

export const components = {
  // Text components
  p: base.Paragraph,
  span: base.Text,
  strong: base.Strong,
  em: base.Emphasis,
  a: base.Link,

  // Heading components
  h1: base.H1,
  h2: base.H2,
  h3: base.H3,
  h4: base.H4,
  h5: base.H5,
  h6: base.H6,

  // Block components
  blockquote: base.Blockquote,
  hr: base.HorizontalRule,
  pre: Code,
  code: InlineCode,

  // List components
  ul: base.UnorderedList,
  ol: base.OrderedList,
  li: base.ListItem,

  // Table components
  table: base.Table,
  thead: base.TableHead,
  tr: base.TableRow,
  th: base.TableHeader,
  td: base.TableCell,
  img: base.Image,

  // Content components
  Content: content.Content,
  DocContent: content.DocContent,
  TableOfContents: content.TableOfContents,
  TocItem: content.TocItem,
  TocLink: content.TocLink,
};
