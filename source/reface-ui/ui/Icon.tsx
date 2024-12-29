import { component, styled } from "@recast";
import { HeadSlot, Template } from "@recast/slots";

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
    <>
      <StyledIcon
        class={`${weightClass} ph-${name} size-${size} ${className || ""}`}
      />
      <Template slot={HeadSlot.getSlot()} key="icon-phosphor">
        <script src="https://unpkg.com/@phosphor-icons/web@2.1.1" />
      </Template>
    </>
  );
});
