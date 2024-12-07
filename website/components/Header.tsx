import { createElement } from "@reface/jsx";
import type { Template } from "@reface/types";
import { styled } from "@reface/elements";

const Nav = styled.nav`
  & {
    display: flex;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  & {
    color: #333;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: background 0.2s;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const SocialLink = styled(NavLink)`
  & {
    font-size: 1.25rem;
  }

  &.github {
    color: #333;
  }

  &.discord {
    color: #7289da;
  }
`;

export function Header(): Template {
  return (
    <header class="container d-flex justify-content-between py-5">
      <Nav>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">FAQ</NavLink>
        <NavLink href="#">Tutorial</NavLink>
      </Nav>

      <Nav>
        <SocialLink 
          href="https://github.com/vseplet/reface" 
          class="github"
        >
          <i class="bi bi-github"></i>
        </SocialLink>

        <SocialLink 
          href="https://discord.gg/gT4gvVwqb8" 
          class="discord"
        >
          <i class="bi bi-discord"></i>
        </SocialLink>
      </Nav>
    </header>
  );
} 