import { component, styled } from "@recast";

const StyledQuote = styled.blockquote /*css*/`
  & {
    border-left: 4px solid #3b82f6;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    background: #f8fafc;
    color: #475569;
    font-size: 1rem;
    line-height: 1.8;
  }

  & > * {
    margin: 0.75rem 0;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  & p {
    line-height: 1.8;
  }

  & blockquote {
    margin: 1rem 0;
    opacity: 0.8;
  }
`;

export const Quote = component((props, children) =>
  StyledQuote(props)`${children}`
);
