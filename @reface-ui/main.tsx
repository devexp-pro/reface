import { Reface } from "@reface";
import { Hono } from "@hono/hono";
import { LiveReloadPlugin } from "@reface/plugins/liveReload";
import { component } from "@reface";
import { theme } from "./theme.ts";
import { LayoutSimple } from "@reface/components/LayoutSimple";
import { loadStories, ReStory } from "@restory";

const IS_DEV = true;

const script = /* js */ `
document.addEventListener('DOMContentLoaded', () => {
  // Сворачиваемые группы
  document.querySelectorAll('[data-toggle="collapse"]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = document.querySelector(trigger.dataset.target);
      const icon = trigger.querySelector('[data-rotate]');
      if (target) {
        const isVisible = target.style.display !== 'none';
        target.style.display = isVisible ? 'none' : 'block';
        icon.style.transform = isVisible ? '' : 'rotate(90deg)';
      }
    });
  });

  // Дропдауны
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Закрываем все другие дропдауны
      document.querySelectorAll('[data-dropdown].open').forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('open');
        }
      });
      
      dropdown.classList.toggle('open');
    });
  });

  // Закрытие дропдаунов по клику вне
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      document.querySelectorAll('[data-dropdown].open').forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }
  });

  // Drag для чисел
  document.querySelectorAll('[data-drag="number"]').forEach(container => {
    const input = container.querySelector('input');
    let startX, startValue;

    container.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      startValue = parseFloat(input.value);
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragEnd);
    });

    function onDrag(e) {
      const delta = (e.clientX - startX) * parseFloat(input.step || 1);
      const newValue = startValue + delta;
      const min = parseFloat(input.dataset.min);
      const max = parseFloat(input.dataset.max);
      
      input.value = Math.min(max, Math.max(min, newValue));
      input.dispatchEvent(new Event('change'));
    }

    function onDragEnd() {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragEnd);
    }
  });

  // Цветовой пикер
document.querySelectorAll('[data-color-picker]').forEach(picker => {
  const colorInput = picker.querySelector('[data-color-input]');
  const preview = picker.querySelector('[data-color-preview]');
  const textInput = picker.querySelector('[data-color-text]');

  preview.addEventListener('click', () => colorInput.click());
  
  colorInput.addEventListener('input', (e) => {
    const color = e.target.value;
    preview.style.backgroundColor = color;
    textInput.value = color;
  });

  textInput.addEventListener('input', (e) => {
    const color = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      preview.style.backgroundColor = color;
      colorInput.value = color;
    }
  });
});

  // Синхронизация значений
  document.querySelectorAll('[data-sync]').forEach(element => {
    element.addEventListener('change', (e) => {
      const key = element.dataset.sync;
      const value = element.type === 'checkbox' ? element.checked : element.value;
      // Здесь можно добавить обработку изменений
      console.log('Value changed:', key, value);
    });
  });

  // ToggleGroup
  document.querySelectorAll('[data-toggle-group]').forEach(group => {
    const options = group.querySelectorAll('.toggle-option');
    
    options.forEach(option => {
      const input = option.querySelector('input[type="radio"]');
      
      input.addEventListener('change', () => {
        options.forEach(opt => opt.classList.remove('active'));
        if (input.checked) {
          option.classList.add('active');
        }
      });
    });
  });

  // FileTree
  document.querySelectorAll('[data-tree-toggle]').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.treeToggle;
      const content = document.querySelector(\`[data-tree-content="\${id}"]\`);
      const toggle = item.querySelector('.tree-toggle');
      
      if (content && toggle) {
        const isExpanded = content.classList.contains('expanded');
        content.classList.toggle('expanded');
        toggle.classList.toggle('expanded');
      }
    });
  });

  // Выделение активного файла
  document.querySelectorAll('.tree-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (!item.querySelector('.tree-toggle') || 
          e.target.closest('.tree-toggle')) return;
      
      document.querySelectorAll('.tree-item.active')
        .forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
`;

// Базовый Layout
const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface UI - Controls Demo"
    description="UI Controls for desktop applications"
    favicon="/assets/logo.png"
    normalizeCss
    htmx
    alpine
    head={<style>{theme.cssVariables}</style>}
  >
    {children}
    <script>{script}</script>
  </LayoutSimple>
));

// Инициализация приложения
const reface = new Reface({
  layout: Layout,
});

// Добавляем LiveReload в режиме разработки
if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

// Создаем Hono приложение
const app = new Hono();
reface.hono(app);

// Определяем маршруты
// app.get("/", (c) => {
//   return c.html(reface.render(<RefaceUIPage />));
// });

app.get("/*", async (c) => {
  const currentPath = c.req.path;
  const stories = await loadStories(Deno.cwd() + "/@reface-ui");

  return c.html(
    reface.render(
      <LayoutSimple>
        <ReStory
          stories={stories}
          currentPath={currentPath}
        />
      </LayoutSimple>,
    ),
  );
});

export default app;
