import React, { Component } from "react";
import FirebaseConfig, { db, auth } from "../config/FirebaseConfig";
import firebase from "firebase";
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
import { Link } from "@material-ui/core";

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

function TablePaginationActions(props) {
  // const classes = useStyles1();
  // const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
}

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
    console.log();
    const pepRef = FirebaseConfig.database().ref("user_namescan/pep");
    pepRef.once("value", (snapshot) => {
      console.log(snapshot.val());
    });
    // console.log(pepRef);
    // db.ref("user_kyc/").on("value", (snapshot) => {
    //   const users = snapshot.val();
    //   console.log(users);
    // });

    const user_kyc =
      "https://loyaltywallet-e9379.firebaseio.com/user_kyc.json/";
    const user_wallet =
      "https://loyaltywallet-e9379.firebaseio.com/user_wallet.json/";

    const getUserKyc = axios.get(user_kyc);

    // .then((res) => {
    //   const userIds = Object.keys(res.data);
    //   const users = [];
    //   // console.log(userIds);

    //   userIds.forEach((user) => {
    //     let { data, name_scan, sanctions_list, status } = res.data[user];
    //     users.push({
    //       id: user,
    //       user_data: JSON.parse(data["level_2"]),
    //       name_scan: JSON.parse(name_scan),
    //       sanctions_list: JSON.parse(sanctions_list),
    //       status: JSON.parse(status),
    //     });
    //   });

    //   this.setState({
    //     users: users,
    //   });
    // console.log(this.state.users);
    // });

    const getUserWallet = axios.get(user_wallet);
    // .then((res) => {
    //   const userIds = Object.keys(res.data);
    //   const user_wallet = [];
    //   // console.log(userIds);

    //   userIds.forEach((user) => {
    //     let { data } = res.data[user];
    //     user_wallet.push({
    //       id: user,
    //       user_data: JSON.parse(data),
    //     });
    //   });

    //   this.setState({
    //     users_wallet: user_wallet,
    //   });
    //   // console.log(this.state.users_wallet);
    // });

    const usersObj = {};
    const users_wallet = [];

    Promise.all([getUserKyc, getUserWallet]).then((values) => {
      console.log("asd", values);
      const userKycData = values.filter((x) => x.config.url === user_kyc);
      const userWalletData = values.filter((x) => x.config.url === user_wallet);
      console.log("userWalletData", userWalletData);

      userKycData.forEach((kyc_data) => {
        const userIds = Object.keys(kyc_data.data);

        console.log(userIds);

        userIds.forEach((user) => {
          console.log("kycid", user);

          let { data, name_scan, sanctions_list, status } = kyc_data.data[user];
          usersObj[user] = {
            user_data: JSON.parse(data["level_2"]),
            name_scan: JSON.parse(name_scan),
            sanctions_list: JSON.parse(sanctions_list),
            status: JSON.parse(status),
          };
        });
      });

      userWalletData.forEach((wallet_data) => {
        const userIds = Object.keys(wallet_data.data);
        console.log(userIds);

        userIds.forEach((user) => {
          let { data } = wallet_data.data[user];
          data = JSON.parse(data);
          console.log("userwalletid", user);
          usersObj[user] = {
            ...{
              id: user,
              wallet_data: data[0],
            },
            ...usersObj[user],
          };
          console.log("data", data);
        });
      });
      const usersArray = Object.values(usersObj);
      console.log("usersArray", usersArray);
      this.setState({
        users: usersArray,
        users_wallet: users_wallet,
      });
    });
  }

  render() {
    return (
      <>
        <Sidebar />
        <Header />

        {/* {console.log(this.state.users)} */}
        <div className="content-wrapper">
          <h2>KYC</h2>
          <ul>
            {this.state.users.map((user) => {
              return [user.id, user.user_data.birthplace];
            })}
          </ul>
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
                {pendingData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.dateSubmitted}</TableCell>
                    <TableCell align="left">{data.level}</TableCell>
                    <TableCell align="left">{data.customerType}</TableCell>
                    <TableCell align="left">{data.pepScan}</TableCell>
                    <TableCell align="left">{data.openedBy}</TableCell>
                    <TableCell align="center">
                      <Link to="/">{data.action}</Link>
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
          </TableContainer>
        </div>
      </>
    );
  }
}

export default Kyc;
