import { component, styled } from "@recast";

const Header = styled.div /* css */`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: ui-monospace, monospace;
    position: relative;
    margin-bottom: 1.5rem;

    .header-content {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .reface-logo {
      background: #ef4444;
      color: #fff;
      width: 3rem;
      height: 3rem;
      min-width: 3rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      font-weight: bold;
      font-size: 1.5rem;
    }

    .error-title {
      font-weight: 800;
      font-size: 1.5rem;
      color: #ef4444;
    }

    .error-message {
      font-weight: 300;
      font-size: 1.5rem;
      color: #64748b;
    }

    .docs-link {
      color: #64748b;
      text-decoration: none;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.2s;

      &:hover {
        color: #94a3b8;
      }

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`;

export const ErrorPageHeader = component((
  attr: { title: string; error: string },
) => (
  <Header>
    <div class="header-content">
      <span class="reface-logo">R</span>
      <span class="error-title">{attr.title}:</span>
      <span class="error-message">{attr.error}</span>
    </div>
    <a href="https://reface.deno.dev/docs" target="_blank" class="docs-link">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
          clip-rule="evenodd"
        />
      </svg>
      Documentation
    </a>
  </Header>
));
