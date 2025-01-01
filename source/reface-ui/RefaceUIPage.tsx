import { component } from "@reface/recast";
import { styled } from "@reface/recast";
import { theme } from "./theme.ts";
import { Select } from "./forms/Select.tsx";
import { Radio } from "./forms/Radio.tsx";
import { Checkbox } from "./forms/Checkbox.tsx";
import { NumberInput } from "./forms/NumberInput.tsx";
import { ColorPicker } from "./forms/ColorPicker.tsx";
import { FieldLabel } from "./forms/FieldLabel.tsx";

import { Button } from "./controls/Button.tsx";
import { Icon } from "./ui/Icon.tsx";

// Добавляем базовые компоненты
const Box = styled.div`
  & {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  & {
    display: flex;
  }
  
  &.vertical {
    flex-direction: column;
  }
  
  &.horizontal {
    flex-direction: row;
  }

  /* Добавляем фон для основного контейнера */
  &.main-content {
    background: ${theme.colors.bg.base};
  }
`;

const Panel = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border: 1px solid ${theme.colors.border.base};
    overflow: auto;
  }
`;

// Обновляем AppLayout
const AppLayout = styled.div`
  & {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    font-family: ${theme.typography.fonts.ui};
    background: ${theme.colors.bg.base};
  }

  & .content-wrapper {
    display: flex;
    flex: 1;
    min-height: 0;
    width: 100%;
    overflow: hidden;
  }
`;

// Логотип
const Logo = styled.div`
  & {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .bracket {
    color: ${theme.colors.text.dimmed};
  }

  & .letter {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.semibold};
  }

  & .name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .type {
    color: ${theme.colors.text.dimmed};
    font-weight: ${theme.typography.weights.normal};
  }
`;

// Навигационное меню
const NavMenu = styled.div`
  & {
    padding: ${theme.spacing.sm};
  }
