import { createElement, Fragment } from "@reface/jsx";
import { styled } from "@reface/styled";
import { Code } from "../components/Code.tsx";
import { GITHUB_URL, DOCS_URL } from "../constants.ts";
import { DemoReface } from "../components/DemoReface.tsx";

const Hero = styled.div`
  & {
    padding: 6rem 2rem;
    text-align: center;
    background: linear-gradient(
      180deg, 
      var(--color-background) 0%,
      rgba(255, 255, 255, 0.8) 100%
    );
  }
`;

const HeroLogo = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    animation: fadeIn 0.6s ease-out;
  }
`;

const Title = styled.h1`
  & {
    font-size: var(--text-6xl);
    font-weight: var(--font-bold);
    letter-spacing: var(--tracking-tight);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    line-height: var(--leading-tight);
  }

  @media (max-width: 768px) {
    & {
      font-size: var(--text-4xl);
    }
  }
`;


const Feature = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    transition: all 0.2s ease-in-out;
    box-shadow: var(--shadow-sm);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-light);
  }
`;

const Example = styled.div`
  & h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: 1rem;
    letter-spacing: var(--tracking-tight);
  }

  & p {
    font-size: var(--text-lg);
    color: var(--color-text-light);
    max-width: 42rem;
    margin: 0 auto 3rem;
    line-height: var(--leading-relaxed);
  }
`;

const CodeWrapper = styled.div`
  & {
    position: relative;
    background: #1e293b;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    text-align: left;
    margin: 4rem auto;
    max-width: 800px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  & pre {
    margin: 0;
    padding: 0;
  }
`;

const Install = styled.div`
  & {
    max-width: 42rem;
    margin: 4rem auto 0;
    padding: 2rem;
    text-align: center;
  }

  & h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: 0.75rem;
    letter-spacing: var(--tracking-tight);
  }

  & p {
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
    font-size: var(--text-lg);
  }
`;

const InstallCommand = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--color-text);
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    max-width: 32rem;
    margin: 0 auto;
    box-shadow: var(--shadow-md);
  }

  & .prompt {
    color: #4ade80;
    user-select: none;
  }

  & code {
    color: #e2e8f0;
    flex: 1;
  }

  & button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
  }

  & button:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #e2e8f0;
  }

  @media (max-width: 768px) {
    & {
      font-size: var(--text-xs);
      padding: 0.75rem 1rem;
    }
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

const LogoIcon = styled.div`
  & {
    font-size: 4rem;
    line-height: 1;
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    border-radius: 2.4rem;
    color: white;
    font-weight: var(--font-bold);
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-lg);
  }
`;

const BrandName = styled.div`
  & {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: var(--tracking-tight);
  }
`;

const BrandTagline = styled.div`
  & {
    font-size: var(--text-lg);
    color: var(--color-text-light);
    margin-top: 0.5rem;
  }
`;

const HomeHeader = styled.header`
  & {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem;
  }
`;

const HomeHeaderLinks = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const HomeLink = styled.a`
  & {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    transition: all 0.2s;
  }

  &:hover {
    color: var(--color-primary);
  }

  & svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

const HomeGitHubButton = styled(HomeLink)`
  & {
    background: var(--color-text);
    color: white;
    border: none;
  }

  &:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-1px);
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover svg {
    transform: none;
  }
`;


const FeatureIcon = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    background: var(--color-primary);
    color: white;
    font-size: var(--text-xl);
  }

  & svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const FeatureTitle = styled.h3`
  & {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    letter-spacing: var(--tracking-tight);
    margin: 0;
    text-align: center;
  }
`;

const FeatureDescription = styled.p`
  & {
    font-size: var(--text-base);
    color: var(--color-text-light);
    line-height: var(--leading-relaxed);
    margin: 0;
    text-align: center;
    max-width: 24rem;
  }
`;

const Features = styled.div`
  & {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 0 auto;
    max-width: 64rem;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    & {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 0 1rem;
    }
  }
`;

export default function HomePage() {
  return (
    <>
      <HomeHeader>
        <HomeHeaderLinks>
          <HomeLink href={DOCS_URL}>
            Documentation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 7l5 5-5 5M5 12h13" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </HomeLink>
          <HomeGitHubButton href={GITHUB_URL} target="_blank">
            GitHub
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </HomeGitHubButton>
        </HomeHeaderLinks>
      </HomeHeader>

      <Hero>
        <HeroLogo>
          <LogoIcon>R</LogoIcon>
          <BrandName>Reface</BrandName>
          <BrandTagline>Modern Template Engine</BrandTagline>
        </HeroLogo>
        
        
        <Example>
        <h2 style={{marginBottom: "2rem"}}>Simple and Powerful</h2>
        <Features style={{marginBottom: "2rem"}}>
          <Feature>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>Zero Build Step</FeatureTitle>
            <FeatureDescription>
              No compilation required. Write your templates and run them directly with Deno.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>Type Safe</FeatureTitle>
            <FeatureDescription>
              Full TypeScript support with type checking for your templates and components.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>Component Based</FeatureTitle>
            <FeatureDescription>
              Create reusable components with JSX syntax and styled-components like API.
            </FeatureDescription>
          </Feature>
        </Features>
        <p>
            Create interactive web applications with minimal setup. 
            Reface combines the best of modern web development in a simple package.
          </p>
        </Example>
        <Install>
          <h2>Quick Start</h2>
          <p>Add Reface to your Deno project in one command</p>
          <InstallCommand>
            <span class="prompt">$</span>
            <code>deno add @devexp-pro/reface</code>
            <button 
              onClick={`navigator.clipboard.writeText("deno add @devexp-pro/reface");`}
              title="Copy to clipboard"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 5H7C5.89543 5 5 5.89543 5 7V13C5 14.1046 5.89543 15 7 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 11V3C3 1.89543 3.89543 1 5 1H11" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </InstallCommand>
        </Install>
      

        <DemoReface />

        <CodeWrapper>
          <Code 
            language="typescript" 
            content={exampleCode}
            filename="app.ts"
          />
        </CodeWrapper>

      </Hero>
    </>
  );
} 