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
      image: null,
      setImage: null,
      progress: 0,
      setProgress: 0,
      url: "",
      setUrl: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount = () => {
    const person = this.props.location.state.user;
    this.setState({ userDetails: person });

    // const ref = firebase.storage().ref(`${personId}`).child();
    // console.log("ref", ref);
    // ref
    //   .getDownloadURL()
    //   .then((url) => {
    //     console.log(url);
    //     this.setState({ storageUrl: url });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  handleChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (file) {
      this.setState({ setImage: file });
      console.log(this.setState({ setImage: file }));
    }
  };

  handleUpload = () => {
    // const person = this.props.location.state.user;
    // this.setState({ userDetails: person });
    // const personId = person.id;
    // const uploadImage = firebase
    //   .storage()
    //   .ref(`${personId}/${image.name}`)
    //   .put(image);
    // uploadImage.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     this.setState({setProgress: progress});
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     firebase
    //       .storage()
    //       .ref(personId)
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         setUrl(url);
    //       });
    //   }
    // );
  };

  render() {
    // console.log("setImage", this.state.setImage);
    const detail = this.state.userDetails;
    const image = this.state.image;

    // if (!image) {
    //   return false;
    //   console.log("image", image);
    // }

    // const storageURL = this.state.storageUrl;

    // console.log(storageURL);

    console.log(this.state.userDetails);

    if (!detail.data) return false;

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
                <Typography variant="body2">
                  {detail.data.first_name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Middle Name
                </Typography>
                <Typography variant="body2">
                  {detail.data.middle_name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Last Name
                </Typography>
                <Typography variant="body2">{detail.data.last_name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Gender
                </Typography>
                <Typography variant="body2">{detail.data.gender}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthday
                </Typography>
                <Typography variant="body2">{detail.data.birthdate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Birthplace
                </Typography>
                <Typography variant="body2">
                  {detail.data.birthplace}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Nationality
                </Typography>
                <Typography variant="body2">
                  {detail.data.nationality}
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
                  {detail.data.id_photo_type}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Expiration Date
                </Typography>
                <Typography variant="body2">
                  {detail.data.id_photo_exp_date}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Number
                </Typography>
                <Typography variant="body2">
                  {detail.data.id_photo_no}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  ID Image
                </Typography>
                {/* <img
                  src={storageURL + "/" + detail.data.id_photo_front_url}
                  alt=""
                /> */}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Selfie with ID
                </Typography>
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
                  {detail.level_3.present_address.street_address +
                    " " +
                    detail.level_3.present_address.address_info +
                    ", " +
                    detail.level_3.present_address.barangay +
                    ", " +
                    detail.level_3.present_address.city +
                    ", " +
                    detail.level_3.present_address.state +
                    " " +
                    detail.level_3.present_address.zip_code}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Permanent Address
                </Typography>
                <Typography variant="body2">
                  {detail.level_3.permanent_address.street_address +
                    " " +
                    detail.level_3.permanent_address.address_info +
                    ", " +
                    detail.level_3.permanent_address.barangay +
                    ", " +
                    detail.level_3.permanent_address.city +
                    ", " +
                    detail.level_3.permanent_address.state +
                    " " +
                    detail.level_3.permanent_address.zip_code}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Proof of Address
                </Typography>
                <Typography variant="body2">
                  Type of Document:{" "}
                  {detail.level_3.permanent_address.billing_statement}
                </Typography>
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
                  {/* {detail.level_4.employed} */}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Occupation
                </Typography>
                <Typography variant="body2">
                  {detail.level_4.employed.occupation}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className="detail-label">
                  Position
                </Typography>
                <Typography variant="body2">
                  {detail.level_4.employed.position}
                </Typography>
                <Typography variant="body1" className="detail-label">
                  Proof of Income
                </Typography>
                <Typography variant="body2">
                  Type of Document: {detail.level_4.document_type}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Company Name/Business Name
                </Typography>
                <Typography variant="body2">
                  {detail.level_4.employed.company}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Industry
                </Typography>
                <Typography variant="body2">
                  {detail.level_4.employed.industry}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className="detail-label">
                  Findings from PEP Scan
                </Typography>
                {/* <CircularProgress variant="static" value={progress} /> */}
                <input
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={() => this.handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleUpload}
                >
                  Upload file
                </Button>
                {/* <img src={url} alt="firebase image" /> */}
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
        </div>
      </>
    );
  }
}

export default KycDetails;
