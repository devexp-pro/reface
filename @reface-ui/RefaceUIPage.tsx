import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { Reface } from "@reface";
import { LayoutSimple } from "@reface/components/LayoutSimple";
import { LiveReloadPlugin } from "@reface/plugins/liveReload";
import { Hono } from "@hono/hono";

const IS_DEV = true;

// Новая тема для инструментального интерфейса
const theme = {
  colors: {
    bg: {
      base: "#2c2c2c",
      panel: "#1c1c1c",
      input: "#3c3c3c",
      hover: "#4c4c4c",
    },
    text: {
      base: "#ebebeb",
      dimmed: "#9ca3af",
      label: "#d1d5db",
    },
    border: {
      base: "#404040",
      hover: "#525252",
    },
    accent: {
      base: "#60a5fa",
      hover: "#3b82f6",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
  },
  typography: {
    fonts: {
      mono: "'JetBrains Mono', monospace",
      ui: "Inter, system-ui, -apple-system, sans-serif",
    },
    sizes: {
      xs: "11px",
      sm: "12px",
      md: "13px",
      lg: "14px",
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
};

// Базовый лейаут приложения
const AppLayout = styled.div`
  & {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    height: 100vh;
    background: ${theme.colors.bg.base};
    color: ${theme.colors.text.base};
    font-family: Inter, system-ui, -apple-system, sans-serif;
  }
`;

// Боковая панель
const Sidebar = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border-right: 1px solid ${theme.colors.border.base};
    overflow: auto;
  }

  &.right {
    border-right: none;
    border-left: 1px solid ${theme.colors.border.base};
  }
`;

// Основная область
const MainArea = styled.div`
  & {
    position: relative;
    overflow: hidden;
  }
`;

// Панель инструментов
const Toolbar = styled.div`
  & {
    height: 40px;
    background: ${theme.colors.bg.panel};
    border-bottom: 1px solid ${theme.colors.border.base};
    display: flex;
    align-items: center;
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.sm};
  }
`;

// Группа контролов в тулбаре
const ToolGroup = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 4px;
    background: ${theme.colors.bg.input};
  }

  & + & {
    margin-left: ${theme.spacing.sm};
  }
`;

// Кнопка в тулбаре
const ToolButton = styled.button`
  & {
    height: 24px;
    padding: 0 ${theme.spacing.sm};
    background: none;
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  &.active {
    background: ${theme.colors.accent.base};
    color: white;
  }
`;

// Базовая панель настроек
const ControlPanel = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border-radius: 6px;
    width: 280px;
    color: ${theme.colors.text.base};
    font-family: Inter, system-ui, -apple-system, sans-serif;
    font-size: 12px;
    overflow: hidden;
  }
`;

// Группа контролов
const ControlGroup = styled.div`
  & {
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Строка с контролом
const ControlRow = styled.div`
  & {
    display: flex;
    align-items: center;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    min-height: 32px;
  }

  & .label {
    flex: 1;
    color: ${theme.colors.text.label};
    user-select: none;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }
`;

// Числовой ввод с драгом
const NumberInput = styled.div`
  & {
    position: relative;
    width: 100px;
    height: 24px;
    background: ${theme.colors.bg.input};
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: ew-resize;
  }

  & input {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    text-align: right;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }

  & input:focus {
    outline: 1px solid ${theme.colors.accent.base};
  }
`;

// Цветовой пикер
const ColorPicker = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }

  & .color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 2px solid ${theme.colors.border.base};
  }

  & input {
    width: 76px;
    height: 24px;
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }
`;

// Селект
const Select = styled.select`
  & {
    width: 100px;
    height: 24px;
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    font-size: 11px;
    cursor: pointer;
  }

  &:focus {
    outline: 1px solid ${theme.colors.accent.base};
  }
`;

// Vector3 input
const Vector3Input = styled.div`
  & {
    display: flex;
    gap: 2px;
  }

  & .vector-component {
    width: 32px;
    height: 24px;
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    padding: 0 4px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }

  & .vector-label {
    width: 12px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.text.dimmed};
    font-size: 10px;
  }