`;

const NavGroup = styled.div`
  & {
    margin-bottom: ${theme.spacing.md};
  }

  & .nav-header {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const NavItem = styled.div`
  & {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.text.base};
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  &.active {
    background: ${theme.colors.accent.base}20;
    color: ${theme.colors.accent.base};
  }

  & .nav-icon {
    width: 16px;
    color: ${theme.colors.text.dimmed};
  }

  & .nav-label {
    flex: 1;
    font-size: ${theme.typography.sizes.sm};
  }

  & .nav-meta {
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
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

// Базовая панель настроек
const ControlPanel = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border-radius: 6px;
    width: 280px;
    color: ${theme.colors.text.base};
    font-family: ${theme.typography.fonts.ui};
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
    display: grid;
    grid-template-columns: minmax(80px, 120px) 1fr;
    gap: ${theme.spacing.md};
    align-items: center;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    min-height: 32px;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  /* Для случаев, когда нужно растянуть контрол на всю ширину */
  &.full-width {
    grid-template-columns: 1fr;
  }

  /* Для случаев с дополнительными кнопками справа */
  &.with-tools {
    grid-template-columns: minmax(80px, 120px) 1fr auto;
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

// Статус бар
const StatusBar = styled.div`
  & {
    height: 24px;
    background: ${theme.colors.bg.panel};
    border-top: 1px solid ${theme.colors.border.base};
    display: flex;
    align-items: center;
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.md};
    font-size: ${theme.typography.sizes.xs};
    color: ${theme.colors.text.dimmed};
    user-select: none;
  }

  & .status-item {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .status-item:hover {
    color: ${theme.colors.text.base};
  }

  & .divider {
    width: 1px;
    height: 14px;
    background: ${theme.colors.border.base};
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

// Обновляем содержимое правой панели
export const RefaceUIPage = component(() => (
  <AppLayout>
    <Container class="content-wrapper">
      <Panel style="width: 280px">
        <Logo>
          <span class="bracket">[</span>
          <span class="letter">R</span>
          <span class="bracket">]</span>
          <span class="name">eface</span>
          <span class="type">UI</span>
        </Logo>
        <NavMenu>
          <NavGroup>
            <div class="nav-header">Project</div>
            <NavItem class="active">
              <span class="nav-icon">📄</span>
              <span class="nav-label">Documentation</span>
            </NavItem>
            <NavItem>
              <span class="nav-icon">⚙️</span>
              <span class="nav-label">Settings</span>
            </NavItem>
          </NavGroup>

          <NavGroup>
            <div class="nav-header">Files</div>
            <NavItem>
              <span class="nav-icon">📁</span>
              <span class="nav-label">src</span>
              <span class="nav-meta">12 files</span>
            </NavItem>
            <NavItem>
              <span class="nav-icon">📁</span>
              <span class="nav-label">assets</span>
              <span class="nav-meta">4 files</span>
            </NavItem>
          </NavGroup>

          <NavGroup>
            <div class="nav-header">Team</div>
            <NavItem>
              <span class="nav-icon">👤</span>
              <span class="nav-label">Alex Morgan</span>
              <span class="nav-meta">online</span>
            </NavItem>
            <NavItem>
              <span class="nav-icon">👤</span>
              <span class="nav-label">Sarah Chen</span>
              <span class="nav-meta">away</span>
            </NavItem>
            <NavItem>
              <span class="nav-icon">👥</span>
              <span class="nav-label">Invite People</span>
            </NavItem>
          </NavGroup>
        </NavMenu>
      </Panel>

      <Container class="vertical main-content" style="flex: 1">
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
              Welcome to our application! Here's a quick guide to get you
              started.
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
      </Container>

      <Panel style="width: 280px">
        <ControlPanel>
          <SectionTitle>Buttons</SectionTitle>
          <div style="display: flex; gap: 1rem; margin-bottom: 2rem">
            <Button>Default Button</Button>
            <Button variant="primary">Primary Button</Button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem">
            <Button block>Full Width Button</Button>
            <Button block variant="primary">Full Width Primary Button</Button>
          </div>
          <SectionTitle>Buttons with Icons</SectionTitle>
          <div style="padding: 1rem">
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem">
              <Button slots={{ start: <Icon>🔍</Icon> }}>
                Search
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

              <Button slots={{ end: <Icon>→</Icon> }}>
                Next
              </Button>
            </div>
          </div>
        </ControlPanel>
        <ControlPanel>
          <SectionTitle>Form Controls</SectionTitle>

          {/* Select с простым выбором */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>Language</FieldLabel>
              <Select data-sync="language">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ru">Русский</option>
              </Select>
            </ControlRow>
          </ControlGroup>

          {/* Select с группами */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>Theme</FieldLabel>
              <Select data-sync="theme">
                <optgroup label="Light">
                  <option value="light">Default Light</option>
                  <option value="light-high-contrast">
                    High Contrast Light
                  </option>
                  <option value="light-soft">Soft Light</option>
                </optgroup>
                <optgroup label="Dark">
                  <option value="dark">Default Dark</option>
                  <option value="dark-high-contrast">
                    High Contrast Dark
                  </option>
                  <option value="dark-soft">Soft Dark</option>
                </optgroup>
              </Select>
            </ControlRow>
          </ControlGroup>

          {/* Radio группа */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>View Mode</FieldLabel>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <Radio name="viewMode" value="grid" checked>Grid View</Radio>
                <Radio name="viewMode" value="list">List View</Radio>
                <Radio name="viewMode" value="compact">Compact View</Radio>
              </div>
            </ControlRow>
          </ControlGroup>

          {/* Disabled Select */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>Status</FieldLabel>
              <Select disabled>
                <option>Locked</option>
              </Select>
            </ControlRow>
          </ControlGroup>

          {/* Checkbox группа */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>Options</FieldLabel>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <Checkbox data-sync="enabled">Enabled</Checkbox>
                <Checkbox data-sync="visible" checked>Visible</Checkbox>
                <Checkbox data-sync="locked">Locked</Checkbox>
              </div>
            </ControlRow>
          </ControlGroup>

          <SectionTitle>Other Controls</SectionTitle>

          {/* Остальные контролы без изменений */}
          <ControlGroup>
            <ControlRow>
              <FieldLabel>Number</FieldLabel>
              <NumberInput
                value="1.0"
                step="0.1"
                min="0"
                max="10"
                data-drag="number"
              />
            </ControlRow>
          </ControlGroup>

          <ControlGroup>
            <ControlRow>
              <FieldLabel>Color</FieldLabel>
              <ColorPicker
                value="#ff005b"
                data-sync="color"
                data-color-picker
              />
            </ControlRow>
          </ControlGroup>
        </ControlPanel>
      </Panel>
    </Container>
    <StatusBar>
      <div class="status-item">
        <span>Ready</span>
      </div>
      <div class="divider"></div>
      <div class="status-item">
        <span>Line: 42, Column: 10</span>
      </div>
      <div class="divider"></div>
      <div class="status-item">
        <span>UTF-8</span>
      </div>
    </StatusBar>
  </AppLayout>
));
