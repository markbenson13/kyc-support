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
      storageUrl: [],
      mounted: true,
      image: "",
      url: "",
    };
  }

  componentWillMount = () => {
    const person = this.props.location.state.user;
    this.setState({ userDetails: person });
    console.log("person", person);
  };

  render() {
    const detail = this.state.userDetails;
    console.log("detail", detail);
    console.log("address", detail.presentAddress);
    // if (!detail.permanentAddress && !detail.presentAddress) return false;

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
                <Typography variant="body2">{detail.mobileNo}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Email
                </Typography>
                <Typography variant="body2">{detail.email}</Typography>
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
                <Typography variant="body2">{detail.first_name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Middle Name
                </Typography>
                <Typography variant="body2">{detail.middle_name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Last Name
                </Typography>
                <Typography variant="body2">{detail.last_name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Gender
                </Typography>
                <Typography variant="body2">{detail.gender}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthday
                </Typography>
                <Typography variant="body2">{detail.birthdate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthplace
                </Typography>
                <Typography variant="body2">{detail.birthplace}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Nationality
                </Typography>
                <Typography variant="body2">{detail.nationality}</Typography>
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
                <Typography variant="body2">{detail.idPhotoType}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Expiration Date
                </Typography>
                <Typography variant="body2">
                  {detail.idPhotoExpiration}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Number
                </Typography>
                <Typography variant="body2">{detail.idPhotoNo}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Image
                </Typography>
                <img
                  className="image-photo"
                  src={detail.idPhotoFrontUrl}
                  alt="Issued ID"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Selfie with ID
                </Typography>
                <img
                  className="image-photo"
                  src={detail.selfieUrl}
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
                  {(detail.presentAddress.street_address &&
                    detail.presentAddress.street_address +
                      " " +
                      detail.presentAddress.address_info +
                      ", " +
                      detail.presentAddress.barangay +
                      ", " +
                      detail.presentAddress.city +
                      ", " +
                      detail.presentAddress.state +
                      " " +
                      detail.presentAddress.zip_code) ||
                    ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Permanent Address
                </Typography>
                <Typography variant="body2">
                  {(detail.permanentAddress.street_address &&
                    detail.permanentAddress.street_address +
                      " " +
                      detail.permanentAddress.address_info +
                      ", " +
                      detail.permanentAddress.barangay +
                      ", " +
                      detail.permanentAddress.city +
                      ", " +
                      detail.permanentAddress.state +
                      " " +
                      detail.permanentAddress.zip_code) ||
                    ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Proof of Address
                </Typography>
                <Typography variant="body2">
                  Type of Document: {detail.permanentAddress.billing_statement}
                </Typography>
                <img
                  className="image-photo"
                  src={detail.permanentAddress.billing_statement_photo_url}
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
                  {detail.employmentCategory}
                  {/* occupation: (level4.employed && level4.employed.occupation) || {},
                  position: (level4.employed && level4.employed.position) || {},
                  industry: (level4.employed && level4.employed.industry) || {},
                  company: (level4.employed && level4.employed.company) || {}, */}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Occupation
                </Typography>
                <Typography variant="body2">
                  {detail.occupationDetails.occupation}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Position
                </Typography>
                <Typography variant="body2">
                  {detail.occupationDetails.position}
                </Typography>
                <Typography variant="body1" className="detail-label">
                  Proof of Income
                </Typography>
                <Typography variant="body2">
                  Type of Document: {detail.documentType}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Company Name/Business Name
                </Typography>
                <Typography variant="body2">
                  {detail.occupationDetails.company}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Industry
                </Typography>
                <Typography variant="body2">
                  {detail.occupationDetails.industry}
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
            className="table-wrapper history-table"
          >
            <div className="table-header">
              <Typography variant="h3">KYC History</Typography>
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
                {historyData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {data.level}
                    </TableCell>
                    <TableCell align="left">{data.submissionDate}</TableCell>
                    <TableCell align="left">{data.reviewDate}</TableCell>
                    <TableCell align="left">{data.status}</TableCell>
                    <TableCell align="left">{data.reviewer}</TableCell>
                    <TableCell align="left">{data.remarks}</TableCell>
                    <TableCell align="left">{data.lastEditBy}</TableCell>
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
            <Grid item xs={1}>
              <ApproveModal userInfo={detail.id} />
            </Grid>
            <Grid item xs={1}>
              <DeclineModal userInfo={detail.id} />
            </Grid>
            <Grid item xs={1}>
              <EscalateModal userInfo={detail.id} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default KycDetails;
