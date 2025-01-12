import { component, styled } from "@recast";

const StyledLink = styled.a /*css*/`
  & {
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s;
  }

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  &:active {
    color: #1d4ed8;
  }

  &:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const Link = component((props, children) =>
  StyledLink(props)`${children}`
);
