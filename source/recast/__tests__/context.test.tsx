import { component, element } from "@recast/mod.ts";
import { TestUtils } from "@recast/test-utils/mod.ts";
import { PROXY_PAYLOAD } from "../expressions/types.ts";
import type { RenderOptions } from "@recast/recast/mod.ts";

Deno.test("context - function access", async () => {
  const utils = new TestUtils();
  const div = element("div");

  const context = {
    user: { name: "John" },
    theme: "dark",
  };

  const Fn = (ctx: RenderOptions) => `Hello, ${ctx.user.name}!`;

  await utils.assertRender(
    div`${Fn}`,
    "<div>Hello, John!</div>",
    context,
  );
});

Deno.test("context - component access", async () => {
  const utils = new TestUtils();

  const UserProfile = component((_, children, ctx) => (
    <div class={`theme-${ctx.theme}`}>
      <h1>Profile: {ctx.user.name}</h1>
      <div>Component ID: {ctx.component.id}</div>
      {children}
    </div>
  ));

  await utils.assertRender(
    <UserProfile>
      <span>Additional info</span>
    </UserProfile>,
    '<div class="theme-dark">' +
      "<h1>Profile: John</h1>" +
      `<div>Component ID: ${UserProfile[PROXY_PAYLOAD].id}</div>` +
      "<span>Additional info</span>" +
      "</div>",
    { user: { name: "John" }, theme: "dark" },
  );
});

Deno.test("context - nested components", async () => {
  const utils = new TestUtils();

  const Header = component((_, __, ctx) => (
    <header class={ctx.theme}>Welcome, {ctx.user.name}!</header>
  ));

  const Content = component((_, children, ctx) => (
    <main class={ctx.theme}>
      <div>ID: {ctx.component.id}</div>
      {children}
    </main>
  ));

  const Layout = component((_, children, ctx) => (
    <div class={`layout-${ctx.theme}`}>
      <Header />
      <Content>{children}</Content>
    </div>
  ));

  await utils.assertRender(
    <Layout>
      <span>Page content</span>
    </Layout>,
    '<div class="layout-dark">' +
      '<header class="dark">Welcome, John!</header>' +
      '<main class="dark">' +
      `<div>ID: ${Content[PROXY_PAYLOAD].id}</div>` +
      "<span>Page content</span>" +
      "</main>" +
      "</div>",
    { user: { name: "John" }, theme: "dark" },
  );
});

Deno.test("context - mixed with functions", async () => {
  const utils = new TestUtils();
  const div = element("div");
  const Fn = (ctx: RenderOptions) => `Theme: ${ctx.theme}`;

  const UserInfo = component((_, __, ctx) => (
    <div>
      {(ctx: RenderOptions) => `Hello, ${ctx.user.name}!`}
      <span>ID: {ctx.component.id}</span>
      {div`${Fn}`}
    </div>
  ));

  await utils.assertRender(
    <UserInfo />,
    "<div>" +
      "Hello, John!" +
      `<span>ID: ${UserInfo[PROXY_PAYLOAD].id}</span>` +
      "<div>Theme: dark</div>" +
      "</div>",
    { user: { name: "John" }, theme: "dark" },
  );
});

Deno.test("context - component id increments", async () => {
  const utils = new TestUtils();

  const Component = component((_, __, ctx) => <div>ID: {ctx.component.id}
  </div>);
  const id = Component[PROXY_PAYLOAD].id;

  await utils.assertRender(
    <div>
      <Component />
      <Component />
      <Component />
    </div>,
    "<div>" +
      `<div>ID: ${id}</div>` +
      `<div>ID: ${id}</div>` +
      `<div>ID: ${id}</div>` +
      "</div>",
  );
});

Deno.test("context - deep nested access", async () => {
  const utils = new TestUtils();

  const DeepComponent = component((_, __) => (
    <div>
      {(ctx: RenderOptions) => `Level: ${ctx.deep.nested.value}`}
    </div>
  ));

  await utils.assertRender(
    <DeepComponent />,
    "<div>" +
      "Level: 42" +
      "</div>",
    { deep: { nested: { value: 42 } } },
  );
});
