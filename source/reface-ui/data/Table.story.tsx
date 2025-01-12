import { component } from "@recast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table.tsx";

export default {
  title: "Data/Table",
  component: Table,
};

export const Basic = component(() => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Name</TableHeader>
        <TableHeader>Age</TableHeader>
        <TableHeader>City</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>John Doe</TableCell>
        <TableCell>25</TableCell>
        <TableCell>New York</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane Smith</TableCell>
        <TableCell>30</TableCell>
        <TableCell>London</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob Johnson</TableCell>
        <TableCell>28</TableCell>
        <TableCell>Paris</TableCell>
      </TableRow>
    </TableBody>
  </Table>
));

export const WithoutHeader = component(() => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Simple</TableCell>
        <TableCell>Table</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Without</TableCell>
        <TableCell>Header</TableCell>
      </TableRow>
    </TableBody>
  </Table>
));

export const CompactTable = component(() => (
  <Table style={{ fontSize: "0.75rem" }}>
    <TableHead>
      <TableRow>
        <TableHeader>ID</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Value</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>001</TableCell>
        <TableCell>Active</TableCell>
        <TableCell>$100</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>002</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>$75</TableCell>
      </TableRow>
    </TableBody>
  </Table>
));
