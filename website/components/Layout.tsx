import { styled } from "@reface/styled";

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
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    & {
      padding: 1.5rem;
      gap: 1.5rem;
      flex-wrap: wrap;
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

export const Logo = styled.div`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

export const LogoIcon = styled.div`
  & {
    font-size: 1.25rem;
    line-height: 1;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 0.75rem;
    color: white;
    font-weight: 600;
  }
`;

export const LogoText = styled.div`
  & {
    display: flex;
    flex-direction: column;
  }
`;

export const BrandName = styled.div`
  & {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
`;

export const BrandTagline = styled.div`
  & {
    font-size: 0.875rem;
    color: #64748b;
  }
`; 