import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "../@reface-ui/theme.ts";

// Типы для историй и метаданных
export type StoryMeta = {
  title?: string;
  description?: string;
  component?: any;
};

export type Story = {
  name: string;
  component: () => JSX.Element;
  path: string;
  meta?: StoryMeta;
};

export type StoryGroup = {
  name: string;
  stories: Story[];
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
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ComponentGroup = styled.div`
  & {
    margin-left: ${theme.spacing.md};
  }

  & .component-name {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    color: ${theme.colors.text.base};
    font-size: ${theme.typography.sizes.xs};
  }
`;

const StoryLink = styled.a`
  & {
    display: block;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    padding-left: ${theme.spacing.xl};
    color: ${theme.colors.text.base};
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${theme.typography.sizes.xs};
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  &.active {
    background: ${theme.colors.accent.base}20;
    color: ${theme.colors.accent.base};
  }
`;

const Content = styled.div`
  & {
    padding: ${theme.spacing.md};
    overflow: auto;
  }
`;

const StoryHeader = styled.div`
  & {
    margin-bottom: ${theme.spacing.lg};
    border-bottom: 1px solid ${theme.colors.border.base};
    padding-bottom: ${theme.spacing.md};
  }

  & h1 {
    font-size: ${theme.typography.sizes.xl};
    color: ${theme.colors.text.base};
    margin: 0 0 ${theme.spacing.xs};
  }

  & .description {
    color: ${theme.colors.text.dimmed};
    font-size: ${theme.typography.sizes.sm};
  }
`;

const StoryContent = styled.div`
  & {
    padding: ${theme.spacing.md};
  }

  & > * + * {
    margin-top: ${theme.spacing.lg};
  }
`;

type ReStoryProps = {
  stories: StoryGroup[];
  currentPath: string;
};

export const ReStory = component((props: ReStoryProps) => {
  // Группируем истории по компонентам
  const groupedStories = props.stories.map((group) => {
    const componentStories = new Map<string, Story[]>();

    group.stories.forEach((story) => {
      const [, componentName] = story.path.split("/").filter(Boolean);
      if (!componentStories.has(componentName)) {
        componentStories.set(componentName, []);
      }
      componentStories.get(componentName)!.push(story);
    });

    return {
      name: group.name,
      components: Array.from(componentStories.entries()).map((
        [name, stories],
      ) => ({
        name,
        stories,
      })),
    };
  });

  // Находим текущую историю
  const currentStory = props.stories
    .flatMap((group) => group.stories)
    .find((story) => story.path === props.currentPath);

  // Находим метаданные компонента (берем из первой истории в группе)
  const currentComponent = currentStory &&
    groupedStories
      .flatMap((g) => g.components)
      .find((c) => c.stories.includes(currentStory));

  const componentMeta = currentComponent?.stories[0].meta;

  return (
    <StoryLayout>
      <Sidebar>
        <StoryNav>
          {groupedStories.map((group) => (
            <StoryGroup>
              <div class="group-header">{group.name}</div>
              {group.components.map((component) => (
                <ComponentGroup>
                  <div class="component-name">{component.name}</div>
                  {component.stories.map((story) => (
                    <StoryLink
                      href={story.path}
                      class={story.path === props.currentPath ? "active" : ""}
                    >
                      {story.name}
                    </StoryLink>
                  ))}
                </ComponentGroup>
              ))}
            </StoryGroup>
          ))}
        </StoryNav>
      </Sidebar>
      <Content>
        {currentStory
          ? (
            <>
              {componentMeta && (
                <StoryHeader>
                  <h1>{componentMeta.title || currentComponent?.name}</h1>
                  {componentMeta.description && (
                    <div class="description">{componentMeta.description}</div>
                  )}
                </StoryHeader>
              )}
              <StoryContent>
                {currentStory.component()}
              </StoryContent>
            </>
          )
          : <div>Select a story from the sidebar</div>}
      </Content>
    </StoryLayout>
  );
});
