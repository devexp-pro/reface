import { component, styled } from "@recast";
import { Icon } from "@reface-ui";
import { Section } from "../../components/Section.tsx";

const Grid = styled.div /*css*/`
  & {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
  }
`;

const Problem = styled.div /*css*/`
  & {
    padding: 2rem;
    background: var(--color-background-alt);
    border-radius: 1rem;
    transition: transform 0.2s;
  }

  &:hover {
    transform: translateY(-5px);
  }

  & .problem__icon {
    width: 3rem;
    height: 3rem;
    font-size: 3rem !important;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
  }

  & .problem__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  & .problem__text {
    color: var(--color-text-light);
  }
`;

export function Problems() {
  return (
    <Section
      variant="problems"
      title="Modern Development Challenges"
      subtitle="The web development world is overwhelmed with complex configurations, build steps, and redundant code."
    >
      <Grid>
        <Problem>
          <Icon name="Package" class="problem__icon" />
          <h3 class="problem__title">Complex Configuration</h3>
          <p class="problem__text">
            Large package.json files and intricate build setups
          </p>
        </Problem>

        <Problem>
          <Icon name="Code" class="problem__icon" />
          <h3 class="problem__title">Code Redundancy</h3>
          <p class="problem__text">
            Excessive boilerplate and repetitive patterns
          </p>
        </Problem>

        <Problem>
          <Icon name="Book" class="problem__icon" />
          <h3 class="problem__title">Constant Learning</h3>
          <p class="problem__text">
            Continuous need to learn new tools and frameworks
          </p>
        </Problem>

        <Problem>
          <Icon name="Clock" class="problem__icon" />
          <h3 class="problem__title">Slow Development</h3>
          <p class="problem__text">
            Time-consuming build processes and setup
          </p>
        </Problem>
      </Grid>
    </Section>
  );
}
