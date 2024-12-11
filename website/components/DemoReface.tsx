import { createElement } from "@reface/jsx";
import { RESPONSE } from "@reface/reface";
import { island } from "@reface/island";
import { styled } from "@reface/styled";

const DemoContainer = styled.div`
  & {
    padding: 2rem;
    background: var(--color-background);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    margin-bottom: 2rem;
  }

  & h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-primary);
  }
`;

const Button = styled.button`
  & {
    background: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  &:hover {
    background: var(--color-primary-dark);
  }
`;

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

export function DemoReface() {
  return (
    <DemoContainer>
      <h1>Welcome to Reface</h1>
      <Counter count={0} />
    </DemoContainer>
  );
} 