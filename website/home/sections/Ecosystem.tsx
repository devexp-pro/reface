import { component, styled } from "@recast";
import { Icon } from "@reface-ui";
import { Section } from "../../components/Section.tsx";
import {
  ReCastLogo,
  ReDocsLogo,
  RefaceUILogo,
  ReStoryLogo,
} from "../../../source/reface-ui/reface/Logo.tsx";

const Container = styled.div /*css*/`
  & {
    padding: 4rem 0;
  }
`;

const Core = styled.div /*css*/`
  & {
    margin-bottom: 6rem;
    text-align: center;
  }
`;

const MainItem = styled.div /*css*/`
  & {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 4rem;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-primary-dark) 100%
    );
    color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.3);
  }

  & h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    & {
      padding: 2rem;
    }
  }
`;

const Features = styled.div /*css*/`
  & {
    display: flex;
    gap: 3rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    & {
      flex-direction: column;
      gap: 1.5rem;
    }
  }
`;

const Feature = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
  }

  & .core-feature__icon {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.5rem !important;
  }
`;

const Tools = styled.div /*css*/`
  & {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin-top: 6rem;
  }
`;

const Tool = styled.div /*css*/`
  & {
    padding: 2.5rem;
    background: var(--color-background);
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  [data-theme="dark"] & {
    background: var(--color-background-alt);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: translateY(-5px);
  }

  & .ecosystem-item__icon {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2.5rem !important;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
  }

  & h4 {
    color: var(--color-text);
    margin-bottom: 0.25rem;
    margin-top: 1.5rem;
  }

  & p {
    color: var(--color-text-light);
  }
`;

export function Ecosystem() {
  return (
    <Section
      variant="ecosystem"
      title="Complete Web Development Ecosystem"
      subtitle="All modules work together to make development easier"
    >
      <Container>
        <Core>
          <MainItem>
            <h3>Reface Framework</h3>
            <Features>
              <Feature>
                <Icon name="Stack" class="core-feature__icon" />
                <span>HTMX Integration</span>
              </Feature>
              <Feature>
                <Icon name="Globe" class="core-feature__icon" />
                <span>Hono Router</span>
              </Feature>
              <Feature>
                <Icon name="Lightning" class="core-feature__icon" />
                <span>Deno Runtime</span>
              </Feature>
            </Features>
            <Features>
              <Feature>
                <Icon name="puzzle-piece" class="core-feature__icon" />
                <span>Partial System</span>
              </Feature>
              <Feature>
                <Icon name="Cube" class="core-feature__icon" />
                <span>Island Architecture</span>
              </Feature>
            </Features>
          </MainItem>
        </Core>

        <Tools>
          <Tool>
            <ReCastLogo />
            <h4>Template Engine</h4>
            <p>Type-safe JSX and template literals</p>
          </Tool>

          <Tool>
            <ReStoryLogo />
            <h4>Component Development</h4>
            <p>Interactive component playground</p>
          </Tool>

          <Tool>
            <ReDocsLogo />
            <h4>Documentation System</h4>
            <p>API reference and guides</p>
          </Tool>

          <Tool>
            <RefaceUILogo />
            <h4>WebApp UI Framework</h4>
            <p>Ready-to-use components</p>
          </Tool>
        </Tools>
      </Container>
    </Section>
  );
}
