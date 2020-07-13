import React, { Component } from "react";
import { db } from "../config/FirebaseConfig";
// import firebase from "firebase";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import Table from "../components/Table";
import axios from "axios";
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
import { Link } from "react-router-dom";

const pendingColumn = [
  { id: "name", title: "Name" },
  { id: "email", title: "Email" },
  { id: "dateSubmitted", title: "Date Submitted" },
  { id: "level", title: "Level" },
  { id: "customerType", title: "Customer Type" },
  { id: "pepScan", title: "PEP Scan Identified" },
  { id: "openedBy", title: "Last opened by" },
  { id: "action", title: "Action" },
];

const allColumn = [
  { id: "name", title: "Name" },
  { id: "email", title: "Email" },
  { id: "lastEditBy", title: "Last edit by" },
  { id: "level", title: "Level" },
  { id: "status", title: "Status" },
  { id: "feedback", title: "Feedback" },
  { id: "action", title: "Action" },
];

const pendingData = [
  {
    id: "1",
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
  {
    id: "2",
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
  {
    id: "3",
    name: "Rohan",
    email: "deusexmachina892",
    dateSubmitted: "06/25/2020",
    level: "Level 3",
    customerType: "Individual",
    pepScan: "Negative",
    openedBy: "Winnie 06/25/2020 4:30",
    action: "View",
    _unique: "ID",
  },
];

const allData = [
  {
    name: "Rohan",
    email: "deusexmachina892",
    lastEditBy: "Winnie 06/25/2020 1:15",
    level: "Level 3",
    status: "Denies",
    feedback: "Your documents do not match",
    action: "View",
    _unique: "ID",
  },
  {
    name: "Rohan",
    email: "deusexmachina892",
    lastEditBy: "Winnie 06/25/2020 1:15",
    level: "Level 3",
    status: "Escalated",
    feedback: "Complete documents",
    action: "View",
    _unique: "ID",
  },
  {
    name: "Rohan",
    email: "deusexmachina892",
    lastEditBy: "Winnie 06/25/2020 1:15",
    level: "Level 3",
    status: "Escalated",
    feedback: "Your note does not contain the correct information",
    action: "View",
    _unique: "ID",
  },
];

class Kyc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      name_scan: [],
      sanctions_list: [],
      status: [],
      user_wallet: [],
    };
  }

  componentDidMount() {
    const users = [];
    const usersObj = {};
    const users_wallet = [];

    const userKyc = db.ref("user_kyc");
    const userWallet = db.ref("user_wallet");

    const userDataMap = {};

    Promise.all([userKyc.once("value"), userWallet.once("value")]).then(
      (response) => {
        response.forEach((data) => {
          const key = data.key;
          if (key === "user_kyc") {
            processUserKyc(data.val());
          } else if (key === "user_wallet") {
            processUserWallet(data.val());
          }
        });
        console.log(Object.values(userDataMap));
        this.setState({ users: Object.values(userDataMap) });
      }
    );

    function processUserKyc(data) {
      for (const key in data) {
        const kyc_object = data[key];

        userDataMap[key] = {
          ...userDataMap[key],
          ...{
            id: key,
            data: JSON.parse(kyc_object.data.level_2),
            level_3: JSON.parse(kyc_object.data.level_3),
            level_4: JSON.parse(kyc_object.data.level_4),
            name_scan: JSON.parse(kyc_object.name_scan),
            sanctions_list: JSON.parse(kyc_object.sanctions_list),
            status: JSON.parse(kyc_object.status),
          },
        };
      }
    }

    function processUserWallet(obj) {
      for (const key in obj) {
        const wallet_object = JSON.parse(obj[key].data);
        wallet_object.forEach((obj) => {
          userDataMap[obj.userId] = {
            ...userDataMap[obj.userId],
            ...obj,
          };
        });
      }
    }
  }

  render() {
    function formatDate(string) {
      var options = { month: "numeric", day: "numeric", year: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    }

    return (
      <>
        <Sidebar />
        <Header />
        <div className="content-wrapper">
          <h2>KYC</h2>

          <TableContainer
            component={Paper}
            id="table-wrapper"
            className="table-wrapper"
          >
            <div className="table-header">
              <Typography variant="h3">Pending KYC</Typography>
              <TableFilter />
            </div>
            <Table className="table" aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {pendingColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.length &&
                  this.state.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.data.first_name +
                          " " +
                          user.data.middle_name +
                          " " +
                          user.data.last_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>Level {user.status.current_level}</TableCell>
                      <TableCell>{user.typeOfUser}</TableCell>
                      <TableCell>{user.sanctions_list.name}</TableCell>
                      <TableCell>{formatDate(user.updatedAt)}</TableCell>
                      <TableCell align="center">
                        <Link
                          to={{
                            pathname: `/user/${user.id}`,
                            state: { user: user },
                          }}
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            id="table-wrapper"
            className="table-wrapper"
          >
            <div className="table-header">
              <Typography variant="h3">All KYC</Typography>
              <TableFilter />
            </div>
            <Table className="table" aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {pendingColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.length &&
                  this.state.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.data.first_name +
                          " " +
                          user.data.middle_name +
                          " " +
                          user.data.last_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>Level {user.status.current_level}</TableCell>
                      <TableCell>{user.typeOfUser}</TableCell>
                      <TableCell>{user.sanctions_list.name}</TableCell>
                      <TableCell>{user.updatedAt}</TableCell>
                      <TableCell align="center">
                        <Link
                          to={{
                            pathname: `/user/${user.id}`,
                            state: { user: user },
                          }}
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <TableContainer
            component={Paper}
            id="table-wrapper"
            className="table-wrapper"
          >
            <div className="table-header">
              <Typography variant="h3">All KYC</Typography>
              <TableFilter />
            </div>
            <Table className="table" aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {allColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.lastEditBy}</TableCell>
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
          </TableContainer> */}
        </div>
      </>
    );
  }
}

export default Kyc;
