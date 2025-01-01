import { component } from "@reface/recast";
import { styled } from "@reface/recast";
import { Grid, GridCol } from "./Grid.tsx";
import { theme } from "../theme.ts";
export const meta = {
  title: "Layout/Grid",
  description: "Grid layout component with column control",
};

const Box = styled.div /*css*/`
  & {
    padding: 1rem;
    background: ${theme.colors.accent.base};
    color: white;
    text-align: center;
    border-radius: 4px;
  }
`;

export const Basic = component(() => (
  <Grid columns={12} gap="md">
    {/* 12 колонок по 1 */}
    {Array.from({ length: 12 }).map((_, i) => (
      <GridCol>
        <Box>1</Box>
      </GridCol>
    ))}

    {/* 6 колонок по 2 */}
    {Array.from({ length: 6 }).map((_, i) => (
      <GridCol span={2}>
        <Box>2</Box>
      </GridCol>
    ))}

    {/* 3 колонки по 4 */}
    {Array.from({ length: 3 }).map((_, i) => (
      <GridCol span={4}>
        <Box>4</Box>
      </GridCol>
    ))}

    {/* 2 колонки по 6 */}
    {Array.from({ length: 2 }).map((_, i) => (
      <GridCol span={6}>
        <Box>6</Box>
      </GridCol>
    ))}

    {/* 1 колонка на 12 */}
    <GridCol span={12}>
      <Box>12</Box>
    </GridCol>
  </Grid>
));

export const WithOffset = component(() => (
  <Grid columns={12} gap="md">
    <GridCol span={6}>
      <Box>span 6</Box>
    </GridCol>
    <GridCol span={4} offset={2}>
      <Box>span 4, offset 2</Box>
    </GridCol>
    <GridCol span={3}>
      <Box>span 3</Box>
    </GridCol>
    <GridCol span={3} offset={6}>
      <Box>span 3, offset 6</Box>
    </GridCol>
  </Grid>
));

export const CustomRange = component(() => (
  <Grid columns={12} gap="md">
    <GridCol start={1} end={4}>
      <Box>start 1, end 4</Box>
    </GridCol>
    <GridCol start={4} end={10}>
      <Box>start 4, end 10</Box>
    </GridCol>
    <GridCol start={10} end={13}>
      <Box>start 10, end 13</Box>
    </GridCol>
  </Grid>
));

export const AutoFit = component(() => (
  <Grid columns="auto" gap="md">
    <GridCol>
      <Box>Auto</Box>
    </GridCol>
    <GridCol>
      <Box>Fit</Box>
    </GridCol>
    <GridCol>
      <Box>Grid</Box>
    </GridCol>
  </Grid>
));

export const Nested = component(() => (
  <Grid columns={12} gap="md">
    <GridCol span={8}>
      <Grid columns={2} gap="sm">
        <GridCol>
          <Box>Nested 1</Box>
        </GridCol>
        <GridCol>
          <Box>Nested 2</Box>
        </GridCol>
      </Grid>
    </GridCol>
    <GridCol span={4}>
      <Box>Main Col</Box>
    </GridCol>
  </Grid>
));
