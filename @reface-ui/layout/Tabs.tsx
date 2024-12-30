import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "../theme.ts";

const TabList = styled.div`
  & {
    display: flex;
    gap: ${theme.spacing.xs};
    border-bottom: 1px solid ${theme.colors.border.base};
    padding: 0 ${theme.spacing.md};
  }
`;

const TabItem = styled.div`
  & {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    color: ${theme.colors.text.dimmed};
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  &.active {
    color: ${theme.colors.accent.base};
  }

  &.active:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.accent.base};
  }
`;

const TabContent = styled.div`
  & {
    padding: ${theme.spacing.md};
  }
`;

type TabsProps = {
  tabs: string[];
  activeTab: number;
  children: JSX.Element[];
  onChange?: (index: number) => void;
};

export const Tabs = component((props: TabsProps, children) => (
  <div>
    <TabList>
      {props.tabs.map((tab, index) => (
        <TabItem
          class={index === props.activeTab ? "active" : ""}
          onClick={() => props.onChange?.(index)}
        >
          {tab}
        </TabItem>
      ))}
    </TabList>
    <TabContent>
      {children[props.activeTab]}
    </TabContent>
  </div>
));
