import {
  createElement,
  Fragment,
  Reface,
  styled,
  clean,
  type Template,
} from "../../source/mod.ts";
import { Hono } from "@hono/hono";

// Types
interface DocContent {
  content: string;
  headings: Array<{
    level: number;
    text: string;
    slug: string;
  }>;
}

interface DocPage {
  title: string;
  path: string;
  content: DocContent;
}

interface DocSection {
  title: string;
  pages: DocPage[];
}

interface DocsViewerProps {
  sections: DocSection[];
  currentPath?: string;
}

// Utils
import { loadDocs } from "./utils/docs.ts";

// Components
const Container = styled.div`
  & {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
`;

const Header = styled.header`
  & {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  & img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }

  & h1 {
    margin: 0;
    font-size: 2rem;
    color: #333;
  }
`;

const Navigation = styled.nav`
  & {
    width: 250px;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    margin-bottom: 0.5rem;
  }

  & a {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #0066cc;
    }
  }
`;

const Content = styled.main`
  & {
    flex: 1;
    padding: 1rem;
  }

  & h1, & h2, & h3 {
    color: #333;
    margin-top: 0;
  }

  & p {
    line-height: 1.6;
    color: #666;
  }

  & code {
    background: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }

  & pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
`;

const Layout = styled.div`
  & {
    display: flex;
    gap: 2rem;
  }
`;

const TableOfContents = styled.nav`
  & {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }
`;

const DocContent = styled.div`
  & {
    max-width: 800px;
  }

  & img {
    max-width: 100%;
  }
`;

const DocsViewer = ({ sections, currentPath = "" }: DocsViewerProps) => {
  // Find current page
  const currentPage = sections
    .flatMap(s => s.pages)
    .find(p => p.path === currentPath);

  return (
    <Container>
      <Header>
        <img src="/_assets/logo.svg" alt="Reface Logo" />
        <h1>Reface Documentation</h1>
      </Header>
      
      <Layout>
        <Navigation>
          {sections.map(section => (
            <div>
              <h3>{section.title}</h3>
              <ul>
                {section.pages.map(page => {
                  const fullPath = `${section.title}/${page.path}`;
                  return (
                    <li>
                      <a 
                        href={`/${fullPath}`}
                        class={currentPath === fullPath ? "active" : ""}
                      >
                        {page.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Navigation>

        <Content>
          {currentPage ? (
            <>
              <DocContent>
                {currentPage.content.content}
              </DocContent>
              <TableOfContents>
                <h4>On this page</h4>
                <ul>
                  {currentPage.content.headings.map(heading => (
                    <li 
                      style={`margin-left: ${(heading.level - 1) * 1}rem`}
                    >
                      <a href={`#${heading.slug}`}>{heading.text}</a>
                    </li>
                  ))}
                </ul>
              </TableOfContents>
            </>
          ) : (
            <p>Select a page from the navigation</p>
          )}
        </Content>
      </Layout>
    </Container>
  );
};

// App initialization
const sections = await loadDocs("./docs");

if (!sections.length) {
  console.error("No documentation sections found!");
}

const reface = new Reface({
  layout: clean({
    title: "Reface Documentation",
    description: "Modern Template Engine for Server-Side Applications",
    favicon: "/_assets/favicon.ico",
    htmx: true,
    bootstrap: true,
    head: `
      <link rel="stylesheet" href="https://esm.sh/prismjs@1.29.0/themes/prism.css">
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-core.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-markup.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-typescript.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-javascript.min.js"></script>
    `,
  }),
});

const app = new Hono()
  .get("/", (c) => c.redirect("/docs"))
  .route("/docs", 
    reface
      .page("/", () => <DocsViewer sections={sections} />)
      .page("/:section", ({ params }) => (
        <DocsViewer 
          sections={sections} 
          currentPath={params.section}
        />
      ))
      .page("/:section/:path", ({ params }) => (
        <DocsViewer 
          sections={sections} 
          currentPath={params.section + "/" + params.path} 
        />
      ))
      .hono()
  );

Deno.serve(app.fetch);