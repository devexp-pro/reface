import { styled } from "@reface/plugins/styled";
import { theme } from "../styles/theme.ts";
import { textStyles, headingStyles, linkStyles, blockStyles } from "../styles/utils.ts";

// Text Components
export const Text = styled.span`
  & {
    ${textStyles}
  }
`;

export const Paragraph = styled.p`
  & {
    ${textStyles}
    margin: ${theme.spacing[4]} 0;
  }
`;

// Heading Components
const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => styled[`h${level}`]`
  & {
    ${headingStyles}
    font-size: ${
      level === 1 ? theme.typography.sizes["4xl"] :
      level === 2 ? theme.typography.sizes["3xl"] :
      level === 3 ? theme.typography.sizes["2xl"] :
      level === 4 ? theme.typography.sizes.xl :
      level === 5 ? theme.typography.sizes.lg :
      theme.typography.sizes.base
    };
  }
`;

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);

// Inline Components
export const Strong = styled.strong`
  & {
    font-weight: var(--font-semibold);
  }
`;

export const Emphasis = styled.em`
  & {
    font-style: italic;
  }
`;

export const Link = styled.a`
  & {
    ${linkStyles}
  }
`;

// Block Components
export const Blockquote = styled.blockquote`
  & {
    ${blockStyles}
    border-left: 4px solid ${theme.colors.text.secondary};
    font-style: italic;
    color: ${theme.colors.text.secondary};
  }
`;

export const HorizontalRule = styled.hr`
  & {
    border: none;
    border-top: ${theme.borders.default};
    margin: ${theme.spacing[8]} 0;
  }
`;

// List Components
export const UnorderedList = styled.ul`
  & {
    list-style-type: disc;
    padding-left: ${theme.spacing[6]};
    margin: ${theme.spacing[4]} 0;
  }
`;

export const OrderedList = styled.ol`
  & {
    list-style-type: decimal;
    padding-left: ${theme.spacing[6]};
    margin: ${theme.spacing[4]} 0;
  }
`;

export const ListItem = styled.li`
  & {
    ${textStyles}
    margin: ${theme.spacing[2]} 0;
  }
`;

// Table Components
export const Table = styled.table`
  & {
    width: 100%;
    border-collapse: collapse;
    margin: ${theme.spacing[4]} 0;
    overflow-x: auto;
    display: block;
  }

  @media (min-width: 768px) {
    & {
      display: table;
    }
  }
`;

export const TableHead = styled.thead`
  & {
    background: ${theme.colors.background.secondary};
  }
`;

export const TableRow = styled.tr`
  & {
    border-bottom: ${theme.borders.default};
  }
`;

export const TableHeader = styled.th`
  & {
    ${textStyles}
    font-weight: var(--font-semibold);
    text-align: left;
    padding: ${theme.spacing[3]};
  }
`;

export const TableCell = styled.td`
  & {
    ${textStyles}
    padding: ${theme.spacing[3]};
  }
`;

export const Image = styled.img`
  & {
    max-width: 100%;
    height: auto;
    border-radius: ${theme.borders.radius.sm};
    margin: ${theme.spacing[4]} 0;
  }
`;
