import { component } from "@recast";
import { Collapse } from "./Collapse.tsx";
import { Stack } from "./Stack.tsx";
import { Button } from "../controls/Button.tsx";
import { styled } from "@recast";
import { theme } from "../theme.ts";

export const meta = {
  title: "Layout/Collapse",
  description: "Collapsible content container",
};

const CollapseHeader = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.label};
  }
`;

const CollapseContent = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.surface.base};
    color: ${theme.colors.text.base};
  }
`;

export const Basic = component(() => (
  <Stack direction="vertical" gap="lg">
    <Collapse
      expanded
      slots={{
        header: (
          <CollapseHeader>
            <span>Expanded section</span>
            <Button variant="ghost" size="sm">↑</Button>
          </CollapseHeader>
        ),
      }}
    >
      <CollapseContent>
        <p>This content is visible</p>
        <p>You can put any content here</p>
      </CollapseContent>
    </Collapse>

    <Collapse
      slots={{
        header: (
          <CollapseHeader>
            <span>Collapsed section</span>
            <Button variant="ghost" size="sm">↓</Button>
          </CollapseHeader>
        ),
      }}
    >
      <CollapseContent>
        <p>This content is hidden by default</p>
        <p>Click the header to show it</p>
      </CollapseContent>
    </Collapse>
  </Stack>
));
