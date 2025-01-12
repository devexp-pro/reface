import { component } from "@recast";
import { Card } from "./Card.tsx";
import { Button } from "../controls/Button.tsx";
import { Stack } from "./Stack.tsx";

export const meta = {
  title: "Layout/Card",
  description: "Container component with header and content sections",
};

export const Basic = component(() => (
  <Card>
    <div>Basic card content</div>
  </Card>
));

export const WithTitle = component(() => (
  <Card title="Card Title">
    <div>Card with title</div>
  </Card>
));

export const WithActions = component(() => (
  <Card
    title="Card with Actions"
    slots={{
      end: (
        <Stack direction="horizontal" gap="sm">
          <Button size="sm">Edit</Button>
          <Button size="sm" variant="danger">Delete</Button>
        </Stack>
      ),
    }}
  >
    <div>Card with action buttons in header</div>
  </Card>
));
