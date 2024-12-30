import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "../theme.ts";

// Типы для дерева
export type TreeNode = {
  id: string;
  label: string;
  icon?: JSX.Element;
};

type TreeViewProps = {
  selectedId?: string;
  expandedIds?: string[];
  href?: (id: string) => string;
  children?: JSX.Element;
};

// Стилизованные компоненты
const TreeContainer = styled.div`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.base};
  }
`;

const TreeItemStyled = styled.div`
  & {
    display: flex;
    align-items: center;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  &.selected {
    background: ${theme.colors.accent.base}20;
    color: ${theme.colors.accent.base};
  }
`;

const TreeItemContent = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    flex: 1;
  }

  & .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }

  & .label {
    flex: 1;
  }
`;

const TreeChildren = styled.div`
  & {
    margin-left: ${theme.spacing.md};
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    left: -${theme.spacing.xs};
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${theme.colors.border.base};
    opacity: 0.3;
  }

  &[data-hidden="true"] {
    display: none;
  }
`;

const ToggleIcon = styled.div`
  & {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.text.dimmed};
    transition: transform 0.2s ease;
  }

  &::before {
    content: '>';
    display: block;
    font-size: 10px;
    font-family: ${theme.typography.fonts.mono};
  }

  [data-expanded="true"] & {
    transform: rotate(90deg);
  }
`;

const TreeLink = styled.a`
  & {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

// Компонент для отдельного узла
export const TreeItem = component((props: {
  id: string;
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
  expanded?: boolean;
  href?: string;
}, children: JSX.Element) => {
  const { id, label, icon, selected, expanded, href } = props;
  const hasChildren = !!children.flat().length;
  const content = (
    <TreeItemStyled class={selected ? "selected" : ""}>
      <TreeItemContent>
        {hasChildren && (
          <ToggleIcon
            data-tree-toggle
            data-expanded={expanded}
          />
        )}
        {icon && <span class="icon">{icon}</span>}
        <span class="label">{label}</span>
      </TreeItemContent>
    </TreeItemStyled>
  );

  return (
    <div data-tree-node>
      {href ? <TreeLink href={href}>{content}</TreeLink> : content}
      {hasChildren && (
        <TreeChildren
          data-tree-children
          data-hidden={!expanded}
        >
          {children}
        </TreeChildren>
      )}
    </div>
  );
});

// Основной компонент TreeView
export const TreeView = component((props: {
  selectedId?: string;
  expandedIds?: string[];
  href?: (id: string) => string;
}, children: JSX.Element) => {
  return (
    <TreeContainer>
      {children}
    </TreeContainer>
  );
});
