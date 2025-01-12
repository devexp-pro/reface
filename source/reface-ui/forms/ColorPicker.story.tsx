import { ColorPicker } from "./ColorPicker.tsx";
import { FieldLabel } from "./FieldLabel.tsx";

export const Basic = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Color:</FieldLabel>
      <ColorPicker value="#ff005b" />
    </div>
  </div>
);

export const WithDataSync = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Primary:</FieldLabel>
      <ColorPicker
        value="#ff005b"
        data-sync="primaryColor"
        data-color-picker
      />
    </div>
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Secondary:</FieldLabel>
      <ColorPicker
        value="#00ff5b"
        data-sync="secondaryColor"
        data-color-picker
      />
    </div>
  </div>
);

export const meta = {
  title: "Forms/ColorPicker",
  description: "Color picker component with hex input",
  component: ColorPicker,
};
