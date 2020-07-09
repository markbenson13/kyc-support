import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableFilter from "../components/TableFilter";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

const customersColumn = [
  { id: "name", title: "Name" },
  { id: "email", title: "Email" },
  { id: "dateSubmitted", title: "Date Submitted" },
  { id: "level", title: "Level" },
  { id: "status", title: "Status" },
  { id: "feedback", title: "Feedback" },
  { id: "action", title: "Action" },
];

const customerData = [
  {
    name: "Rodrigo Roa Duterte",
    email: "roa@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
  {
    name: "Harry Roque",
    email: "harry@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
  {
    name: "Gloria Macapagal Arroyo",
    email: "garroyo@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
];

const Customers = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <h2>Customers</h2>
        <TableContainer
          component={Paper}
          id="table-wrapper"
          className="table-wrapper"
        >
          <div className="table-header">
            <Typography variant="h3">Customers</Typography>
            <TableFilter />
          </div>
          <Table className="table" aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {customersColumn.map(({ id, title }) => (
                  <TableCell key={id}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="left">{data.email}</TableCell>
                  <TableCell align="left">{data.dateSubmitted}</TableCell>
                  <TableCell align="left">{data.level}</TableCell>
                  <TableCell align="left">{data.status}</TableCell>
                  <TableCell align="left">{data.feedback}</TableCell>
                  <TableCell align="center">
                    <Link to="/">{data.action}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Customers;
