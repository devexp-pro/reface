import type {
  BlockContent,
  Break,
  Code,
  Content,
  Definition,
  Delete,
  Emphasis,
  Heading,
  Image,
  InlineCode,
  Link,
  List,
  ListItem,
  Root,
  Strong,
  Table,
  TableCell,
  TableRow,
  Text,
  ThematicBreak,
} from "mdast";
import type { Template } from "../../../@reface/mod.ts";

export type TableOfContentsHeading = {
  level: number;
  text: string;
  slug: string;
};

export type ParsedMarkdown = {
  content: Template;
  headings: TableOfContentsHeading[];
};

export type MdNode =
  | Root
  | Content
  | BlockContent
  | Text
  | Heading
  | Link
  | Image
  | Strong
  | Emphasis
  | List
  | ListItem
  | InlineCode
  | Code
  | ThematicBreak
  | Break
  | Definition
  | Delete
  | Table
  | TableRow
  | TableCell;
