import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { RefaceUI, Stack, theme, TreeItem, TreeView } from "@reface-ui";
import { StoryViewer } from "./StoryViewer.tsx";

import type { Story, StoryFile } from "./loader.ts";

// В начале файла обновим иконки
const Icons = {
  folder: "📁",
  file: "📄",
  story: "📖",
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

const StoryGroup = styled.div`
  & {
    margin-bottom: ${theme.spacing.md};
  }

  & .group-header {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.weights.semibold};
    background: ${theme.colors.bg.base}40;
    border-radius: 4px;
  }
`;

const ComponentGroup = styled.div`
  & {
    margin-left: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.sm};
  }

  & .component-name {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    color: ${theme.colors.text.base};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
    position: relative;
  }

  & .component-name::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: ${theme.colors.accent.base};
    border-radius: 50%;
    opacity: 0.7;
  }
`;

const StoryLink = styled.a`
  & {
    display: block;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    padding-left: ${theme.spacing.xl};
    color: ${theme.colors.text.dimmed};
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${theme.typography.sizes.xs};
    transition: all 0.2s ease;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
    color: ${theme.colors.text.base};
  }

  &.active {
    background: ${theme.colors.accent.base};
    color: ${theme.colors.accent.base};
  }
`;

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
  console.log(props.stories);
  const currentStory = props.stories
    .flatMap((group) => group.stories)
    .find((story) => story.path === props.currentPath);
  const currentFile = props.stories.find((file) =>
    file.filePath === currentStory?.filePath
  );

  const componentMeta = currentFile?.meta;

  // Новая функция построения дерева
  const buildTree = (storyFiles: StoryFile[]): TreeNode[] => {
    const root: Record<string, TreeNode> = {};

    // Сначала создаем структуру папок из filePath
    storyFiles.forEach((group) => {
      group.stories.forEach((story) => {
        const filePath = story.filePath.replace(".story.tsx", "");
        const parts = filePath.split("/").filter(Boolean);

        // Создаем узлы для каждой части пути
        parts.reduce((parent, part, index) => {
          const fullPath = parts.slice(0, index + 1).join("/");

          if (!root[fullPath]) {
            const isLast = index === parts.length - 1;
            root[fullPath] = {
              id: fullPath,
              label: part,
              type: isLast ? "file" : "folder",
              children: [],
              expanded: true,
            };

            if (parent) {
              parent.children?.push(root[fullPath]);
            }
          }

          return root[fullPath];
        }, null as TreeNode | null);

        // Добавляем историю как дочерний узел к файлу
        const fileNode = root[filePath];
        if (fileNode) {
          const storyNode: TreeNode = {
            id: story.path,
            label: story.name,
            type: "story",
            story: story,
            expanded: story === currentStory,
          };
          fileNode.children = fileNode.children || [];
          fileNode.children.push(storyNode);
        }
      });
    });

    // Возвращаем только корневые узлы
    return Object.values(root).filter((node) => !node.id.includes("/"));
  };

  // Рекурсивный рендер узла
  const renderNode = (node: TreeNode) => (
    <TreeItem
      key={node.id}
      id={node.id}
      label={node.label}
      icon={Icons[node.type]}
      expanded={node.expanded}
      selected={node.story?.path === props.currentPath}
      href={node.story && node.story.path !== props.currentPath
        ? node.story.path
        : undefined}
    >
      {node.children?.map(renderNode)}
    </TreeItem>
  );

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
                {tree.map(renderNode)}
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
