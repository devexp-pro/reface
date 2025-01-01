import { component, styled } from "@reface/recast";

const StyledIcon = styled.span`
  & {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }
`;

type IconProps = {
  children?: JSX.Element;
  size?: number;
  rotate?: number;
};

export const Icon = component((props: IconProps, children) => (
  <StyledIcon
    style={`
      ${props.size ? `width: ${props.size}px; height: ${props.size}px;` : ""}
      ${props.rotate ? `transform: rotate(${props.rotate}deg);` : ""}
    `}
  >
    {children}
  </StyledIcon>
));
