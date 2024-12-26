import type { Template } from "@reface/template";
import { styled } from "@reface/plugins/styled";

const LogoIcon = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: white;
    font-weight: 600;
  }

  &.size-default {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    font-size: 1.25rem;
  }

  &.size-large {
    width: 8rem;
    height: 8rem;
    border-radius: 2.4rem;
    font-size: 4rem;
  }
`;

export const LogoText = styled.div`
  & {
    display: flex;
    flex-direction: column;
  }
`;

export const BrandName = styled.div`
  & {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
`;

export const BrandTagline = styled.div`
  & {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

export function Logo(
  { size = "default" }: { size?: "default" | "large" },
): Template {
  return <LogoIcon class={`size-${size}`}>R</LogoIcon>;
}
