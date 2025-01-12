import { component, styled } from "@recast";
import { Stack } from "./layout/Stack.tsx";
import { Grid, GridCol } from "./layout/Grid.tsx";
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

const ProgressionPreview = styled.div /*css*/`
  & {
    height: 24px;
    background: ${theme.colors.accent.base};
    border-radius: 4px;
  }
`;

const ProgressionRow = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    padding: ${theme.spacing.xs};
  }
`;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const ProgressionsStory = component(() => {
  const steps = Array.from({ length: 10 }, (_, i) => i + 1);

  const progressions = [
    { name: "Linear", fn: theme.sizeUtils.linear },
    { name: "Square", fn: theme.sizeUtils.square },
    { name: "Golden", fn: theme.sizeUtils.golden },
    { name: "Log", fn: theme.sizeUtils.log },
    { name: "Fibonacci", fn: theme.sizeUtils.fibonacci },
  ];

  return (
    <Stack gap="lg" direction="vertical">
      <h2>Size Progressions</h2>
      <Grid columns={2} gap="lg">
        {progressions.map(({ name, fn }) => (
          <GridCol>
            <h3>{name}</h3>
            <Stack gap="xs" direction="vertical">
              {steps.map((step) => {
                const value = fn(step);
                return (
                  <ProgressionRow>
                    <ProgressionPreview style={{ width: value }} />
                    <span>Step {step}: {value}</span>
                  </ProgressionRow>
                );
              })}
            </Stack>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
});

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
