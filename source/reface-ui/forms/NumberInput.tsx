import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const NumberInputWrapper = styled.div`
  & {
    position: relative;
    width: 100%;
    height: 24px;
    background: ${theme.colors.bg.input};
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: ew-resize;
  }

  & input {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    text-align: right;
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
  }

  & input:focus {
    outline: 1px solid ${theme.colors.accent.base};
  }
`;

type NumberInputProps = {
  value?: string | number;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  onChange?: (e: Event) => void;
  "data-drag"?: string;
};

export const NumberInput = component((props: NumberInputProps) => (
  <NumberInputWrapper>
    <input
      type="number"
      value={props.value}
      step={props.step}
      data-min={props.min}
      data-max={props.max}
      onChange={props.onChange}
      data-drag={props["data-drag"]}
    />
  </NumberInputWrapper>
));
