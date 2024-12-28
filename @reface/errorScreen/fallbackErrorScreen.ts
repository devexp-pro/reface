export function fallbackErrorScreen(text: string): string {
  return `
        <div style="
          font-family: ui-monospace, monospace;
          padding: 2rem;
          background: #1e293b;
          color: #f1f5f9;
          border-radius: 0.5rem;
          margin: 1rem;
        ">
          <div style="
            color: #ef4444;
            font-size: 1.25rem;
            margin-bottom: 1rem;
          ">Render Error</div>
          <pre style="
            white-space: pre-wrap;
            word-break: break-all;
            margin: 0;
            color: #94a3b8;
          ">${text}</pre>
        </div>
      `;
}
