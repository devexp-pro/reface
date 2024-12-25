import { theme } from "./theme.ts";

export const textStyles = `
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fonts.base};
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeight.normal};
`;

export const headingStyles = `
  color: ${theme.colors.text.primary};
  font-weight: var(--font-semibold);
  letter-spacing: ${theme.typography.tracking.tight};
  line-height: ${theme.typography.lineHeight.tight};
  margin-bottom: ${theme.spacing[4]};
`;

export const linkStyles = `
  color: ${theme.colors.text.link};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const codeStyles = `
  font-family: ${theme.typography.fonts.mono};
  font-size: ${theme.typography.sizes.sm};
  background: ${theme.colors.background.code};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borders.radius.sm};
`;

export const blockStyles = `
  margin: ${theme.spacing[4]} 0;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border: ${theme.borders.default};
  border-radius: ${theme.borders.radius.md};
`;
