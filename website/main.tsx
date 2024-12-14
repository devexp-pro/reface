import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { Reface, registerJSX } from "@reface";
import { StyledPlugin } from "@reface/plugins/styled";
import { PartialsPlugin } from "@reface/plugins/partials";
import { LayoutSimple } from "@reface/components/LayoutSimple";
import { loadDocs } from "./utils/docs.tsx";
import { resolveFromFile } from "./utils/resolveFromFile.ts";

import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { component } from "../@reface/core/component.ts";

import "@reface/jsx.global.d.ts";

// Регистрируем JSX глобально
registerJSX();

// Загружаем документацию
const { sections, pages } = await loadDocs(resolveFromFile("../docs", import.meta.url));

if (!pages.size) {
  console.error("No documentation found!");
  console.log("Make sure you have documentation files in ./docs directory");
}

const PARTIAL_API_PREFIX = '/reface-partial';

// Инициализируем Reface с плагинами
const reface = new Reface();
reface.use(new StyledPlugin());
reface.use(new PartialsPlugin({ apiPrefix: PARTIAL_API_PREFIX }));

const Layout = component((_, children) =>
<LayoutSimple
  title="Reface - Modern Template Engine"
  description="Type-safe template engine for HTML with JSX support"
  favicon="/assets/logo.png"
  htmx={true}
  head={<>
    <link rel="stylesheet" href="/styles/fonts.css" />
    <link rel="icon" type="image/png" href="/assets/logo.png" />
  </>
  }
>
{children}
</LayoutSimple>);

// Создаем Hono приложение
const app = new Hono();

// Статические файлы
app.use("/assets/*", serveStatic({ root: resolveFromFile("./public", import.meta.url) }));
app.use("/styles/*", serveStatic({ root: resolveFromFile("./public", import.meta.url) }));

// Регистрируем страницы
app.get("/", (c) => {
  const content = reface.render(<Layout><HomePage /></Layout>);
  return c.html(content);
});

app.get("/docs", (c) => {
  const content = reface.render(
    <Layout>
      <DocsPage 
        sections={sections} 
        pages={pages}
      />
    </Layout>
  );
  return c.html(content);
});

app.get("/docs/:page", (c) => {
  const content = reface.render(
    <Layout>
      <DocsPage 
        sections={sections}
        pages={pages}
        currentPath={c.req.param("page")}
      />
    </Layout>
  );
  return c.html(content);
});

// Добавляем обработчик островов
app.get(`${PARTIAL_API_PREFIX}/:partial`, async (c) => {
  const partialName = c.req.param('partial');
  
  try {
    const partialFn = await reface.getPlugin('partial').getHandler(partialName);
    const content = reface.render(await partialFn?.(c));
    if (!content) {
      return c.text('Partial not found', 404);
    }
    
    return c.html(content);
    
  } catch (error) {
    console.error(`Error rendering partial ${partialName}:`, error);
    return c.text('Internal server error', 500);
  }
});

// Запускаем сервер
await Deno.serve(app.fetch);