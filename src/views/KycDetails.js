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
import Paper from "@material-ui/core/Paper";
import TableFilter from "../components/TableFilter";
import { Typography } from "@material-ui/core";
import ApproveModal from "../components/Modals/ApproveModal";
import DeclineModal from "../components/Modals/DeclineModal";
import EscalateModal from "../components/Modals/EscalateModal";
import SuccessModal from "../components/Modals/SuccessModal";
import {
  Link,
  Grid,
  CircularProgress,
  Button,
  TextField,
} from "@material-ui/core";
import { db } from "../config/FirebaseConfig";
import firebase from "firebase";

const historyColumn = [
  { id: "name", title: "Level" },
  { id: "submissionDate", title: "Submission Date" },
  { id: "reviewDate", title: "Review Date" },
  { id: "status", title: "Status" },
  { id: "reviewer", title: "Reviewer" },
  { id: "remarks", title: "Remarks" },
  { id: "lastEditBy", title: "Last edit by" },
];

const historyData = [
  {
    level: "1",
    submissionDate: "02/18/2020",
    reviewDate: "02/18/20202",
    status: "Under Review",
    reviewer: "Winnie Balagso",
    remarks: "Reason here",
    lastEditBy: "02/18/2020",
  },
];

class KycDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      history: [],
    };
  }

  componentWillMount = () => {
    const person = this.props.location.state.user;
    const history = person.history;
    this.setState({ userDetails: person });

    console.log("person", person);
    // if (!detail.permanentAddress && !detail.presentAddress) return false;

    const historyList = Object.keys(history, person).map((historyId) => {
      const historyData = history[historyId];
      const personInfo = person;

      console.log("history-data", historyData);
      console.log("person-data", personInfo);

      return {
        last_edit_date: historyData.last_edit_date || "",
        remarks: historyData.remarks || "",
        review_date: historyData.review_date || "",
        reviewer: historyData.reviewer || "",
        status: historyData.status || "",
        level: personInfo.level || "",
        dateSubmitted: personInfo.dateSubmitted || "",
      };
    });

    this.setState({ history: historyList });
  };

  render() {
    const { userDetails, history } = this.state;
    // console.log("userDetails", userDetails);
    console.log("hist state", history);
    function formatDate(string) {
      var options = { month: "numeric", day: "numeric", year: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    }

    return (
      <>
        <Sidebar />
        <Header />
        <div className="content-wrapper">
          <h2>KYC Detail</h2>
          <Paper elevation="3" className="details-container">
            <Grid container spacing={2} m={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Mobile Number
                </Typography>
                <Typography variant="body2">{userDetails.mobileNo}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Email
                </Typography>
                <Typography variant="body2">{userDetails.email}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" className="detail-heading">
                  Identity Verification
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  First Name
                </Typography>
                <Typography variant="body2">
                  {userDetails.first_name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Middle Name
                </Typography>
                <Typography variant="body2">
                  {userDetails.middle_name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Last Name
                </Typography>
                <Typography variant="body2">{userDetails.last_name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Gender
                </Typography>
                <Typography variant="body2">{userDetails.gender}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthday
                </Typography>
                <Typography variant="body2">
                  {formatDate(userDetails.birthdate)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthplace
                </Typography>
                <Typography variant="body2">
                  {userDetails.birthplace}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Nationality
                </Typography>
                <Typography variant="body2">
                  {userDetails.nationality}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation="3" className="details-container">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" className="detail-heading">
                  ID and Selfie Document
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Government Issued ID
                </Typography>
                <Typography variant="body2">
                  {userDetails.idPhotoType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Expiration Date
                </Typography>
                <Typography variant="body2">
                  {formatDate(userDetails.idPhotoExpiration)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Number
                </Typography>
                <Typography variant="body2">{userDetails.idPhotoNo}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Image
                </Typography>
                <img
                  className="image-photo"
                  src={userDetails.idPhotoFrontUrl}
                  alt="Issued ID"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Selfie with ID
                </Typography>
                <img
                  className="image-photo"
                  src={userDetails.selfieUrl}
                  alt="Selfie with ID"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation="3" className="details-container">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" className="detail-heading">
                  Address Verification
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Current Address
                </Typography>
                <Typography variant="body2">
                  {(userDetails.presentAddress.street_address &&
                    userDetails.presentAddress.street_address +
                      " " +
                      userDetails.presentAddress.address_info +
                      ", " +
                      userDetails.presentAddress.barangay +
                      ", " +
                      userDetails.presentAddress.city +
                      ", " +
                      userDetails.presentAddress.state +
                      " " +
                      userDetails.presentAddress.zip_code) ||
                    ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Permanent Address
                </Typography>
                <Typography variant="body2">
                  {(userDetails.permanentAddress.street_address &&
                    userDetails.permanentAddress.street_address +
                      " " +
                      userDetails.permanentAddress.address_info +
                      ", " +
                      userDetails.permanentAddress.barangay +
                      ", " +
                      userDetails.permanentAddress.city +
                      ", " +
                      userDetails.permanentAddress.state +
                      " " +
                      userDetails.permanentAddress.zip_code) ||
                    ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Proof of Address
                </Typography>
                <Typography variant="body2">
                  Type of Document:{" "}
                  {userDetails.permanentAddress.billing_statement}
                </Typography>
                <img
                  className="image-photo"
                  src={userDetails.permanentAddress.billing_statement_photo_url}
                  alt="Billing statement"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation="3" className="details-container">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" className="detail-heading">
                  Source of Funds
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Employment Category
                </Typography>
                <Typography variant="body2">
                  {userDetails.employmentCategory}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Occupation
                </Typography>
                <Typography variant="body2">
                  {/* {userDetails.occupationDetails.occupation} */}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Position
                </Typography>
                <Typography variant="body2">
                  {/* {userDetails.occupationDetails.position} */}
                </Typography>
                <Typography variant="body1" className="detail-label">
                  Proof of Income
                </Typography>
                <Typography variant="body2">
                  Type of Document: {userDetails.documentType}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Company Name/Business Name
                </Typography>
                <Typography variant="body2">
                  {/* {userDetails.occupationDetails.company} */}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Industry
                </Typography>
                <Typography variant="body2">
                  {/* {userDetails.occupationDetails.industry} */}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Findings from PEP Scan
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <TableContainer
            component={Paper}
            id="table-wrapper"
            className="details-container table-wrapper history-table"
          >
            <div className="table-header">
              <Typography variant="h2" className="detail-heading">
                KYC History
              </Typography>
            </div>
            <Table className="table" aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {historyColumn.map(({ id, title }) => (
                    <TableCell key={id}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((historyList) => (
                  <TableRow className="table-row">
                    <TableCell>{historyList.level}</TableCell>
                    <TableCell>
                      {formatDate(historyList.dateSubmitted)}
                    </TableCell>
                    <TableCell>{formatDate(historyList.review_date)}</TableCell>
                    <TableCell>{historyList.status}</TableCell>
                    <TableCell>{historyList.reviewer}</TableCell>
                    <TableCell>{historyList.remarks}</TableCell>
                    <TableCell>
                      {formatDate(historyList.last_edit_date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            container
            className="button-actions"
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={3}>
              <ApproveModal userId={userDetails.id} />
              <DeclineModal userId={userDetails.id} />
              <EscalateModal userId={userDetails.id} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default KycDetails;
