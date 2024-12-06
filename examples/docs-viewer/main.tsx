import { createElement } from "../../source/jsx/mod.ts";

import { Hono } from "@hono/hono";

import { Reface } from "../../source/Reface.ts";
import { clean } from "../../source/layouts/clean.ts";
import { styled } from "../../source/styled/mod.ts";

// Styled components
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

// Components
const DocsViewer = () => {
  const content = (
    <Container>
      <Header>
        <img src="/_assets/logo.svg" alt="Reface Logo" />
        <h1>Reface Documentation</h1>
      </Header>
      
      <Layout>
        <Navigation>
          <ul>
            <li><a href="/core">Core Concepts</a></li>
            <li><a href="/templates">Templates</a></li>
            <li><a href="/styling">Styling</a></li>
            <li><a href="/jsx">JSX Support</a></li>
            <li><a href="/layouts">Layouts</a></li>
          </ul>
        </Navigation>

        <Content>
          <h1>Welcome to Reface</h1>
          <p>
            Reface is a modern template engine that combines several powerful approaches:
            server-side rendering, islands architecture, and type safety.
          </p>

          <h2>Quick Start</h2>
          <pre><code>{`
import { Reface } from "@vseplet/reface";

const app = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
});
          `}</code></pre>
        </Content>
      </Layout>
    </Container>
  );

  return content;
};

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      title: "Reface Documentation",
      description: "Modern Template Engine for Server-Side Applications",
      favicon: "/_assets/favicon.ico",
      htmx: true,
      bootstrap: true,
    }),
  }).page("/", DocsViewer).hono(),
);

Deno.serve(app.fetch);