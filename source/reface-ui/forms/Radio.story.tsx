import { Radio } from "./Radio.tsx";

export const Basic = () => (
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <Radio name="basic" value="option1" checked>Option 1</Radio>
    <Radio name="basic" value="option2">Option 2</Radio>
    <Radio name="basic" value="option3">Option 3</Radio>
  </div>
);

export const ViewModes = () => (
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <Radio name="viewMode" value="grid" checked>Grid View</Radio>
    <Radio name="viewMode" value="list">List View</Radio>
    <Radio name="viewMode" value="compact">Compact View</Radio>
  </div>
);

export const meta = {
  title: "Forms/Radio",
  description: "Radio button component for single selection",
  component: Radio,
};
