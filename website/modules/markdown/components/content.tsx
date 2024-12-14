import { styled } from "@reface/plugins/styled";
import { theme } from "../styles/theme.ts";
import { textStyles } from "../styles/utils.ts";

// Основной контейнер для markdown контента
export const Content = styled.main`
  & {
    flex: 1;
    min-width: 0;
    max-width: 48rem;
    padding: ${theme.spacing[6]};
    background: ${theme.colors.background.primary};
    border-radius: ${theme.borders.radius.lg};
    border: ${theme.borders.default};
  }

  @media (min-width: 768px) {
    & {
      padding: ${theme.spacing[8]};
    }
  }
`;

// Контейнер для документации
export const DocContent = styled.div`
  & {
    margin-bottom: ${theme.spacing[12]};
  }
`;

// Оглавление
export const TableOfContents = styled.nav`
  & {
    display: none;
    width: 16rem;
    padding: ${theme.spacing[6]};
    background: ${theme.colors.background.primary};
    border-radius: ${theme.borders.radius.lg};
    border: ${theme.borders.default};
    height: fit-content;
    position: sticky;
    top: ${theme.spacing[8]};
    flex-shrink: 0;
  }

  & h4 {
    font-size: ${theme.typography.sizes.sm};
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: ${theme.typography.tracking.wide};
    color: ${theme.colors.text.secondary};
    margin: 0 0 ${theme.spacing[4]};
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (min-width: 1024px) {
    &:not(.mobile) {
      display: block;
    }
  }

  @media (max-width: 1024px) {
    &.mobile {
      display: block;
    }
  }
`;

// Элементы оглавления
export const TocItem = styled.li`
  & {
    margin: ${theme.spacing[1]} 0;
  }
`;

export const TocLink = styled.a`
  & {
    ${textStyles}
    display: block;
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: ${theme.typography.sizes.sm};
    border-radius: ${theme.borders.radius.sm};
    transition: all 0.2s;
  }

  &:hover {
    color: ${theme.colors.text.primary};
    background: ${theme.colors.background.secondary};
  }

  &.active {
    color: ${theme.colors.text.link};
    background: rgba(37, 99, 235, 0.1);
    font-weight: var(--font-medium);
  }
`;
