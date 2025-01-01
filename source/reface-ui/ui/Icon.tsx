import { component, styled } from "@reface/recast";

type IconWeight = "regular" | "thin" | "light" | "bold" | "fill" | "duotone";

type IconProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  weight?: IconWeight;
  class?: string;
};

const StyledIcon = styled.i /*css*/`
  & {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.size-sm { font-size: 1rem; }
  &.size-md { font-size: 1.25rem; }
  &.size-lg { font-size: 1.5rem; }
`;

export const Icon = component(({
  name,
  size = "md",
  weight = "regular",
  class: className,
}: IconProps) => {
  const weightClass = weight === "regular" ? "ph" : `ph-${weight}`;

  return (
    <StyledIcon
      class={`${weightClass} ph-${name} size-${size} ${className || ""}`}
    />
  );
});
