import { component } from "@reface";
import { Panel } from "./Panel.tsx";
import { Button } from "../controls/Button.tsx";
import { Stack } from "./Stack.tsx";

export const meta = {
  title: "Layout/Panel",
  description: "Container component with header, content and footer sections",
};

export const Basic = component(() => (
  <Panel>
    <div>Basic panel content</div>
  </Panel>
));

export const WithHeader = component(() => (
  <Panel
    slots={{
      header: <div>Panel Header</div>,
    }}
  >
    <div>Panel with header</div>
  </Panel>
));

export const WithFooter = component(() => (
  <Panel
    slots={{
      footer: (
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button>Cancel</Button>
          <Button variant="primary">Save</Button>
        </Stack>
      ),
    }}
  >
    <div>Panel with footer actions</div>
  </Panel>
));

export const Complete = component(() => (
  <Panel
    slots={{
      header: <div>Complete Panel</div>,
      footer: (
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button>Cancel</Button>
          <Button variant="primary">Save</Button>
        </Stack>
      ),
    }}
  >
    <div>Panel with both header and footer</div>
  </Panel>
));
