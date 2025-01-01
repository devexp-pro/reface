import { Button } from "./Button.tsx";
import { Icon } from "../ui/Icon.tsx";

// Основные варианты кнопок
export const Variants = () => (
  <div style="display: flex; gap: 1rem; flex-direction: column">
    <div style="display: flex; gap: 1rem; align-items: center">
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button active>Active State</Button>
    </div>

    <div style="display: flex; gap: 1rem; align-items: center">
      <Button block>Full Width Button</Button>
    </div>
  </div>
);

// Кнопки с иконками
export const WithIcons = () => (
  <div style="display: flex; gap: 1rem; flex-direction: column">
    <div style="display: flex; gap: 1rem; align-items: center">
      <Button slots={{ start: <Icon>🔍</Icon> }}>
        Search
      </Button>

      <Button slots={{ end: <Icon>→</Icon> }}>
        Next
      </Button>

      <Button
        variant="primary"
        slots={{
          start: <Icon>💾</Icon>,
          end: <Icon>↓</Icon>,
        }}
      >
        Save File
      </Button>
    </div>
  </div>
);

// Состояния кнопок
export const States = () => (
  <div style="display: flex; gap: 1rem; flex-direction: column">
    <div style="display: flex; gap: 1rem; align-items: center">
      <Button>Normal</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
    </div>

    <div style="display: flex; gap: 1rem; align-items: center">
      <Button variant="primary">Normal</Button>
      <Button variant="primary" active>Active</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  </div>
);

// Метаданные истории
export const meta = {
  title: "Controls/Button",
  description: "Button component documentation",
  component: Button,
};
