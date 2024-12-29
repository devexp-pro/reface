import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Heading, Root } from "mdast";
import type {
  MdNode,
  ParsedMarkdown,
  TableOfContentsHeading,
} from "./types.ts";
import type { Template } from "../../../"@mod.ts";
import { components } from "./components/mod.ts";
import { component } from "@reface";

const parser = unified()
  .use(remarkParse)
  .use(remarkGfm);

function processNode(node: MdNode): Template {
  switch (node.type) {
    case "text":
      return <>{node.value}</>;

    case "strong":
      return (
        <components.strong>
          {node.children.map(processNode)}
        </components.strong>
      );

    case "emphasis":
      return (
        <components.em>
          {node.children.map(processNode)}
        </components.em>
      );

    case "link":
      const href = node.url.startsWith("./")
        ? node.url.replace("./", "/")
        : node.url;

      return (
        <components.a href={href} title={node.title || undefined}>
          {node.children.map(processNode)}
        </components.a>
      );

    case "image":
      return (
        <components.img
          src={node.url}
          alt={node.alt || undefined}
          title={node.title || undefined}
        />
      );

    case "paragraph":
      return (
        <components.p>
          {node.children.map(processNode)}
        </components.p>
      );

    case "heading":
      const Component = components[`h${node.depth}`];
      const slug = node.children
        .map((child) => child.type === "text" ? child.value : "")
        .join("")
        .toLowerCase()
        .replace(/[^\w]+/g, "-");

      return (
        <Component id={slug}>
          {node.children.map(processNode)}
        </Component>
      );

    case "list":
      const ListComponent = node.ordered ? components.ol : components.ul;
      return (
        <ListComponent start={node.start}>
          {node.children.map(processNode)}
        </ListComponent>
      );

    case "listItem":
      return (
        <components.li>
          {node.children.map(processNode)}
        </components.li>
      );

    case "inlineCode":
      return <components.code>{node.value}</components.code>;

    case "code":
      return (
        <components.pre
          content={node.value}
          language={node.lang || undefined}
          filename={node.meta || undefined}
        />
      );

    case "thematicBreak":
      return <components.hr />;

    case "break":
      return <br />;

    case "delete":
      return (
        <components.span>
          {node.children.map(processNode)}
        </components.span>
      );

    case "table":
      return (
        <components.table>
          <components.thead>
            <components.tr>
              {node.children[0].children.map((cell, i) => (
                <components.th
                  style={node.align?.[i]
                    ? `text-align: ${node.align[i]}`
                    : undefined}
                >
                  {cell.children.map(processNode)}
                </components.th>
              ))}
            </components.tr>
          </components.thead>
          <tbody>
            {node.children.slice(1).map((row) => (
              <components.tr>
                {row.children.map((cell, i) => (
                  <components.td
                    style={node.align?.[i]
                      ? `text-align: ${node.align[i]}`
                      : undefined}
                  >
                    {cell.children.map(processNode)}
                  </components.td>
                ))}
              </components.tr>
            ))}
          </tbody>
        </components.table>
      );

    case "blockquote":
      return (
        <components.blockquote>
          {node.children.map(processNode)}
        </components.blockquote>
      );

    case "root":
      return (
        <>
          {node.children.map(processNode)}
        </>
      );

    default:
      console.warn(`Unhandled node type: ${node.type}`);
      return <></>;
  }
}

export function parseMarkdown(content: string): ParsedMarkdown {
  const ast = parser.parse(content) as Root;

  const headings = ast.children
    .filter((node): node is Heading => node.type === "heading")
    .map((node) => ({
      level: node.depth,
      text: node.children
        .map((child) => child.type === "text" ? child.value : "")
        .join(""),
      slug: node.children
        .map((child) => child.type === "text" ? child.value : "")
        .join("")
        .toLowerCase()
        .replace(/[^\w]+/g, "-"),
    }));

  return {
    content: (
      <components.DocContent>
        {processNode(ast)}
      </components.DocContent>
    ),
    headings,
  };
}

export const TableOfContents = component<
  { headings: TableOfContentsHeading[]; className?: string }
>(
  ({ headings, className }) => {
    return (
      <components.TableOfContents class={className}>
        <components.h4>On this page</components.h4>
        <components.ul>
          {headings.map((heading) => (
            <components.TocItem
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <components.TocLink href={`#${heading.slug}`}>
                {heading.text}
              </components.TocLink>
            </components.TocItem>
          ))}
        </components.ul>
      </components.TableOfContents>
    );
  },
);

export const MarkdownContent = component((_, children) => {
  return (
    <components.Content>
      {children}
    </components.Content>
  );
});

export * from "./components/mod.ts";
export type { ParsedMarkdown };
