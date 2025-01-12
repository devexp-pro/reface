import { component, styled } from "@recast";
import { theme } from "../theme.ts";

export const SelectWrapper = styled.div`
  & {
    position: relative;
    width: 100%;
  }

  &:after {
    content: "▼";
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.dimmed};
    pointer-events: none;
    font-size: 10px;
    z-index: 1;
  }
`;

export const StyledSelect = styled.select`
  & {
    width: 100%;
    height: 24px;
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    padding-right: 24px;
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: 1px solid ${theme.colors.accent.base};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & optgroup {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.dimmed};
    background: ${theme.colors.bg.panel};
  }

  & option {
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.base};
    background: ${theme.colors.bg.input};
  }
`;

type SelectProps = {
  children: any;
  disabled?: boolean;
  value?: string;
};

export const Select = component((props: SelectProps, children) => (
  <SelectWrapper>
    <StyledSelect {...props}>{children}</StyledSelect>
  </SelectWrapper>
));
