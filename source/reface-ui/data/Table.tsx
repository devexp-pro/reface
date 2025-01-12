import { component, styled } from "@recast";
import { table, tbody, td, th, thead, tr } from "@recast/element";

const StyledTable = styled.table /*css*/`
  & {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const StyledTableHead = styled.thead /*css*/`
  & {
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
  }
`;

const StyledTableBody = styled.tbody /*css*/`
  & tr:hover {
    background: #f8fafc;
  }
`;

const StyledTableRow = styled.tr /*css*/`
  & {
    border-bottom: 1px solid #e2e8f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTableHeader = styled.th /*css*/`
  & {
    text-align: left;
    padding: 0.75rem 1rem;
    font-weight: 600;
    color: #1e293b;
  }
`;

const StyledTableCell = styled.td /*css*/`
  & {
    padding: 0.75rem 1rem;
    color: #475569;
  }
`;

export const Table = component((props, children) =>
  StyledTable(props)`${children}`
);
export const TableHead = component((props, children) =>
  StyledTableHead(props)`${children}`
);
export const TableBody = component((props, children) =>
  StyledTableBody(props)`${children}`
);
export const TableRow = component((props, children) =>
  StyledTableRow(props)`${children}`
);
export const TableHeader = component((props, children) =>
  StyledTableHeader(props)`${children}`
);
export const TableCell = component((props, children) =>
  StyledTableCell(props)`${children}`
);
