import { component } from "@recast";
import { Stack } from "./Stack.tsx";
import { Panel } from "./Panel.tsx";
import { Button } from "../controls/Button.tsx";
import { styled } from "@recast";
import { theme } from "../theme.ts";
import { StorySlot } from "@restory";
import { Grid, GridCol } from "./Grid.tsx";

export const meta = {
  title: "Layout/Panel",
  description: "Container component with header, content and footer sections",
};

const DemoBlock = styled.div /*css*/`
  & {
    /* padding: ${theme.spacing.lg}; */
    color: ${theme.colors.text.dimmed};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.sm};
  }
`;

const DemoHeader = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing.md};
  }

  & .title {
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.label};
  }

  & .actions {
    display: flex;
    gap: ${theme.spacing.sm};
  }
`;

const PreformattedBlock = styled(DemoBlock) /*css*/`
  & {
    white-space: pre;
    font-family: ${theme.typography.fonts.mono};
  }
`;

export const Basic = component(() => (
  <Stack direction="vertical">
    <Panel>
      <DemoBlock>Basic panel with default variant</DemoBlock>
    </Panel>

    <Panel variant="light">
      <DemoBlock>Light variant panel</DemoBlock>
    </Panel>

    <Panel variant="dark">
      <DemoBlock>Dark variant panel</DemoBlock>
    </Panel>
  </Stack>
));

export const WithHeaderAndFooter = component(() => (
  <Stack direction="vertical" gap="lg">
    <Panel
      slots={{
        header: (
          <DemoHeader>
            <span class="title">Base Panel with Header</span>
            <div class="actions">
              <Button size="sm">Action</Button>
            </div>
          </DemoHeader>
        ),
        footer: (
          <Stack direction="horizontal" gap="sm" justify="end">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save</Button>
          </Stack>
        ),
      }}
    >
      <DemoBlock>Panel with base variant header and footer</DemoBlock>
    </Panel>

    <Panel
      variant="light"
      slots={{
        header: (
          <DemoHeader>
            <span class="title">Light Panel with Header</span>
          </DemoHeader>
        ),
        footer: (
          <Stack direction="horizontal" gap="sm" justify="end">
            <Button variant="ghost">Close</Button>
          </Stack>
        ),
      }}
    >
      <DemoBlock>Panel with light variant header and footer</DemoBlock>
    </Panel>

    <Panel
      variant="dark"
      slots={{
        header: (
          <DemoHeader>
            <span class="title">Dark Panel with Header</span>
            <div class="actions">
              <Button size="sm" variant="ghost">Settings</Button>
            </div>
          </DemoHeader>
        ),
      }}
    >
      <DemoBlock>Panel with dark variant header</DemoBlock>
    </Panel>
  </Stack>
));

export const Groups = component(() => (
  <Stack direction="vertical" gap="lg">
    <div>
      <h4>Vertical Stack</h4>
      <Stack direction="vertical" gap="none">
        <Panel variant="light">
          <DemoBlock>First panel</DemoBlock>
        </Panel>
        <Panel>
          <DemoBlock>Second panel</DemoBlock>
        </Panel>
        <Panel variant="dark">
          <DemoBlock>Third panel</DemoBlock>
        </Panel>
      </Stack>
    </div>

    <div>
      <h4>Horizontal Stack</h4>
      <Stack direction="horizontal" gap="none">
        <Panel variant="light">
          <DemoBlock>Side panel</DemoBlock>
        </Panel>
        <Panel>
          <DemoBlock>Main content</DemoBlock>
        </Panel>
        <Panel variant="dark">
          <DemoBlock>Details panel</DemoBlock>
        </Panel>
      </Stack>
    </div>
  </Stack>
));

export const ComplexExample = component(() => (
  <Stack direction="vertical" gap="lg">
    <Panel
      variant="dark"
      slots={{
        header: (
          <DemoHeader>
            <span class="title">Project Settings</span>
            <div class="actions">
              <Button size="sm" variant="ghost">Help</Button>
              <Button size="sm" variant="primary">New Project</Button>
            </div>
          </DemoHeader>
        ),
      }}
    >
      <Stack direction="horizontal" gap="md">
        <Panel variant="light">
          <DemoBlock>Navigation Menu</DemoBlock>
        </Panel>
        <Stack direction="vertical" gap="md" flex="1">
          <Panel>
            <DemoBlock>Main Settings Area</DemoBlock>
          </Panel>
          <Panel variant="light">
            <DemoBlock>Additional Options</DemoBlock>
          </Panel>
        </Stack>
      </Stack>
    </Panel>
  </Stack>
));

export const EditorLayout = component(() => (
  <Grid columns={12} gap="none" style="height: 800px;">
    {/* Левая панель - Explorer */}
    <GridCol span={2}>
      <Panel
        variant="dark"
        style="height: 100%;"
        slots={{
          header: (
            <DemoHeader>
              <span class="title">Explorer</span>
              <div class="actions">
                <Button size="sm" variant="ghost">+</Button>
              </div>
            </DemoHeader>
          ),
        }}
      >
        <PreformattedBlock style="height: 100%;">
          {`src/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Panel.tsx
