import { component } from "@recast";
import { Tabs } from "./Tabs.tsx";
import { styled } from "@recast";
import { theme } from "../theme.ts";

export const meta = {
  title: "Layout/Tabs",
  description: "Tab component for switching between content panels",
};

const DemoContent = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.panel};
    border-radius: 4px;
  }
`;

export const Basic = component(() => {
  return (
    <Tabs
      tabs={["First", "Second", "Third"]}
      activeTab={0}
    >
      <DemoContent>First tab content</DemoContent>
      <DemoContent>Second tab content</DemoContent>
      <DemoContent>Third tab content</DemoContent>
    </Tabs>
  );
});

export const WithChange = component(() => {
  return (
    <Tabs
      tabs={["Tab 1", "Tab 2", "Tab 3"]}
      activeTab="Tab 1"
    >
      <DemoContent>Content of tab 1</DemoContent>
    </Tabs>
  );
});

export const LongTitles = component(() => {
  return (
    <Tabs
      tabs={[
        "Very long title for the first tab",
        "Even longer title for the second tab",
        "The longest title for the third tab",
      ]}
      activeTab={0}
    >
      <DemoContent>First panel</DemoContent>
      <DemoContent>Second panel</DemoContent>
      <DemoContent>Third panel</DemoContent>
    </Tabs>
  );
});
