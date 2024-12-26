import { partial } from "../partial.ts";
import { styled } from "@reface/plugins/styled";

const DemoContainer = styled.div`
  & {
    padding: 3rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    margin: 4rem auto;
    max-width: 800px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    box-shadow: var(--shadow-sm);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-light);
  }

  & h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  & p.description {
    color: var(--color-text-light);
    margin-bottom: 2rem;
    font-size: var(--text-lg);
  }
`;

const PartialIcon = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6rem;
    height: 6rem;
    border-radius: 0.75rem;
    background: var(--color-primary);
    color: white;
    font-size: var(--text-xl);
    margin: 0 auto 1.5rem;
  }

  & svg {
    width: 4rem;
    height: 4rem;
  }
`;

const JokeText = styled.p`
  & {
    font-size: var(--text-xl);
    line-height: 1.6;
    color: var(--color-text);
    margin: 2rem 0;
    font-style: italic;
    min-height: 4rem;
    position: relative;
    padding: 0 2rem;
  }

  &::before,
  &::after {
    content: '"';
    position: absolute;
    font-size: 3rem;
    color: var(--color-primary);
    opacity: 0.2;
    font-family: serif;
  }

  &::before {
    left: 0;
    top: -1rem;
  }

  &::after {
    right: 0;
    bottom: -2rem;
  }
`;

const Button = styled.button`
  & {
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-1px);
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const JokePartial = partial(
  async () => {
    const joke = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    return <JokeText>${joke}</JokeText>;
  },
  "demo-joke",
);

export function DemoReface() {
  return (
    <DemoContainer>
      <PartialIcon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L19 5" strokeLinecap="round" />
          <path d="M5 19L7 17" strokeLinecap="round" />
          <path
            d="M19 5L20 4M16 8L17 7M14 4L15 3M20 8L21 7"
            strokeLinecap="round"
          />
        </svg>
      </PartialIcon>
      <h2>HTMX-First Interactions</h2>
      <p class="description">
        Create interactive components with zero JavaScript. Partials handle the
        server-side logic while HTMX manages the client updates.
      </p>

      <div>
        <JokePartial>
          <JokeText>Click the button to load a dad joke!</JokeText>
        </JokePartial>
        <Button {...JokePartial.trigger("click")}>
          Get New Joke
        </Button>
      </div>
    </DemoContainer>
  );
}
