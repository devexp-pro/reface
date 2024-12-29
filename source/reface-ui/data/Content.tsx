import { component, styled } from "@recast";
import { theme } from "../theme.ts";

export const Content = styled.div`
  & {
    color: ${theme.colors.text.base};
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    line-height: 1.6;
  }

  /* Заголовки */
  & h1 {
    font-size: ${theme.typography.sizes.lg};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text.base};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
    padding-bottom: ${theme.spacing.xs};
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  & h2 {
    font-size: ${theme.typography.sizes.md};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.base};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
  }

  & h3 {
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.dimmed};
    margin: ${theme.spacing.sm} 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Параграфы */
  & p {
    margin: ${theme.spacing.sm} 0;
  }

  /* Списки */
  & ul, & ol {
    margin: ${theme.spacing.sm} 0;
    padding-left: ${theme.spacing.lg};
  }

  & li {
    margin: ${theme.spacing.xs} 0;
  }

  & ul li::marker {
    color: ${theme.colors.text.dimmed};
  }

  /* Ссылки */
  & a {
    color: ${theme.colors.accent.base};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  /* Код */
  & code {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    background: ${theme.colors.bg.input};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  & pre {
    background: ${theme.colors.bg.input};
    padding: ${theme.spacing.sm};
    border-radius: 4px;
    overflow-x: auto;
    margin: ${theme.spacing.sm} 0;
  }

  & pre code {
    background: none;
    padding: 0;
  }

  /* Таблицы */
  & table {
    width: 100%;
    border-collapse: collapse;
    margin: ${theme.spacing.sm} 0;
    font-size: ${theme.typography.sizes.xs};
  }

  & th {
    text-align: left;
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.dimmed};
    border-bottom: 1px solid ${theme.colors.border.base};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }

  & td {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  & tr:last-child td {
    border-bottom: none;
  }

  /* Цитаты */
  & blockquote {
    margin: ${theme.spacing.sm} 0;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-left: 2px solid ${theme.colors.accent.base};
    background: ${theme.colors.bg.input};
    color: ${theme.colors.text.dimmed};
  }

  /* Изображения */
  & img {
    max-width: 100%;
    border-radius: 4px;
    margin: ${theme.spacing.sm} 0;
  }

  /* Разделитель */
  & hr {
    border: none;
    border-top: 1px solid ${theme.colors.border.base};
    margin: ${theme.spacing.md} 0;
  }

  /* Выделение текста */
  & strong {
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.base};
  }

  & em {
    font-style: italic;
    color: ${theme.colors.text.dimmed};
  }

  /* Клавиши */
  & kbd {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    background: ${theme.colors.bg.input};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    border: 1px solid ${theme.colors.border.base};
    box-shadow: 0 1px 0 ${theme.colors.border.base};
  }
`;
