import { styled } from "@recast";
import { theme } from "../theme.ts";

export const FieldLabel = styled.span`
  & {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.label};
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
