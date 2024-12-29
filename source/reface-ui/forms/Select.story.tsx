import { Select } from "./Select.tsx";
import { FieldLabel } from "./FieldLabel.tsx";

export const Basic = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Language:</FieldLabel>
      <Select data-sync="language">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </Select>
    </div>
  </div>
);

export const WithGroups = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Theme:</FieldLabel>
      <Select data-sync="theme">
        <optgroup label="Light">
          <option value="light">Default Light</option>
          <option value="light-high-contrast">High Contrast Light</option>
          <option value="light-soft">Soft Light</option>
        </optgroup>
        <optgroup label="Dark">
          <option value="dark">Default Dark</option>
          <option value="dark-high-contrast">High Contrast Dark</option>
          <option value="dark-soft">Soft Dark</option>
        </optgroup>
      </Select>
    </div>
  </div>
);

export const States = () => (
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 8px; align-items: center">
      <FieldLabel>Disabled:</FieldLabel>
      <Select disabled>
        <option>Locked</option>
      </Select>
    </div>
  </div>
);

export const meta = {
  title: "Forms/Select",
  description: "Select component with groups support",
  component: Select,
};
