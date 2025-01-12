import { component, styled } from "@recast";

const StyledLogo = styled.div /*css*/`
  & {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Square = styled.div /*css*/`
  & {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5em;
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-primary-dark) 100%
    );
    border-radius: 0.25em;
    color: white;
    font-weight: 600;
    z-index: 1;
    box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.3);
  }
`;

const Text = styled.div /*css*/`
  & {
    font-weight: 800;
    white-space: nowrap;
    margin: 0.5em 0;
    margin-left: 1.75em;
    background: linear-gradient(to right,
      transparent 0%,
      var(--color-text) 30%,
      var(--color-text) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    animation: textReveal 0.5s ease-out 0.3s forwards;
  }

  [data-theme="dark"] & {
    background: linear-gradient(to right,
      transparent 0%,
      rgba(255, 255, 255, 0.9) 30%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes textReveal {
    from {
      opacity: 0;
      transform: translateX(-0.5em);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

type LogoProps = {
  class?: string;
  only?: boolean;
};

export const Logo = component((props: LogoProps) => (
  <StyledLogo class={props.class}>
    <Square>R</Square>
    {!props.only && <Text>eface</Text>}
  </StyledLogo>
));
