import { component, styled } from "@recast";
import { theme } from "../theme.ts";

const ColorPickerWrapper = styled.div`
  & {
    width: 100%;
    height: 24px;
    display: flex;
    gap: ${theme.spacing.xs};
    align-items: center;
    min-width: 0;
  }

  & .color-preview {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.border.base};
    cursor: pointer;
  }

  & input[type="text"] {
    width: 0;
    min-width: 0;
    flex: 1 1 auto;
    height: 24px;
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    padding: 0 ${theme.spacing.sm};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.xs};
  }

  & input[type="text"]:focus {
    outline: 1px solid ${theme.colors.accent.base};
  }
`;

type ColorPickerProps = {
  value?: string;
  onChange?: (e: Event) => void;
};

export const ColorPicker = component((props: ColorPickerProps) => (
  <ColorPickerWrapper data-color-picker>
    <input
      type="color"
      value={props.value}
      style="opacity: 0; position: absolute;"
      data-color-input
    />
    <div
      class="color-preview"
      style={`background-color: ${props.value}`}
      data-color-preview
    />
    <input
      type="text"
      value={props.value}
      data-color-text
    />
  </ColorPickerWrapper>
));
