import { NumberInput } from "./NumberInput.tsx";
import { FieldLabel } from "./FieldLabel.tsx";

export const Basic = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Basic:</FieldLabel>
      <NumberInput value="42" />
    </div>
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>With Step:</FieldLabel>
      <NumberInput value="1.0" step="0.1" />
    </div>
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>With Limits:</FieldLabel>
      <NumberInput value="5" min="0" max="10" />
    </div>
  </div>
);

export const WithDataDrag = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Draggable:</FieldLabel>
      <NumberInput
        value="1.0"
        step="0.1"
        min="0"
        max="10"
        data-drag="number"
      />
    </div>
  </div>
);

export const meta = {
  title: "Forms/NumberInput",
  description: "Number input with drag support",
  component: NumberInput,
};
