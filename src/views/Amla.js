import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import Table from "../components/Table";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFilter from "../components/TableFilter";
import { Typography } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { db } from "../config/FirebaseConfig";

const amlaColumn = [
  { id: "id", title: "RM Number" },
  { id: "name", title: "Name" },
  { id: "lastUpdateby", title: "Last Update By" },
  { id: "lastOpenedby", title: "Last Opened By" },
  { id: "action", title: "Action" },
];

const amlaData = [
  {
    id: 1,
    name: "Rodrigo Roa Duterte",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    lastOpenedBy: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
  {
    id: 2,
    name: "Benigno Aquino Jr.",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    lastOpenedBy: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
  {
    id: 3,
    name: "Gloria Macapagal Arroyo",
    lastUpdateby: "Winnie 06/25/2020 10:20",
    lastOpenedBy: "Winnie 06/25/2020 10:20",
    action: "View",
    _unique: "ID",
  },
];

class Amla extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const politicalUsers = db.ref("user_namescan/pep");

    Promise.all([politicalUsers.once("value")]).then((response) => {
      const politicalPerson = response[0].val();
      const userIds = Object.keys(politicalPerson);
      // console.log("userid", userIds);

      this.setState({ users: userIds });

      // console.log("state", this.state.users);

      // userIds.map((data) => {
      //   console.log("users", data);
      //   this.setState({ users: data }, function () {
      //     console.log("state", this.state.users);
      //   });
      // });
    });
  }

  render() {
    const { users } = this.state;
    console.log("state", users);
    return (
      <div>
        <Sidebar />
        <Header />
        <div className="content-wrapper">
          <h2>Amla</h2>
          <TableContainer
            component={Paper}
            id="table-wrapper"
            className="table-wrapper"
          >
            <div className="table-header">
              <Typography variant="h3">
                List of Politically Exposed Persons
              </Typography>
            </div>
            <Table className="table" aria-label="custom pagination table">
              <TableHead className="table-head">
                <TableRow className="table-row">
                  {amlaColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length &&
                  users.map((data, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell align="left">{data}</TableCell>
                      <TableCell align="left">{data.lastUpdateby}</TableCell>
                      <TableCell align="left">{data.lastOpenedBy}</TableCell>
                      <TableCell align="center">
                        <Link>View</Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default Amla;
