import React from "react";
import { db } from "../config/FirebaseConfig";
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

class Kyc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      name_scan: [],
      sanctions_list: [],
      status: [],
      user_wallet: [],
      user_history: [],
    };
  }

  componentDidMount() {
    // const users = [];
    const usersObj = {};
    const users_wallet = [];

    const userKyc = db.ref("user_kyc");
    const userWallet = db.ref("user_wallet");

    Promise.all([userKyc.once("value"), userWallet.once("value")]).then(
      (response) => {
        const userKyc = response[0].val();
        const userWallet = response[1].val();
        const userIds = Object.keys(userKyc);

        const userMap = userIds.reduce((map, userId) => {
          // console.log("userkys", userKyc[userId]);
          if (userKyc[userId].hasOwnProperty("data")) {
            map[userId] = {
              kycData: userKyc[userId],
              walletData: null,
            };
            if (userWallet[userId]) {
              map[userId].walletData = userWallet[userId];
            }
          }

          return map;
        }, {});

        Object.keys(userMap).map((users) => {
          // console.log("users", users);
        });

        console.log("usermap", userMap);

        const userList = Object.keys(userMap).map((userId) => {
          const {
            kycData: { data: newData, name_scan, status: newStatus, history },
            walletData,
          } = userMap[userId];

          // const history_list =
          //   history &&
          //   Object.keys(history).map((history_item) => {
          //     return history[history_item];
          //   });

          // console.log("list", history_list);

          const data = newData.level_2 ? JSON.parse(newData.level_2) : {};
          const level3 = newData.level_3 ? JSON.parse(newData.level_3) : {};
          const level4 = newData.level_4 ? JSON.parse(newData.level_4) : {};
          const newscan = name_scan ? JSON.parse(name_scan) : {};
          const status = newStatus ? JSON.parse(newStatus) : {};
          const wallet = walletData.data ? JSON.parse(walletData.data) : {};
          const history_list = history;
          // const newEmployed = level4.employed
          //   ? (level4.employed === typeof Object && level4.employed) || {}
          //   : {};
          // const newSelfEmployed = level4.self_employed
          //   ? (level4.self_employed === typeof Object &&
          //       level4.self_employed) ||
          //     {}
          //   : {};

          // console.log("newscan", newscan.numberOfPepMatches);
          // console.log("history-item", history_list);

          return {
            id: userId,
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            gender: data.gender || "",
            idPhotoExpiration: data.id_photo_exp_date || "",
            selfieUrl: data.selfie_id_url || "",
            idPhotoType: data.id_photo_type || "",
            birthdate: data.birthdate || "",
            birthplace: data.birthplace || "",
            idPhotoBackUrl: data.id_photo_back_url || "",
            idPhotoFrontUrl: data.id_photo_front_url || "",
            nationality: data.nationality || "",
            idPhotoNo: data.id_photo_no || "",
            email: wallet[0].email || "",
            dateSubmitted: wallet[0].createdAt || "",
            dateUpdated: wallet[0].updatedAt || "",
            customerType: wallet[0].typeOfUser || "",
            mobileNo: wallet[0].mobileNo || "",
            level: status.current_level || "",
            status: status.level_2[1].status || "",
            pepMatch: newscan.numberOfPepMatches === 0 ? "Negative" : "",
            presentAddress: level3.present_address || {},
            permanentAddress: level3.permanent_address || {},
            documentPhotoUrl: level4.document_photo_url || "",
            documentType: level4.document_type || "",
            occupation: (level4.employed && level4.employed.occupation) || "",
            position: (level4.employed && level4.employed.position) || "",
            industry: (level4.employed && level4.employed.industry) || "",
            company: (level4.employed && level4.employed.company) || "",
            // occupationDetails:
            //   (!!Object.keys(newEmployed).length && newEmployed) ||
            //   (!!Object.keys(newSelfEmployed).length && newSelfEmployed) ||
            //   {},
            // employmentCategory:
            //   (!!Object.keys(newEmployed).length && "Employed") ||
            //   (!!Object.keys(newSelfEmployed).length && "Self Employed") ||
            //   "",
            history: (history_list && history_list) || {},
          };
        });

        console.log("userlist", userList);
        this.setState({ users: userList });

        this.state.users.length &&
          this.state.users.map((user) => {
            let latestDate = "";
            let latestHistory = "";

            Object.keys(user.history).map((history_item) => {
              if (!latestDate) {
                latestDate = user.history[history_item].last_edit_date;
                latestHistory = user.history[history_item];
              } else {
                if (latestDate < user.history[history_item].last_edit_date) {
                  latestDate = user.history[history_item].last_edit_date;
                  latestHistory = user.history[history_item];
                }
              }
              const userHistory = this.state.user_history;
              userHistory[latestHistory.id] = latestHistory;
              this.setState({ user_history: userHistory });
            });
          });
      }
    );
  }

  render() {
    function formatDate(string) {
      var options = { month: "numeric", day: "numeric", year: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    }

    const history = this.state.user_history;

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
                <TableRow className="table-head">
                  {pendingColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.length &&
                  this.state.users.map((user, key) => (
                    <TableRow key={user.id} className="table-row">
                      <TableCell>
                        {user.first_name +
                          " " +
                          user.middle_name +
                          " " +
                          user.last_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.dateSubmitted)}</TableCell>
                      <TableCell>Level {user.level}</TableCell>
                      <TableCell>{user.customerType}</TableCell>
                      <TableCell>{user.pepMatch}</TableCell>
                      {Object.keys(user.history) &&
                        Object.keys(user.history).map((user_history) => (
                          <TableCell>
                            {formatDate(
                              user.history[user_history].last_edit_date
                            )}
                          </TableCell>
                        ))}

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
                <TableRow className="table-head">
                  {allColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.length &&
                  this.state.users.map((user) => (
                    <TableRow key={user.id} className="table-row">
                      <TableCell>
                        {user.first_name +
                          " " +
                          user.middle_name +
                          " " +
                          user.last_name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      {Object.keys(user.history) &&
                        Object.keys(user.history).map((user_history) => (
                          <TableCell>
                            {user.history
                              ? user.history[user_history].reviewer +
                                " " +
                                formatDate(
                                  user.history[user_history].last_edit_date
                                )
                              : user.dateUpdated}
                          </TableCell>
                        ))}

                      <TableCell>Level {user.level}</TableCell>

                      {Object.keys(user.history) &&
                        Object.keys(user.history).map((user_history) => (
                          <>
                            <TableCell>
                              {user.history[user_history].status}
                            </TableCell>
                            <TableCell>
                              {user.history[user_history].remarks}
                            </TableCell>
                          </>
                        ))}
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
        </div>
      </>
    );
  }
}

export default Kyc;
