import { component } from "@recast";
import { globalStyles } from "./theme.ts";
import { LayoutSimple } from "@reface-ui";

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

export const RefaceUI = component((_, children) => {
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
