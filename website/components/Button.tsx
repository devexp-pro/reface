import { component, styled } from "@recast";

const StyledButton = styled.a /*css*/`
  & {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
    text-decoration: none;
  }

  &.button--primary {
    background: var(--color-primary);
    color: white;
  }

  &.button--primary:hover {
    background: var(--color-primary-dark);
  }

  &.button--secondary {
    background: var(--color-background);
    color: var(--color-text);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &.button--secondary:hover {
    background: var(--color-background-alt);
  }
`;

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
};

export const Button = component((props: ButtonProps, children: JSX.Element) => (
  <StyledButton
    href={props.href}
    class={`button--${props.variant || "primary"}`}
  >
    {children}
  </StyledButton>
));
