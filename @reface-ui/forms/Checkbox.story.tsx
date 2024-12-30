import { Checkbox } from "./Checkbox.tsx";

export const Basic = () => (
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <Checkbox>Default Checkbox</Checkbox>
    <Checkbox checked>Checked Checkbox</Checkbox>
    <Checkbox disabled>Disabled Checkbox</Checkbox>
    <Checkbox checked disabled>Checked Disabled</Checkbox>
  </div>
);

export const WithDataSync = () => (
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <Checkbox data-sync="enabled">Enabled</Checkbox>
    <Checkbox data-sync="visible" checked>Visible</Checkbox>
    <Checkbox data-sync="locked">Locked</Checkbox>
  </div>
);

export const meta = {
  title: "Forms/Checkbox",
  description: "Checkbox component for binary choices",
  component: Checkbox,
};
