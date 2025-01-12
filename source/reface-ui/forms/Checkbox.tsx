import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const CheckboxWrapper = styled.label`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    cursor: pointer;
    user-select: none;
  }

  & input[type="checkbox"] {
    display: none;
  }

  & .checkbox-custom {
    width: 16px;
    height: 16px;
    border: 1px solid ${theme.colors.border.base};
    border-radius: 4px;
    background: ${theme.colors.bg.input};
    position: relative;
  }

  & input[type="checkbox"]:checked + .checkbox-custom::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${theme.colors.accent.base};
    font-size: 12px;
  }

  & .checkbox-label {
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.base};
  }

  &:hover .checkbox-custom {
    border-color: ${theme.colors.border.hover};
  }
`;

type CheckboxProps = {
  children: string;
  checked?: boolean;
  onChange?: (e: Event) => void;
  "data-sync"?: string;
};

export const Checkbox = component((props: CheckboxProps, children) => (
  <CheckboxWrapper>
    <input
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
      data-sync={props["data-sync"]}
    />
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">{children}</span>
  </CheckboxWrapper>
));
