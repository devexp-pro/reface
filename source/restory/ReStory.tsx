import { Child, component, styled } from "@recast";
import {
  Button,
  Code,
  Grid,
  GridCol,
  Panel,
  RefaceUI,
  Stack,
  theme,
  TreeItem,
  TreeView,
} from "@reface-ui";
import { StoryViewer } from "./StoryViewer.tsx";
import { Icon } from "@reface-ui";

import type { Story, StoryFile } from "./types.ts";
import { componentExpression } from "@recast/expressions";

const Icons = {
  folder: "folder",
  file: "file-code",
  story: "dot-outline",
  component: "puzzle-piece",
  components: "diamonds-four",
  external: "arrow-square-out",
};

const ExternalLink = styled.a /*css*/`
  & {
    color: ${theme.colors.text.dimmed};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    font-size: ${theme.typography.sizes.sm};
    justify-content: end;
  }

  &:hover {
    color: ${theme.colors.text.base};
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

const Content = styled.div /*css*/`
  & {
    overflow: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  & > div {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
`;

const StoryHeader = styled.div /*css*/`
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
  stories?: StoryFile[];
  currentPath?: string;
  currentStory?: string;
  logo?: Child;
  publicPath?: string;
};

type TreeNode = {
  id: string;
  label: string;
  type: "folder" | "file" | "story" | "components" | "component";
  expanded: boolean;
  children?: TreeNode[];
  story?: Story;
};

export const ReStory = component(
  (
    { stories, currentPath, currentStory: storyName, logo, publicPath = "/" }:
      ReStoryProps,
  ) => {
    const currentFile = stories?.find((file) => file.filePath === currentPath);
    const currentStory = currentFile?.stories.find((story) =>
      story.name === storyName
    );

    const currentParts =
      currentFile?.filePath.replace(".story.tsx", "").split("/").filter(
        Boolean,
      ) || [];

    const componentMeta = currentFile?.meta;

    const buildTree = (storyFiles?: StoryFile[]): TreeNode[] => {
      if (!storyFiles) return [];

      const root: Record<string, TreeNode> = {};

      storyFiles.forEach((group) => {
        const getNodeType = () => {
          if (!group.meta?.component) return "file";

          if (componentExpression.is(group.meta.component)) {
            return "component";
          }

          if (typeof group.meta.component === "object") {
            return "components";
          }

          return "file";
        };

        group.stories.forEach((story) => {
          const filePath = group.filePath.replace(".story.tsx", "");
          const parts = filePath.split("/").filter(Boolean);

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const fullPath = parts.slice(0, i + 1).join("/");
            const parentPath = parts.slice(0, i).join("/");
            const isInCurrentPath = currentParts[i] === part;

            if (!root[fullPath]) {
              const isLast = i === parts.length - 1;
              root[fullPath] = {
                id: fullPath,
                label: part,
                type: isLast ? getNodeType() : "folder",
                children: [],
                expanded: isInCurrentPath,
              };
            }

            if (parentPath && root[parentPath]) {
              if (
                !root[parentPath].children?.find((child) =>
                  child.id === fullPath
                )
              ) {
                root[parentPath].children?.push(root[fullPath]);
              }
            }
          }

          const fileNode = root[filePath];
          if (fileNode) {
            const storyNode: TreeNode = {
              id: `${publicPath}${group.filePath}?story=${story.name}`,
              label: story.name,
              type: "story",
              story: story,
              expanded: `?file=${group.filePath}&story=${story.name}` ===
                `?file=${currentFile?.filePath}&story=${currentStory?.name}`,
            };

            if (!fileNode.children?.find((child) => child.id === story.path)) {
              fileNode.children = fileNode.children || [];
              fileNode.children.push(storyNode);
            }
          }
        });
      });

      return Object.values(root).filter((node) => !node.id.includes("/"));
    };

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
          icon={<Icon name={Icons[node.type]} size="sm" />}
          selected={node.id === currentPath}
          expanded={node.expanded}
          href={node.type === "story" ? node.id : undefined}
        >
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex, level + 1)
          )}
        </TreeItem>
      );
    };

    const tree = buildTree(stories);
    return (
      <RefaceUI>
        <Grid columns={12} gap="none" style="height: 100vh;">
          {/* Сайдбар */}
          <GridCol span={2}>
            <Panel
              slots={{
                header: logo || <DefaultLogo />,
              }}
            >
              <TreeView>
                {tree.map((node, index) => renderNode(node, index))}
              </TreeView>
            </Panel>
          </GridCol>

          {/* Основной контент */}
          <GridCol span={10}>
            <Content>
              {currentStory && currentFile
                ? (
                  <Stack direction="vertical" gap={theme.spacing.lg}>
                    <Panel
                      variant="light"
                      slots={{
                        header: (
                          <Stack
                            direction="horizontal"
                            gap="lg"
                            justify="space-between"
                            align="start"
                          >
                            <StoryHeader>
                              <h1>
                                {[componentMeta?.title, currentStory.name]
                                  .filter(Boolean)
                                  .join(": ")}
                              </h1>
                              {componentMeta?.description && (
                                <div class="description">
                                  {componentMeta.description}
                                </div>
                              )}
                            </StoryHeader>
                            <ExternalLink
                              href={`${publicPath}iframe/${currentFile?.filePath}?story=${currentStory?.name}`}
                              target="_blank"
                            >
                              <span>View fullscreen</span>
                              <Icon name={Icons.external} size="sm" />
                            </ExternalLink>
                          </Stack>
                        ),
                      }}
                    >
                      <StoryViewer
                        component={currentStory.component}
                        name={currentStory.name}
                        path={currentFile.filePath}
                        publicPath={publicPath}
                      />
                    </Panel>

                    <Panel
                      variant="dark"
                      style="max-height: 400px; flex: none;"
                      collapsible
                      defaultCollapsed
                      slots={{
                        header: <GroupHeader>Source Code</GroupHeader>,
                      }}
                    >
                      <Code
                        code={currentStory.source}
                      />
                    </Panel>
                  </Stack>
                )
                : (
                  <Panel>
                    <p>Select a story from the sidebar to view it here.</p>
                  </Panel>
                )}
            </Content>
          </GridCol>
        </Grid>
      </RefaceUI>
    );
  },
);
