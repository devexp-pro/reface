import { component, styled } from "@recast";
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
  activeTab: string;
};

export const Tabs = component<TabsProps>((props, children) => (
  <div>
    <TabList>
      {props.tabs.map((tab, index) => (
        <TabItem
          class={tab === props.activeTab ? "active" : ""}
        >
          {tab}
        </TabItem>
      ))}
    </TabList>
    <TabContent>
      {children}
    </TabContent>
  </div>
));
