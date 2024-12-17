import { createElement, Fragment, component } from "@reface";
import { Hono } from "@hono/hono";
import { Reface } from "../../@reface/Reface.ts";
import { TodoApp } from "./TodoApp.tsx";
import { LayoutSimple } from "../../@reface/components/LayoutSimple.ts";


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

const app = new Hono();
const reface = new Reface({
  layout: Layout,
});

// Добавляем роуты Reface
app.route("/", reface.hono());

// Создаем экземпляр TodoApp
const Todo = reface.island(TodoApp);

// Рендерим приложение
function App() {
  return (
    <div>
      <Todo title="My Todos" />
    </div>
  );
}

app.get("/", (c) => {
  return c.html(reface.render(<App />));
});

export default app;
