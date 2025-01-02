import { styled } from "@reface/recast";
import { theme } from "@reface/ui";

// Text Components
export const p = styled.p /*css*/`
  & {
    color: ${theme.colors.text.base};
    margin-bottom: ${theme.spacing.md};
    line-height: 1.6;
  }
`;

export const strong = styled.strong /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-weight: ${theme.typography.weights.semibold};
  }
`;

export const em = styled.em /*css*/`
  & {
    font-style: italic;
  }
`;

// Heading Components
export const h1 = styled.h1 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.typography.sizes.lg};
    font-weight: ${theme.typography.weights.bold};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
    padding-bottom: ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border.base};
  }
`;

export const h2 = styled.h2 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.typography.sizes.md};
    font-weight: ${theme.typography.weights.semibold};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
  }
`;

export const h3 = styled.h3 /*css*/`
  & {
    color: ${theme.colors.text.label};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.semibold};
    margin: ${theme.spacing.md} 0;
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
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
`;

export const pre = styled.pre /*css*/`
  & {
    font-family: ${theme.typography.fonts.mono};
    background: ${theme.colors.bg.panelDark};
    padding: ${theme.spacing.md};
    border-radius: 4px;
    overflow-x: auto;
    margin: ${theme.spacing.md} 0;
  }
`;

// List Components
export const ul = styled.ul /*css*/`
  & {
    list-style-type: disc;
    padding-left: ${theme.spacing.lg};
    margin: ${theme.spacing.md} 0;
  }
`;

export const ol = styled.ol /*css*/`
  & {
    list-style-type: decimal;
    padding-left: ${theme.spacing.lg};
    margin: ${theme.spacing.md} 0;
  }
`;

export const li = styled.li /*css*/`
  & {
    margin: ${theme.spacing.xs} 0;
  }
`;

// Table Components
export const table = styled.table /*css*/`
  & {
    width: 100%;
    border-collapse: collapse;
    margin: ${theme.spacing.md} 0;
  }
`;

export const thead = styled.thead /*css*/`
  & {
    background: ${theme.colors.bg.panelLight};
  }
`;

export const tr = styled.tr /*css*/`
  & {
    border-bottom: 1px solid ${theme.colors.border.base};
  }
`;

export const th = styled.th /*css*/`
  & {
    text-align: left;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text.label};
  }
`;

export const td = styled.td /*css*/`
  & {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

// Other Components
export const blockquote = styled.blockquote /*css*/`
  & {
    border-left: 4px solid ${theme.colors.border.base};
    padding: ${theme.spacing.md};
    margin: ${theme.spacing.md} 0;
    background: ${theme.colors.bg.panelLight};
    font-style: italic;
  }
`;

export const hr = styled.hr /*css*/`
  & {
    border: none;
    border-top: 1px solid ${theme.colors.border.base};
    margin: ${theme.spacing.lg} 0;
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