├── layout/
│   ├── Stack.tsx
│   └── Grid.tsx
└── theme.ts`}
        </PreformattedBlock>
      </Panel>
    </GridCol>

    {/* Центральная панель - Редактор */}
    <GridCol span={7}>
      <Panel
        style="height: 100%;"
        slots={{
          header: (
            <DemoHeader>
              <span class="title">main.tsx</span>
              <div class="actions">
                <Button size="sm" variant="ghost">Format</Button>
                <Button size="sm" variant="ghost">Save</Button>
              </div>
            </DemoHeader>
          ),
          footer: (
            <Stack direction="horizontal" gap="lg" justify="space-between">
              <DemoBlock>Modified • UTF-8</DemoBlock>
              <DemoBlock>TypeScript</DemoBlock>
            </Stack>
          ),
        }}
      >
        <PreformattedBlock style="height: 100%;">
          {`import { component } from "@recast";
import { Stack } from "./layout/Stack";
import { Panel } from "./components/Panel";
import { Button } from "./controls/Button";
import { styled } from "@recast";
import { theme } from "./theme";

const StyledApp = styled.div /*css*/\`
  & {
    min-height: 100vh;
    background: \${theme.colors.bg.base};
    color: \${theme.colors.text.base};
  }
\`;

export const App = component(() => (
  <StyledApp>
    <Stack direction="vertical" gap="lg">
      <Panel
        variant="dark"
        slots={{
          header: <h2>Welcome to Reface</h2>,
          footer: (
            <Stack direction="horizontal" justify="end">
              <Button variant="primary">Get Started</Button>
            </Stack>
          ),
        }}
      >
        <p>Build beautiful interfaces with Reface UI</p>
      </Panel>
    </Stack>
  </StyledApp>
));`}
        </PreformattedBlock>
      </Panel>
    </GridCol>

    {/* Правая панель - Properties */}
    <GridCol span={3}>
      <Panel
        variant="light"
        style="height: 100%;"
        slots={{
          header: (
            <DemoHeader>
              <span class="title">Properties</span>
              <div class="actions">
                <Button size="sm" variant="ghost">⚙️</Button>
              </div>
            </DemoHeader>
          ),
        }}
      >
        <PreformattedBlock style="height: 100%;">
          {`variant: "base" | "light" | "dark"
slots:
  - header?: Template
  - footer?: Template
children: TemplateChildren`}
        </PreformattedBlock>
      </Panel>
    </GridCol>

    {/* Нижняя панель - Статус бар */}
    <GridCol span={12}>
      <Panel
        variant="dark"
        slots={{
          header: (
            <Stack direction="horizontal" gap="lg" justify="space-between">
              <DemoBlock>Git: main • TypeScript • Spaces: 2 • UTF-8</DemoBlock>
              <DemoBlock>Ln 42, Col 80</DemoBlock>
            </Stack>
          ),
        }}
      />
    </GridCol>
  </Grid>
));

export const Slots = component(() => (
  <Panel>
    <StorySlot name="header">
      Panel Header Content
    </StorySlot>
    <StorySlot name="content">
      Main Panel Content
    </StorySlot>
    <StorySlot name="footer">
      Panel Footer Content
    </StorySlot>
  </Panel>
));
