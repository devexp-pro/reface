import { Content } from "./Content.tsx";

export const meta = {
  title: "Data/Content",
  description:
    "A component for displaying formatted content with consistent styling",
};

export function Overview() {
  return (
    <Content>
      <h1>Getting Started</h1>
      <p>
        Welcome to our application! Here's a quick guide to get you started.
      </p>

      <h2>Installation</h2>
      <p>You can install the package using npm:</p>
      <pre><code>npm install @reface-ui</code></pre>

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
  );
}

export function Headings() {
  return (
    <Content>
      <h1>Heading Level 1</h1>
      <h2>Heading Level 2</h2>
      <h3>Heading Level 3</h3>
    </Content>
  );
}

export function Lists() {
  return (
    <Content>
      <h2>Unordered List</h2>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>

      <h2>Ordered List</h2>
      <ol>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>
    </Content>
  );
}