`;

// Заголовок секции
const SectionTitle = styled.div`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.dimmed};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    user-select: none;
  }
`;

// Метка поля
const FieldLabel = styled.span`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.label};
    user-select: none;
  }
`;

// Значение
const Value = styled.span`
  & {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.base};
  }

  &.dimmed {
    color: ${theme.colors.text.dimmed};
  }
`;

// Подсказка
const Hint = styled.div`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
  }
`;

// Ошибка
const Error = styled.div`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.xs};
    color: #ef4444;
    padding: ${theme.spacing.xs} ${theme.spacing.md};
  }
`;

// Путь к файлу/объекту
const Path = styled.div`
  & {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
  }

  & .separator {
    color: ${theme.colors.text.dimmed};
    opacity: 0.5;
    margin: 0 ${theme.spacing.xs};
  }

  & .current {
    color: ${theme.colors.text.base};
  }
`;

// Контентная область с форматированным текстом
const Content = styled.div`
  & {
    color: ${theme.colors.text.base};
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    line-height: 1.6;
  }

  /* Заголовки */
  & h1 {
    font-size: ${theme.typography.sizes.lg};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text.base};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
    padding-bottom: ${theme.spacing.xs};
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  & h2 {
    font-size: ${theme.typography.sizes.md};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.base};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
  }

  & h3 {
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.dimmed};
    margin: ${theme.spacing.sm} 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Параграфы */
  & p {
    margin: ${theme.spacing.sm} 0;
  }

  /* Списки */
  & ul, & ol {
    margin: ${theme.spacing.sm} 0;
    padding-left: ${theme.spacing.lg};
  }

  & li {
    margin: ${theme.spacing.xs} 0;
  }

  & ul li::marker {
    color: ${theme.colors.text.dimmed};
  }

  /* Ссылки */
  & a {
    color: ${theme.colors.accent.base};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  /* Код */
  & code {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    background: ${theme.colors.bg.input};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  & pre {
    background: ${theme.colors.bg.input};
    padding: ${theme.spacing.sm};
    border-radius: 4px;
    overflow-x: auto;
    margin: ${theme.spacing.sm} 0;
  }

  & pre code {
    background: none;
    padding: 0;
  }

  /* Таблицы */
  & table {
    width: 100%;
    border-collapse: collapse;
    margin: ${theme.spacing.sm} 0;
    font-size: ${theme.typography.sizes.xs};
  }

  & th {
    text-align: left;
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.dimmed};
    border-bottom: 1px solid ${theme.colors.border.base};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }

  & td {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border.base};
  }

  & tr:last-child td {
    border-bottom: none;
  }

  /* Цитаты */
  & blockquote {
    margin: ${theme.spacing.sm} 0;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-left: 2px solid ${theme.colors.accent.base};
    background: ${theme.colors.bg.input};
    color: ${theme.colors.text.dimmed};
  }

  /* Изображения */
  & img {
    max-width: 100%;
    border-radius: 4px;
    margin: ${theme.spacing.sm} 0;
  }

  /* Разделитель */
  & hr {
    border: none;
    border-top: 1px solid ${theme.colors.border.base};
    margin: ${theme.spacing.md} 0;
  }

  /* Выделение текста */
  & strong {
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.base};
  }

  & em {
    font-style: italic;
    color: ${theme.colors.text.dimmed};
  }

  /* Клавиши */
  & kbd {
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
    background: ${theme.colors.bg.input};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    border: 1px solid ${theme.colors.border.base};
    box-shadow: 0 1px 0 ${theme.colors.border.base};
  }
