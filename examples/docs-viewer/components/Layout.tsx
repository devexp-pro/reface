import { styled } from "../../../source/mod.ts";

export const Container = styled.div`
  & {
    max-width: 90rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export const Header = styled.header`
  & {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #eaeaea;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

  & h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    letter-spacing: -0.02em;
  }
`;

export const Layout = styled.div`
  & {
    display: flex;
    gap: 2rem;
    flex: 1;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    & {
      flex-direction: column;
      padding: 1rem;
    }
  }
`; 