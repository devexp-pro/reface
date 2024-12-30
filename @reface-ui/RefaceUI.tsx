import { component } from "@reface";
import { theme } from "./theme.ts";
import { LayoutSimple } from "@reface/components/LayoutSimple";

// Глобальные стили для :root
const globalStyles = `
  ${theme.cssVariables}

  /* Reset styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-ui);
    font-size: var(--font-size-sm);
    color: var(--color-text-base);
    background: var(--color-bg-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Basic focus styles */
  :focus-visible {
    outline: 2px solid var(--color-accent-base);
    outline-offset: 2px;
  }
`;

// Базовый JavaScript для компонентов
const baseScript = /* js */ `
  // TreeView functionality
  document.addEventListener('click', (e) => {
    // Toggle tree nodes
    if (e.target.closest('[data-tree-toggle]')) {
      const node = e.target.closest('[data-tree-node]');
      const toggle = node.querySelector('[data-tree-toggle]');
      const children = node.querySelector('[data-tree-children]');
      
      if (children) {
        const isExpanded = toggle.getAttribute('data-expanded') === 'true';
        toggle.setAttribute('data-expanded', !isExpanded);
        children.setAttribute('data-hidden', isExpanded);
      }
    }
  });

  // Generic utilities
  window.reface = {
    // Toggle elements
    toggle: (selector) => {
      const el = document.querySelector(selector);
      if (el) {
        const isHidden = el.hasAttribute('hidden');
        if (isHidden) {
          el.removeAttribute('hidden');
        } else {
          el.setAttribute('hidden', '');
        }
      }
    },

    // Toggle class
    toggleClass: (selector, className) => {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.toggle(className);
      }
    },

    // Simple fetch wrapper
    async fetch(url, options = {}) {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'text/html',
            ...options.headers
          },
          ...options
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const html = await response.text();
        return html;
      } catch (error) {
        console.error('Fetch error:', error);
        return null;
      }
    }
  };
`;

type RefaceUIProps = {
  children: JSX.Element;
};

export const RefaceUI = component((props: RefaceUIProps, children) => {
  return (
    <LayoutSimple
      normalizeCss
      htmx
      head={
        <>
          <style>{globalStyles}</style>
          <script>{baseScript}</script>
        </>
      }
    >
      {children}
    </LayoutSimple>
  );
});
