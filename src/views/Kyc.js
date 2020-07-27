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
    };
  }

  componentDidMount() {
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

        // Object.keys(userMap).map((users) => {
        //   console.log("users", users);
        // });

        console.log("usermap", userMap);

        const userList = Object.keys(userMap).map((userId) => {
          const {
            kycData: {
              data: newData,
              name_scan,
              status: current_status,
              level2_status,
              level3_status,
              level4_status,
              history,
            },
            walletData,
          } = userMap[userId];

          const data = newData.level_2 ? JSON.parse(newData.level_2) : {};
          const level3 = newData.level_3 ? JSON.parse(newData.level_3) : {};
          const level4 = newData.level_4 ? JSON.parse(newData.level_4) : {};
          const newscan = name_scan ? JSON.parse(name_scan) : {};
          const status = current_status ? JSON.parse(current_status) : {};
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
          // console.log("status", status);

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
            currentStatus: status.level_2[1].status || "",
            currentLevel: status.current_level || "",
            pepMatch: newscan.numberOfPepMatches === 0 ? "Negative" : "",
            // presentAddress: level3.present_address || {},
            // permanentAddress: level3.permanent_address || {},
            billingStatement: level3.billing_statement_photo_url || "",
            permanentAddress1: level3.pm_address_1 || "",
            permanentAddress2: level3.permanent_address || "",
            permanentBrgy: level3.pm_barangay || "",
            permanentCity: level3.pm_city || "",
            permanentCountry: level3.pm_country || "",
            permanentState: level3.pm_state_prov || "",
            permanentZipCode: level3.pm_zip_code || "",
            presentAddress1: level3.pr_address_1 || "",
            presentAddress2: level3.pr_address || "",
            presentBrgy: level3.pr_barangay || "",
            presentCity: level3.pr_city || "",
            presentCountry: level3.pr_country || "",
            presentState: level3.pr_state_prov || "",
            presentZipCode: level3.pr_zip_code || "",
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
      }
    );
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
                <TableRow className="table-head">
                  {pendingColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.length &&
                  this.state.users.map((user) => {
                    const historyKeys = Object.keys(user.history);
                    const targetHistoryKeysIndex = historyKeys.length - 1;
                    const keyIndex = historyKeys[targetHistoryKeysIndex];
                    const selectedObj = user.history[keyIndex] || "";

                    if (user.currentStatus === "under review") {
                      return (
                        <TableRow className="table-row">
                          <TableCell>
                            {user.first_name +
                              " " +
                              user.middle_name +
                              " " +
                              user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {formatDate(user.dateSubmitted)}
                          </TableCell>
                          <TableCell>Level {user.currentLevel}</TableCell>
                          <TableCell>{user.customerType}</TableCell>
                          <TableCell>{user.pepMatch || "No record"}</TableCell>
                          <TableCell>
                            {(selectedObj &&
                              selectedObj.reviewer +
                                "" +
                                formatDate(selectedObj.last_edit_date)) ||
                              "Not yet reviewed"}
                          </TableCell>

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
                      );
                    }
                  })}
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
                  this.state.users.map((user) => {
                    const historyKeys = Object.keys(user.history);
                    const targetHistoryKeysIndex = historyKeys.length - 1;
                    const keyIndex = historyKeys[targetHistoryKeysIndex];
                    const selectedObj = user.history[keyIndex] || "";

                    return (
                      <TableRow key={user.id} className="table-row">
                        <TableCell>
                          {user.first_name +
                            " " +
                            user.middle_name +
                            " " +
                            user.last_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {(selectedObj &&
                            selectedObj.reviewer +
                              " " +
                              formatDate(selectedObj.last_edit_date)) ||
                            "Not yet reviewed"}
                        </TableCell>

                        <TableCell>Level {user.currentLevel}</TableCell>
                        <TableCell>
                          {(selectedObj && selectedObj.status) ||
                            user.currentStatus}
                        </TableCell>
                        <TableCell>
                          {(selectedObj && selectedObj.remarks) ||
                            "No feedback"}
                        </TableCell>
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
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default Kyc;
