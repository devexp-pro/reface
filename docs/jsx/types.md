# JSX Types in Reface

## Overview

Reface provides full TypeScript support for JSX, including:

- Type checking for HTML elements
- Component props validation
- Children type safety
- Special attributes (ref, key)

## Examples

### Basic Elements

```tsx
<div class="test">Content</div>
```

### Components with Props

```tsx
interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => (
  <button class={props.primary ? "primary" : ""} onClick={props.onClick} />
);
```

### Spread Attributes

```tsx
const props = { class: "test", id: "main" };
<div {...props} />;
```

### Special Attributes

```tsx
<div ref={myRef} key={id} dangerouslySetInnerHTML={{ __html: content }} />
```
