import { type Child, component, styled } from "@recast";
import { theme } from "../theme.ts";

const StyledCard = styled.div /*css*/`
  & {
    background: ${theme.colors.bg.panel};
    border: 1px solid ${theme.colors.border.base};
    border-radius: 6px;
    overflow: hidden;
  }
`;

const CardHeader = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .title {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
    color: ${theme.colors.text.base};
  }
`;

const CardContent = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
  }
`;

type CardProps = {
  title?: string;
  slots?: {
    end?: Child;
  };
};

export const Card = component((props: CardProps, children) => (
  <StyledCard>
    {(props.title || props.slots?.end) && (
      <CardHeader>
        {props.title && <div class="title">{props.title}</div>}
        {props.slots?.end}
      </CardHeader>
    )}
    <CardContent>{children}</CardContent>
  </StyledCard>
));
