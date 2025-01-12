# Component System

Component System allows creating reusable elements with unique IDs and client-side functionality through ComponentTemplate.

## Component Features

Components are special NodeProxies that provide:

- Unique instance IDs
- Client-side integration
- Props validation
- TypeScript support
- Scoped styling

## Basic Component Example

```typescript
import { component } from "@reface/recast";

const Button = component((props: ButtonProps, children: Children) => (
  <button class="button" {...props}>
    {children}
  </button>
));

// Usage
Button({ class: "primary" })`Click me`; // Template Literal
<Button class="primary">Click me</Button>; // JSX
```

## Component Instance IDs

Each component instance gets unique ID for client-side integration:

```typescript
const Card = component((props: CardProps, children: Children) => (
  <div __rcc={props.__rcc}>
    <h2>{props.title}</h2>
    <div class="content">{children}</div>
  </div>
));

// Renders with unique ID:
// <div __rcc="card-1">...</div>
// <div __rcc="card-2">...</div>
```

## Client Integration

Components can include scoped client-side code:

```typescript
const script = /*js*/ `
  const componentId = document.currentScript.getAttribute('data-component');
  const root = document.querySelector('[__rcc="' + componentId + '"]');
  
  // Component-scoped client code
  root.querySelector('.button').addEventListener('click', () => {
    console.log('Clicked!');
  });
`;

const Button = component((props: ButtonProps, children: Children) => (
  <div>
    <button class="button">{children}</button>
    <script>{script}</script>
  </div>
));

// Renders with linked IDs:
// <div __rcc="button-1">
//   <button class="button">Click me</button>
//   <script data-component="button-1">...</script>
// </div>
```

## TypeScript Support

Components support full TypeScript typing:

```typescript
// Define props interface
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

// Create typed component
const Button = component<ButtonProps>((props) => (
  <button
    class={[
      "button",
      `button-${props.variant}`,
      props.size && `button-${props.size}`,
    ]}
    disabled={props.disabled}
    onClick={props.onClick}
  />
));

// Usage with type checking
<Button
  variant="primary" // ✓ required
  size="small" // ✓ optional
  disabled={true} // ✓ optional
  invalid={true} // ✗ Error: unknown prop
/>;
```

## Functions vs Components

You can create reusable elements using both regular functions and components:

```typescript
// Regular function returns Template
function button(props: ButtonProps) {
  return div({ class: "button", ...props })`
    Click me
  `;
}

// Component returns ComponentTemplate
const Button = component(
  (props: ButtonProps) =>
    div({ class: "button", ...props })`
      Click me
    `
);
```

### Key Differences

1. **Instance Tracking**

   - Functions: No instance tracking
   - Components: ✓ Unique ID for each instance

   ```typescript
   // Function - no ID
   button({ onClick: () => {} });
   // <div class="button">Click me</div>

   // Component - has ID
   <Button onClick={() => {}} />;
   // <div __rcc="button-1" class="button">Click me</div>
   ```

2. **Client Integration**

   - Functions: Manual ID management needed
   - Components: ✓ Automatic ID linking

   ```typescript
   // Function - manual ID management
   function card() {
     const id = generateId(); // Need custom solution
     return div({ id })`
       <script>
         const root = document.getElementById('${id}');
       </script>
     `;
   }

   // Component - automatic ID management
   const Card = component((props) => (
     <div>
       <script data-component={props.__rcc}>
         const root = document.querySelector('[__rcc="${props.__rcc}"]');
       </script>
     </div>
   ));
   ```

3. **Chainability and Reuse**

   - Functions: New instance on each call
   - Components: ✓ Can be chained and reused like NodeProxies

   ```typescript
   // Function - creates new element each time
   const base = button({ class: "primary" });
   const withSize = button({ class: "primary", size: "large" }); // New instance

   // Component - can be chained like NodeProxies
   const Base = <Button class="primary" />;
   const WithSize = Base({ size: "large" }); // Chains from base
   const WithText = Base`Click me`; // Chains from base
   ```

4. **Render Timing**

   - Functions: Execute during template creation
   - Components: ✓ Execute during render phase

   ```typescript
   // Function - executes immediately
   const result = button({ id: "btn-1" }); // Creates element now

   // Component - executes during render
   const Button = component((props) => {
     console.log("Rendering button"); // Logs during render
     return button(props);
   });
   const result = <Button id="btn-1" />; // Just creates template
   ```

### When to Use What

Use **Functions** when:

- No client-side code needed
- Simple reusable elements
- No instance tracking required
- Performance is critical

Use **Components** when:

- Client-side integration needed
- Instance tracking required
- Props validation needed
- Complex reusable elements
- Working with other components

### Best Practices

1. Start with functions for simple elements
2. Convert to components when needed:
   - Adding client code
   - Need instance tracking
3. Use components for app architecture
4. Use functions for utility elements
