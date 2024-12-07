import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/types";
import type { HTMLAttributes } from "../types/html.ts";
import { styled } from "@reface/elements";
import { Code } from "./Code.tsx";

const Hero = styled.div`
  & {
    padding: 4rem 0;
    text-align: center;
    background: linear-gradient(to bottom, #f8fafc, white);
  }
`;

const Title = styled.h1`
  & {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  & {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 42rem;
    margin: 0 auto 2rem;
  }
`;

const Badges = styled.div`
  & {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 3rem;
  }
`;

const Features = styled.div`
  & {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    max-width: 64rem;
    margin: 0 auto;
    padding: 2rem;
  }
`;

const Feature = styled.div`
  & {
    text-align: left;
    padding: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
  }

  & h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }

  & p {
    color: #64748b;
    line-height: 1.5;
  }
`;

const Example = styled.div`
  & {
    max-width: 64rem;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  & h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #0f172a;
  }
`;

const exampleCode = `
import { Reface, clean, component, island, RESPONSE } from "@vseplet/reface";
import { styled } from "@vseplet/reface/styled";

// Create styled component
const Button = styled.button\`
  & {
    background: var(--primary-color, #3182ce);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
  }
\`;

// Create interactive island
const Counter = island<{ increment: null }, { count: number }>({
  template: ({ props, rpc }) => (
    <div class="counter">
      <span id="count">{props.count}</span>
      <Button {...rpc.hx.increment()}>+1</Button>
    </div>
  ),
  rpc: {
    increment: async ({ args }) => {
      const newCount = args.count + 1;
      return RESPONSE(<span>{newCount}</span>);
    },
  },
});

// Create page component
const HomePage = component(() => (
  <div class="container">
    <h1>Welcome to Reface</h1>
    <Counter count={0} />
  </div>
));

// Setup application
const app = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
}).page("/", HomePage);

// Start server
Deno.serve(app.fetch);
`;

const Nav = styled.nav`
  & {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.a`
  & {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const NavLinks = styled.div`
  & {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
`;

const NavLink = styled.a`
  & {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  &:hover {
    color: #0f172a;
  }
`;

export function Home(): Template {
  return (
    <>
      <Nav>
        <Logo href="/">
          <span>🎭</span>
          Reface
        </Logo>
        <NavLinks>
          <NavLink href="/docs">Documentation</NavLink>
          <NavLink href="https://github.com/vseplet/reface" target="_blank" rel="noopener">
            GitHub
          </NavLink>
        </NavLinks>
      </Nav>
      <div style="padding-top: 4rem">
        <Hero>
          <Title>Reface</Title>
          <Subtitle>
            Modern template engine for building server-side applications with islands architecture
          </Subtitle>
          <Badges>
            <a href="https://jsr.io/@vseplet/reface" target="_blank" rel="noopener">
              <img src="https://jsr.io/badges/@vseplet/reface" alt="JSR" width="auto" height="20" />
            </a>
            <a href="https://jsr.io/@vseplet/reface" target="_blank" rel="noopener">
              <img src="https://jsr.io/badges/@vseplet/reface/score" alt="JSR Score" width="auto" height="20" />
            </a>
            <a href="https://discord.gg/gT4gvVwqb8" target="_blank" rel="noopener">
              <img 
                src="https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white" 
                alt="Discord"
                width="auto"
                height="20"
              />
            </a>
          </Badges>
        </Hero>

        <Features>
          <Feature>
            <h3>🚀 Zero Build Step</h3>
            <p>No bundling, no transpiling, just run</p>
          </Feature>
          <Feature>
            <h3>🏝️ Islands Architecture</h3>
            <p>Interactive components with server-side rendering</p>
          </Feature>
          <Feature>
            <h3>💅 Modern Styling</h3>
            <p>CSS-in-JS with theme support</p>
          </Feature>
          <Feature>
            <h3>🔒 Type Safe</h3>
            <p>Full TypeScript support</p>
          </Feature>
          <Feature>
            <h3>📱 TWA Ready</h3>
            <p>First-class support for Telegram Web Apps</p>
          </Feature>
        </Features>

        <Example>
          <h2>Quick Example</h2>
          <Code 
            content={exampleCode.trim()} 
            language="typescript" 
            filename="example.ts"
          />
        </Example>
      </div>
    </>
  );
} 