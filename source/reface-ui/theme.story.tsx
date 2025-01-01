import { component, styled } from "@reface/recast";
import { Stack } from "./layout/Stack.tsx";
import { Grid } from "./layout/Grid.tsx";
import { theme } from "./theme.ts";

const ColorPreview = styled.div /*css*/`
  & {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    margin-right: ${theme.spacing.sm};
  }
`;

const ColorRow = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    padding: ${theme.spacing.xs};
  }
`;

const Section = styled.div /*css*/`
  & {
    margin-bottom: ${theme.spacing.lg};
  }

  & h3 {
    margin-bottom: ${theme.spacing.sm};
  }
`;

const SpacingPreview = styled.div /*css*/`
  & {
    height: 24px;
    background: ${theme.colors.accent.base};
    border-radius: 4px;
  }
`;

const SizePreview = styled.div /*css*/`
  & {
    width: 24px;
    height: 24px;
    background: ${theme.colors.accent.base};
    border-radius: 4px;
  }
`;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const ThemeStory = component(() => {
  const colorGroups = Object.entries(theme.colors).map(
    ([groupName, colors]) => {
      const colorEntries = Object.entries(colors as Record<string, string>);

      return (
        <Grid columns={4} gap="lg">
          <Section>
            <h3>{capitalize(groupName)}</h3>
            <Stack gap="xs" direction="vertical">
              {colorEntries.map(([colorName, value]) => (
                <ColorRow>
                  <ColorPreview style={{ background: value }} />
                  <span>{capitalize(colorName)}: {value}</span>
                </ColorRow>
              ))}
            </Stack>
          </Section>
        </Grid>
      );
    },
  );

  return (
    <Stack gap="lg" direction="vertical">
      <h2>Theme</h2>
      {colorGroups}

      <Grid columns={4} gap="lg">
        <Section>
          <h3>Spacing</h3>
          <Stack gap="xs" direction="vertical">
            {Object.entries(theme.spacing).map(([name, value]) => (
              <ColorRow>
                <SpacingPreview style={{ width: value }} />
                <span>{capitalize(name)}: {value}</span>
              </ColorRow>
            ))}
          </Stack>
        </Section>
      </Grid>

      <Grid columns={4} gap="lg">
        <Section>
          <h3>Sizes</h3>
          <Stack gap="xs" direction="vertical">
            {Object.entries(
              theme.sizes,
            ).map(([name, value]) => (
              <ColorRow>
                <SizePreview style={{ width: value, height: value }} />
                <span>{capitalize(name)}: {value}</span>
              </ColorRow>
            ))}
          </Stack>
        </Section>
      </Grid>
    </Stack>
  );
});
