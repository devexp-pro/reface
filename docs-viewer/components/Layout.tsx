import { styled } from "@reface/elements";

export const Container = styled.div`
  & {
    max-width: 90rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f8fafc;
    overflow-x: hidden;
  }
`;

export const Logo = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  & .logo-symbol {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    border-radius: 0.75rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  & .logo-symbol:hover {
    transform: scale(1.05);
  }

  & .logo-symbol::before {
    content: "R";
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-sans);
  }

  & .logo-text {
    display: flex;
    flex-direction: column;
  }

  & .brand {
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  & .subtitle {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    margin-top: -0.25rem;
  }
`;

export const Header = styled.header`
  & {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const Layout = styled.div`
  & {
    display: flex;
    gap: 2rem;
    flex: 1;
    padding: 2rem;
    max-width: 90rem;
    margin: 0 auto;
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    & {
      padding: 1.5rem;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    & > nav:first-child {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    & {
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
    }
  }
`; 