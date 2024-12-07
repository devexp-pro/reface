import { createElement } from "@reface/jsx";
import { styled } from "@reface/elements";
import type { Template } from "@reface/types";

const StyledFooter = styled.footer`
  & {
    padding: 2rem 0;
    text-align: center;
    color: #6c757d;
  }
`;

export function Footer(): Template {
  return (
    <StyledFooter>
      <p>2024, Crafted with ♥️ by Vsevolod Pletnev</p>
    </StyledFooter>
  );
} 