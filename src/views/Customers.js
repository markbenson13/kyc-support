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
import { Link } from "react-router-dom";
import { db } from "../config/FirebaseConfig";

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
    id: 1,
    name: "Rodrigo Roa Duterte",
    email: "roa@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
  {
    id: 2,
    name: "Harry Roque",
    email: "harry@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
  {
    id: 3,
    name: "Gloria Macapagal Arroyo",
    email: "garroyo@gmail.com",
    dateSubmitted: "06/25/2020",
    level: "Level 1",
    status: "Approved",
    feedback: "Your feedback here",
    action: "View",
  },
];

class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
          console.log("users", users);
        });

        console.log("usermap", userMap);

        const userList = Object.keys(userMap).map((userId) => {
          const {
            kycData: {
              data: newData,
              name_scan,
              status: current_status,
              history,
            },
            walletData,
          } = userMap[userId];

          console.log("usermap id", userMap[userId]);

          const data = newData.level_2 ? JSON.parse(newData.level_2) : {};
          const level3 = newData.level_3 ? JSON.parse(newData.level_3) : {};
          const level4 = newData.level_4 ? JSON.parse(newData.level_4) : {};
          const newscan = name_scan ? JSON.parse(name_scan) : {};
          const status = current_status ? JSON.parse(current_status) : {};
          const wallet = walletData.data ? JSON.parse(walletData.data) : {};
          const history_list = history;

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
            pepMatch: newscan.numberOfPepMatches || "",
            sanctionMatch: newscan.numberOfSipMatches || "",
            presentAddress: level3.present_address || {},
            permanentAddress: level3.permanent_address || {},
            documentPhotoUrl: level4.document_url || "",
            documentType: level4.type_of_document || "",
            occupation: level4.occupation || "",
            position: level4.position || "",
            industry: level4.industry || "",
            company: level4.company_name || "",
            history: (history_list && history_list) || {},
          };
        });

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
      var options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(string).toLocaleDateString([], options);
    }

    const { users } = this.state;

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
                <TableRow className="table-head">
                  {customersColumn.map(({ id, title }) => (
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

                    return (
                      <TableRow key={key} className="table-row">
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
                        <TableCell>{selectedObj.remarks}</TableCell>
                        <TableCell>{selectedObj.remarks}</TableCell>
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
      </div>
    );
  }
}

export default Customers;
