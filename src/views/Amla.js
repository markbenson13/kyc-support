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
import { Link } from "react-router-dom";
import { db } from "../config/FirebaseConfig";

const amlaColumn = [
  { id: "id", title: "RM Number" },
  { id: "name", title: "Name" },
  { id: "lastUpdateby", title: "Last Update By" },
  { id: "lastOpenedby", title: "Last Opened By" },
  { id: "action", title: "Action" },
];

class Amla extends React.Component {
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
    const politicalUsers = db.ref("user_kyc");
    const userWallet = db.ref("user_wallet");

    Promise.all([politicalUsers.once("value"), userWallet.once("value")]).then(
      (response) => {
        const politicalPerson = response[0].val();
        const userWallet = response[1].val();
        const userIds = Object.keys(politicalPerson);

        const userMap = userIds.reduce((map, userId) => {
          if (politicalPerson[userId].hasOwnProperty("data")) {
            map[userId] = {
              kycData: politicalPerson[userId],
              walletData: null,
            };
            if (userWallet[userId]) {
              map[userId].walletData = userWallet[userId];
            }
          }

          return map;
        }, {});

        Object.keys(userMap).map((users) => {
          console.log("users", users);
        });

        const userList = Object.keys(userMap).map((userId) => {
          const {
            kycData: { data: newData, name_scan, status: newStatus, history },
            walletData,
          } = userMap[userId];

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
            pepMatch: newscan.numberOfPepMatches,
            presentAddress: level3.present_address || {},
            permanentAddress: level3.permanent_address || {},
            documentPhotoUrl: level4.document_photo_url || "",
            documentType: level4.document_type || "",
            // occupationDetails:
            //   (!!Object.keys(newEmployed).length && newEmployed) ||
            //   (!!Object.keys(newSelfEmployed).length && newSelfEmployed) ||
            //   {},
            // employmentCategory:
            //   (!!Object.keys(newEmployed).length && "Employed") ||
            //   (!!Object.keys(newSelfEmployed).length && "Self Employed") ||
            //   "",
            history: history_list || {},
          };
        });
        this.setState({ users: userList });
      }
    );
  }

  render() {
    const { users } = this.state;

    function formatDate(string) {
      var options = { month: "numeric", day: "numeric", year: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    }

    function counter() {
      for (let i = 1; i > 1; i++) {
        return i;
      }
    }

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
                <TableRow className="table-head">
                  {amlaColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user, key) => {
                    const historyKeys = Object.keys(user.history);
                    const targetHistoryKeysIndex = historyKeys.length - 1;
                    const keyIndex = historyKeys[targetHistoryKeysIndex];
                    const selectedObj = user.history[keyIndex] || "";
                    const full_name =
                      user.first_name +
                      " " +
                      user.middle_name +
                      " " +
                      user.last_name;

                    if (user.pepMatch > 0) {
                      return (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row">
                            {counter()}
                          </TableCell>
                          <TableCell align="left">{full_name}</TableCell>
                          <TableCell align="left">
                            {selectedObj &&
                              selectedObj.reviewer +
                                " " +
                                formatDate(selectedObj.last_edit_date)}
                          </TableCell>
                          <TableCell align="left">
                            {selectedObj &&
                              selectedObj.reviewer +
                                " " +
                                formatDate(selectedObj.last_edit_date)}
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
        </div>
      </div>
    );
  }
}

export default Amla;
