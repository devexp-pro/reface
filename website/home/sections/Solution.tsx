import { component, styled } from "@recast";
import { Code, Icon } from "@reface-ui";
import { Section } from "../../components/Section.tsx";

const Benefits = styled.div /*css*/`
  & {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 768px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;

const Benefit = styled.div /*css*/`
  & {
    text-align: center;
  }

  & .benefit__icon {
    width: 3rem;
    height: 3rem;
    font-size: 3rem !important;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  & .benefit__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  & .benefit__text {
    color: var(--color-text-light);
  }
`;

const CodeExample = styled.div /*css*/`
  & {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    overflow-x: auto;
  }
`;

export function Solution() {
  return (
    <Section
      variant="solution"
      title="Reface – Minimalism and Performance"
      subtitle="We've created a tooling ecosystem that works simply and efficiently."
    >
      <Benefits>
        <Benefit>
          <Icon name="Lightning" class="benefit__icon" />
          <h3 class="benefit__title">Zero-Build</h3>
          <p class="benefit__text">No build steps required</p>
        </Benefit>

        <Benefit>
          <Icon name="Package" class="benefit__icon" />
          <h3 class="benefit__title">Complete Ecosystem</h3>
          <p class="benefit__text">
            All modules work together seamlessly
          </p>
        </Benefit>

        <Benefit>
          <Icon name="Rocket" class="benefit__icon" />
          <h3 class="benefit__title">Quick Start</h3>
          <p class="benefit__text">Get started in minutes</p>
        </Benefit>
      </Benefits>

      <CodeExample>
        <Code
          clip
          code={`import { component } from "@recast";

const Button = component((props, children) => (
  <button class={["btn", props.variant]}>
    {children}
  </button>
));

// Usage
Button({ variant: "primary" })\`Click me\`
// <button class="btn primary">Click me</button>`}
        />
      </CodeExample>
    </Section>
  );
}
