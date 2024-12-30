import { TreeItem, TreeView } from "./TreeView.tsx";

export const meta = {
  title: "Data/TreeView",
  description: "A component for displaying hierarchical data structures",
};

export function Basic() {
  return (
    <TreeView
      selectedId="1.1.1"
      expandedIds={["1", "1.1"]}
      href={(id) => `/items/${id}`}
    >
      <TreeItem id="1" label="Project">
        <TreeItem id="1.1" label="src">
          <TreeItem id="1.1.1" label="components" />
          <TreeItem id="1.1.2" label="utils" />
          <TreeItem id="1.1.3" label="styles" />
        </TreeItem>
        <TreeItem id="1.2" label="docs">
          <TreeItem id="1.2.1" label="api.md" />
          <TreeItem id="1.2.2" label="setup.md" />
        </TreeItem>
      </TreeItem>
      <TreeItem id="2" label="Settings">
        <TreeItem id="2.1" label="General" />
        <TreeItem id="2.2" label="Security" />
        <TreeItem id="2.3" label="Privacy" />
      </TreeItem>
    </TreeView>
  );
}

export function WithIcons() {
  return (
    <TreeView>
      <TreeItem id="1" label="Documents" icon="📁">
        <TreeItem id="1.1" label="Report.pdf" icon="📄" />
        <TreeItem id="1.2" label="Invoice.pdf" icon="📄" />
      </TreeItem>
      <TreeItem id="2" label="Images" icon="🖼️">
        <TreeItem id="2.1" label="photo.jpg" icon="🖼️" />
        <TreeItem id="2.2" label="avatar.png" icon="🖼️" />
      </TreeItem>
    </TreeView>
  );
}