`;

// Обновленная демо страница
export const RefaceUIPage = component(() => (
  <AppLayout>
    <Sidebar>
      <ControlPanel>
        <SectionTitle>Transform</SectionTitle>
        <ControlGroup>
          <ControlRow>
            <FieldLabel>Scale</FieldLabel>
            <NumberInput>
              <input type="number" value="1.0" step="0.1" />
            </NumberInput>
          </ControlRow>

          <ControlRow>
            <FieldLabel>Position</FieldLabel>
            <Vector3Input>
              <input class="vector-component" value="0" />
              <span class="vector-label">X</span>
              <input class="vector-component" value="2" />
              <span class="vector-label">Y</span>
              <input class="vector-component" value="0" />
              <span class="vector-label">Z</span>
            </Vector3Input>
          </ControlRow>
        </ControlGroup>

        <SectionTitle>Appearance</SectionTitle>
        <ControlGroup>
          <ControlRow>
            <FieldLabel>Color</FieldLabel>
            <ColorPicker>
              <div class="color-preview" style="background: #ff005b" />
              <input value="#ff005b" />
            </ColorPicker>
          </ControlRow>

          <ControlRow>
            <FieldLabel>Type</FieldLabel>
            <Select>
              <option>Normal</option>
              <option>Outline</option>
              <option>Wireframe</option>
            </Select>
          </ControlRow>
        </ControlGroup>

        <Hint>Changes are saved automatically</Hint>
        <Error>Unable to connect to server</Error>
      </ControlPanel>
    </Sidebar>

    <MainArea>
      <Toolbar>
        <Path>
          <span>docs</span>
          <span class="separator">/</span>
          <span class="current">getting-started.md</span>
        </Path>
      </Toolbar>

      <div style="padding: 2rem; height: calc(100% - 40px); overflow: auto;">
        <Content>
          <h1>Getting Started</h1>
          <p>
            Welcome to our application! Here's a quick guide to get you started.
          </p>

          <h2>Installation</h2>
          <p>You can install the package using npm:</p>
          <pre><code>npm install @reface/ui</code></pre>

          <h2>Basic Usage</h2>
          <p>Here are the main components you'll be working with:</p>

          <h3>Controls</h3>
          <ul>
            <li>
              Use <code>NumberInput</code> for numeric values
            </li>
            <li>
              Use <code>ColorPicker</code> for color selection
            </li>
            <li>
              Use <code>Vector3Input</code> for 3D coordinates
            </li>
          </ul>

          <h3>Keyboard Shortcuts</h3>
          <table>
            <tr>
              <th>Action</th>
              <th>Shortcut</th>
            </tr>
            <tr>
              <td>Save</td>
              <td>
                <kbd>Ctrl</kbd> + <kbd>S</kbd>
              </td>
            </tr>
            <tr>
              <td>Undo</td>
              <td>
                <kbd>Ctrl</kbd> + <kbd>Z</kbd>
              </td>
            </tr>
          </table>

          <blockquote>
            <strong>Note:</strong> Make sure to save your changes regularly.
          </blockquote>

          <h2>Examples</h2>
          <p>Here's a sample configuration:</p>
          <pre><code>{`{
  "theme": "dark",
  "autoSave": true,
  "shortcuts": {
    "save": "ctrl+s",
    "undo": "ctrl+z"
  }
}`}</code></pre>

          <hr />

          <p>
            For more information, check out our <a href="#">documentation</a>.
          </p>
        </Content>
      </div>
    </MainArea>

    <Sidebar class="right">
      <ControlPanel>
        <SectionTitle>Layers</SectionTitle>
        <ControlGroup>
          <ControlRow>
            <FieldLabel>Layer 1</FieldLabel>
            <ToolButton>👁️</ToolButton>
          </ControlRow>
          <ControlRow>
            <FieldLabel>Layer 2</FieldLabel>
            <ToolButton>👁️</ToolButton>
          </ControlRow>
        </ControlGroup>
      </ControlPanel>
    </Sidebar>
  </AppLayout>
));

const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface UI - Controls Demo"
    description="UI Controls for desktop applications"
    favicon="/assets/logo.png"
    normalizeCss
    htmx
  >
    {children}
  </LayoutSimple>
));

const reface = new Reface({
  layout: Layout,
});

if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

const app = new Hono();
reface.hono(app);

app.get("/", (c) => {
  return c.html(reface.render(<RefaceUIPage />));
});

export default app;
