import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { RefaceUI, Stack, theme, TreeItem, TreeView } from "@reface-ui";
import { StoryViewer } from "./StoryViewer.tsx";

import type { Story, StoryFile } from "./loader.ts";

// В начале файла обновим иконки
const Icons = {
  folder: "🗂️",
  file: "🧩",
  story: "📚",
};

// Styled компоненты для UI
const StoryLayout = styled.div`
  & {
    display: grid;
    grid-template-columns: 280px 1fr;
    height: 100vh;
    background: ${theme.colors.bg.base};
  }
`;

const Sidebar = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border-right: 1px solid ${theme.colors.border.base};
    overflow: auto;
  }
`;

const StoryNav = styled.div`
  & {
    padding: ${theme.spacing.sm};
  }
`;

const StyledGroupHeader = styled.div /*css*/`
  & {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.weights.semibold};
    background: ${theme.colors.bg.base};
    border-radius: 4px;
  }
`;

export const GroupHeader = component((props: { class?: string }, children) => (
  <StyledGroupHeader class={props.class}>{children}</StyledGroupHeader>
));

const Content = styled.div`
  & {
    padding: ${theme.spacing.lg};
    overflow: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Растягиваем Stack на всю доступную высоту */
  & > div {
    flex: 1;
    min-height: 0; /* Важно для корректной работы flex в Firefox */
    display: flex;
    flex-direction: column;
  }
`;

const StoryHeader = styled.div`
  & {
    margin-bottom: ${theme.spacing.lg};
  }

  & h1 {
    font-size: ${theme.typography.sizes.xl};
    color: ${theme.colors.text.base};
    margin: 0 0 ${theme.spacing.sm};
    font-weight: ${theme.typography.weights.semibold};
  }

  & .description {
    color: ${theme.colors.text.dimmed};
    font-size: ${theme.typography.sizes.sm};
    line-height: 1.6;
  }
`;

const Logo = styled.div`
  & {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .bracket {
    color: ${theme.colors.text.dimmed};
    opacity: 0.7;
  }

  & .name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .type {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.medium};
  }
`;

const DefaultLogo = () => (
  <Logo>
    <span class="bracket">{`{`}</span>
    <span class="name">Re</span>
    <span class="type">Story</span>
    <span class="bracket">{`}`}</span>
  </Logo>
);

type ReStoryProps = {
  stories: StoryFile[];
  currentPath: string;
  logo?: JSX.Element;
};

type TreeNode = {
  id: string;
  label: string;
  type: "folder" | "file" | "story";
  expanded: boolean;
  children?: TreeNode[];
  story?: Story;
};

export const ReStory = component((props: ReStoryProps) => {
  const currentStory = props.stories
    .flatMap((group) => group.stories)
    .find((story) => story.path === props.currentPath);
  const currentFile = props.stories.find((file) =>
    file.filePath === currentStory?.filePath
  );

  // Получаем части пути текущего файла
  const currentParts =
    currentStory?.filePath.replace(".story.tsx", "").split("/").filter(
      Boolean,
    ) || [];

  const componentMeta = currentFile?.meta;

  // Обновленная функция построения дерева
  const buildTree = (storyFiles: StoryFile[]): TreeNode[] => {
    const root: Record<string, TreeNode> = {};

    // Сначала создаем все узлы дерева
    storyFiles.forEach((group) => {
      group.stories.forEach((story) => {
        const filePath = story.filePath.replace(".story.tsx", "");
        const parts = filePath.split("/").filter(Boolean);

        // Создаем каждый уровень пути
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          const fullPath = parts.slice(0, i + 1).join("/");
          const parentPath = parts.slice(0, i).join("/");

          const isInCurrentPath = currentParts[i] === part;

          // Если узел еще не создан - создаем его
          if (!root[fullPath]) {
            const isLast = i === parts.length - 1;
            root[fullPath] = {
              id: fullPath,
              label: part,
              type: isLast ? "file" : "folder",
              children: [],
              expanded: isInCurrentPath,
            };
          }

          // Добавляем узел к родителю
          if (parentPath && root[parentPath]) {
            if (
              !root[parentPath].children?.find((child) => child.id === fullPath)
            ) {
              root[parentPath].children?.push(root[fullPath]);
            }
          }
        }

        // Добавляем историю как дочерний узел к файлу
        const fileNode = root[filePath];
        if (fileNode) {
          const storyNode: TreeNode = {
            id: story.path,
            label: story.name,
            type: "story",
            story: story,
            expanded: story.path === props.currentPath,
          };

          if (!fileNode.children?.find((child) => child.id === story.path)) {
            fileNode.children = fileNode.children || [];
            fileNode.children.push(storyNode);
          }
        }
      });
    });

    // Возвращаем только корневые узлы
    return Object.values(root).filter((node) => !node.id.includes("/"));
  };

  // Рекурсивный рендер узла
  const renderNode = (node: TreeNode, index: number, level = 0) => {
    if (level === 0) {
      return (
        <div key={node.id || index}>
          <GroupHeader>{node.label}</GroupHeader>
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex, level + 1)
          )}
        </div>
      );
    }

    return (
      <TreeItem
        label={node.label}
        icon={Icons[node.type]}
        selected={node.id === props.currentPath}
        expanded={node.expanded}
        href={node.type === "story" ? node.id : undefined}
      >
        {node.children?.map((child, childIndex) =>
          renderNode(child, childIndex, level + 1)
        )}
      </TreeItem>
    );
  };

  // Строим дерево из всех историй
  const tree = buildTree(props.stories);
  return (
    <RefaceUI>
      <StoryLayout>
        <Sidebar>
          <Stack direction="vertical" gap="0">
            {props.logo || <DefaultLogo />}
            <StoryNav>
              <TreeView>
                {tree.map((node, index) => renderNode(node, index))}
              </TreeView>
            </StoryNav>
          </Stack>
        </Sidebar>
        <Content>
          {currentStory
            ? (
              <Stack direction="vertical" gap={theme.spacing.lg}>
                {componentMeta && (
                  <StoryHeader>
                    <h1>{componentMeta.title}: {currentStory.name}</h1>
                    {componentMeta.description && (
                      <div class="description">{componentMeta.description}</div>
                    )}
                  </StoryHeader>
                )}
                <StoryViewer
                  component={currentStory.component}
                  path={currentStory.path}
                />
              </Stack>
            )
            : <div>Select a story from the sidebar</div>}
        </Content>
      </StoryLayout>
    </RefaceUI>
  );
});
