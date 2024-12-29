import { styled } from "@recast";
import { theme } from "@reface-ui";

// Text Components
export const p = styled.p /*css*/`
  & {
    color: ${theme.colors.text.base};
    margin: ${theme.spacing.md} 0;
    line-height: 1.8;
    font-size: ${theme.sizeUtils.linear(7)}; // 14px
  }
`;

export const strong = styled.strong /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-weight: ${theme.typography.weights.semibold};
  }
`;

export const img = styled.img /*css*/`
  & {
    max-width: 100%;
  }
`;

export const del = styled.del /*css*/`
  & {
    color: ${theme.colors.text.dimmed};
  }
`;

export const em = styled.em /*css*/`
  & {
    font-style: italic;
    color: ${theme.colors.text.dimmed};
  }
`;

// Heading Components
export const h1 = styled.h1 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.sizeUtils.golden(6)}; // ~34px
    font-weight: ${theme.typography.weights.bold};
    margin: ${theme.sizeUtils.linear(12)} 0 ${
  theme.sizeUtils.linear(6)
}; // 24px 0 12px
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
  }
`;

export const h2 = styled.h2 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.sizeUtils.golden(5)}; // ~21px
    font-weight: ${theme.typography.weights.semibold};
    margin: ${theme.sizeUtils.linear(10)} 0 ${
  theme.sizeUtils.linear(5)
}; // 20px 0 10px
  }
`;

export const h3 = styled.h3 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.sizeUtils.golden(4)}; // ~13px
    font-weight: ${theme.typography.weights.semibold};
    margin: ${theme.sizeUtils.linear(8)} 0 ${
  theme.sizeUtils.linear(4)
}; // 16px 0 8px
  }
`;

// Link Component
export const a = styled.a /*css*/`
  & {
    color: ${theme.colors.accent.base};
    text-decoration: none;
  }

  &:hover {
    color: ${theme.colors.accent.hover};
    text-decoration: underline;
  }
`;

// Code Components
export const code = styled.code /*css*/`
  & {
    font-family: ${theme.typography.fonts.mono};
    font-size: 0.9em;
    background: ${theme.colors.bg.input};
    color: ${theme.colors.text.base};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.sizes.xs};
  }
`;

export const pre = styled.pre /*css*/`
  & {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.sizeUtils.linear(6)}; // 12px
    background: ${theme.colors.bg.input};
    color: ${theme.colors.text.base};
    padding: ${theme.sizeUtils.linear(8)}; // 16px
    border-radius: ${theme.sizes.sm};
    overflow-x: auto;
    margin: ${theme.spacing.lg} 0;
    line-height: 1.6;
  }

  & code {
    background: none;
    padding: 0;
    font-size: inherit;
  }
`;

// List Components
export const ul = styled.ul /*css*/`
  & {
    list-style-type: disc;
    padding-left: ${theme.sizeUtils.linear(10)}; // 20px
    margin: ${theme.spacing.lg} 0;
    color: ${theme.colors.text.base};
    line-height: 1.8;
  }

  & ul {
    margin: ${theme.spacing.xs} 0;
  }
`;

export const ol = styled.ol /*css*/`
  & {
    list-style-type: decimal;
    padding-left: ${theme.sizeUtils.linear(10)}; // 20px
    margin: ${theme.spacing.lg} 0;
    color: ${theme.colors.text.base};
    line-height: 1.8;
  }

  & ol {
    margin: ${theme.spacing.xs} 0;
  }
`;

export const li = styled.li /*css*/`
  & {
    margin: ${theme.spacing.sm} 0;
    padding-left: ${theme.spacing.sm};
  }

  &::marker {
    color: ${theme.colors.text.dimmed};
  }
`;

// Table Components
export const table = styled.table /*css*/`
  & {
    width: 100%;
    border-collapse: collapse;
    margin: ${theme.spacing.lg} 0;
    font-size: ${theme.sizeUtils.linear(6.5)}; // 13px
  }
`;

export const thead = styled.thead /*css*/`
  & {
    background: ${theme.colors.bg.panelLight};
    border-bottom: 2px solid ${theme.colors.border.base};
  }
`;

export const tr = styled.tr /*css*/`
  & {
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const th = styled.th /*css*/`
  & {
    text-align: left;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text.label};
  }
`;

export const td = styled.td /*css*/`
  & {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
`;

// Other Components
export const blockquote = styled.blockquote /*css*/`
  & {
    border-left: 4px solid ${theme.colors.accent.base};
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    margin: ${theme.spacing.xl} 0;
    background: ${theme.colors.bg.panel};
    color: ${theme.colors.text.dimmed};
    font-size: ${theme.sizeUtils.linear(7)}; // 14px
  }

  & > * {
    margin: ${theme.spacing.md} 0;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  & p {
    line-height: 1.8;
  }

  & blockquote {
    margin: ${theme.spacing.lg} 0;
    opacity: 0.8;
  }
`;

export const hr = styled.hr /*css*/`
  & {
    border: none;
    border-top: 1px solid ${theme.colors.border.base};
    margin: ${theme.spacing.xl} 0;
  }
`;

// Container Components
export const DocContent = styled.div /*css*/`
  & {
    max-width: 800px;
    margin: 0 auto;
    padding: ${theme.spacing.lg};
  }
`;

export const TableOfContents = styled.nav /*css*/`
  & {
    position: sticky;
    top: ${theme.spacing.lg};
    padding: ${theme.spacing.md};
  }
`;

export const TocItem = styled.li /*css*/`
  & {
    list-style: none;
    margin: ${theme.spacing.xs} 0;
  }
`;

export const TocLink = styled.a /*css*/`
  & {
    color: ${theme.colors.text.dimmed};
    text-decoration: none;
    font-size: ${theme.typography.sizes.sm};
    display: block;
    padding: ${theme.spacing.xs} 0;
  }

  &:hover {
    color: ${theme.colors.text.base};
  }
`;
