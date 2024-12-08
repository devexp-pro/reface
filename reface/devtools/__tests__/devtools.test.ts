import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { initDevTools, updateDevTools } from "../mod.ts";
import { div } from "@reface/html";
import { component } from "@reface/elements";

Deno.test("DevTools component integration", async () => {
  // Mock window and DevTools hook
  const mockHook = {
    init: (fiber: unknown) => {},
    rendererInterfaces: new Map(),
    supportsFiber: true,
  };

  globalThis.window = {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: mockHook,
  } as any;

  // Create test component
  const Button = component<{ label: string }>((props) => {
    return div`${props.label}`;
  });

  // Initialize DevTools
  initDevTools({ port: 8097 });

  // Create test template with component
  const template = Button({ label: "Click me" });

  // Update DevTools
  updateDevTools(template as any);

  // Get renderer interface
  const renderer = mockHook.rendererInterfaces.get("reface");
  const fiber = renderer.getCurrentFiber();

  // Verify component information
  assertEquals(fiber.displayName, "Button");
  assertEquals(fiber.memoizedProps.label, "Click me");
});
