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
import { Grid } from "@material-ui/core";

const historyColumn = [
  { id: "name", title: "Level" },
  { id: "submissionDate", title: "Submission Date" },
  { id: "reviewDate", title: "Review Date" },
  { id: "status", title: "Status" },
  { id: "reviewer", title: "Reviewer" },
  { id: "remarks", title: "Remarks" },
  { id: "lastEditBy", title: "Last edit by" },
];

class KycDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: this.props.location.state.user,
      history: this.props.location.state.user.history,
    };
  }

  componentWillMount = () => {
    const person = this.state.userDetails;
    console.log("person", person);
    const history = person.history;

    const historyList = Object.keys(history, person).map((historyId) => {
      const historyData = history[historyId];
      const personInfo = person;
      return {
        id: historyData.id || "",
        last_edit_date: historyData.last_edit_date || "",
        remarks: historyData.remarks || "",
        review_date: historyData.review_date || "",
        reviewer: historyData.reviewer || "",
        status: historyData.status || personInfo.currentStatus,
        level: historyData.level || personInfo.currentLevel,
        dateSubmitted: personInfo.dateSubmitted || "",
      };
    });
    this.setState({ history: historyList });
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { userDetails, history } = this.state;

    function formatDate(string) {
      var options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      };
      return new Date(string).toLocaleDateString([], options);
    }

    function formatDateTime(string) {
      var options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(string).toLocaleDateString([], options);
    }

    let gender = "";
    if (userDetails.gender === "m") {
      gender = "Male";
    } else {
      gender = "Female";
    }

    const present_address =
      [
        userDetails.presentAddress.address_1,
        userDetails.presentAddress.address_2,
        userDetails.presentAddress.barangay,
        userDetails.presentAddress.city,
        userDetails.presentAddress.country,
        userDetails.presentAddress.state,
        userDetails.presentAddress.zip_code,
      ].join(" ") || " ";

    const permanent_address =
      [
        userDetails.permanentAddress.address_1,
        userDetails.permanentAddress.address_2,
        userDetails.permanentAddress.barangay,
        userDetails.permanentAddress.city,
        userDetails.permanentAddress.country,
        userDetails.permanentAddress.state,
        userDetails.permanentAddress.zip_code,
      ].join(" ") || " ";

    return (
      <>
        <Sidebar />
        <Header />
        <div className="content-wrapper">
          <h2>KYC Detail</h2>
          <Paper elevation={3} className="details-container">
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
                <Typography variant="body2">{gender}</Typography>
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

          <Paper elevation={3} className="details-container">
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

          <Paper elevation={3} className="details-container">
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
                <Typography variant="body2">{present_address}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Permanent Address
                </Typography>
                <Typography variant="body2">{permanent_address}</Typography>
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

          <Paper elevation={3} className="details-container">
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
                <Typography variant="body2" className="is-capitalized">
                  {userDetails.employmentType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Occupation
                </Typography>
                <Typography variant="body2">
                  {userDetails.occupation}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Position
                </Typography>
                <Typography variant="body2">{userDetails.position}</Typography>
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
                <Typography variant="body2">{userDetails.company}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Industry
                </Typography>
                <Typography variant="body2">{userDetails.industry}</Typography>
              </Grid>
              {/* <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Findings from PEP Scan
                </Typography>
              </Grid> */}
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
                {Object.keys(history).map((historyList) => (
                  <TableRow key={history[historyList].id} className="table-row">
                    <TableCell>{history[historyList].level}</TableCell>
                    <TableCell>
                      {formatDateTime(history[historyList].dateSubmitted)}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(history[historyList].review_date)}
                    </TableCell>
                    <TableCell>{history[historyList].status}</TableCell>
                    <TableCell>{history[historyList].reviewer}</TableCell>
                    <TableCell>{history[historyList].remarks}</TableCell>
                    <TableCell>
                      {formatDateTime(history[historyList].last_edit_date)}
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
              <ApproveModal userData={userDetails} />
              <DeclineModal userData={userDetails} />
              <EscalateModal userData={userDetails} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default KycDetails;
