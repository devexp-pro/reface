import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const RadioWrapper = styled.label`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    cursor: pointer;
    user-select: none;
  }

  & input[type="radio"] {
    display: none;
  }

  & .radio-custom {
    width: 16px;
    height: 16px;
    border: 1px solid ${theme.colors.border.base};
    border-radius: 50%;
    background: ${theme.colors.bg.input};
    position: relative;
  }

  & input[type="radio"]:checked + .radio-custom::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.colors.accent.base};
  }

  & .radio-label {
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.base};
  }

  &:hover .radio-custom {
    border-color: ${theme.colors.border.hover};
  }
`;

type RadioProps = {
  children: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (e: Event) => void;
};

export const Radio = component((props: RadioProps, children) => (
  <RadioWrapper>
    <input
      type="radio"
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
    />
    <span class="radio-custom"></span>
    <span class="radio-label">{children}</span>
  </RadioWrapper>
));
