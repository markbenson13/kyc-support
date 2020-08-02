import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import firebase from "firebase";

class DeclineModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      feedback: "",
      confirmationModal: false,
      successModal: false,
      userData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.denyKyc = this.denyKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    const userData = {
      id: this.props.userData.id,
      current_level: this.props.userData.currentLevel,
      status: this.props.userData.currentStatus,
    };

    this.setState({ userData: userData });

    // Get admin user info
    admin.providerData.forEach((adminData) => {
      this.setState({ adminInfo: adminData });
    });
  }

  // Open Modal
  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  // Close modals
  handleClose = () => {
    this.setState({
      isOpen: false,
      successModal: false,
      confirmationModal: false,
    });
  };

  // Get feedback value
  handleChange(e) {
    this.setState({ feedback: e.target.value });
  }

  // Close modal, open confirmation
  confirmation = () => {
    this.setState({ isOpen: false, confirmationModal: true });
  };

  // Deny KYC
  denyKyc = () => {
    const userId = this.state.userData.id;
    const userLevel = this.state.userData.current_level;
    const adminEmail = this.state.adminInfo.email;

    const time = new Date().getTime();
    const date = new Date(time);

    var historyRef = firebase
      .database()
      .ref("/user_kyc/" + userId + "/history")
      .push();
    // var key = historyRef.key;

    var postHistory = {
      id: userId,
      status: "Denied",
      review_date: date.getTime(),
      reviewer: adminEmail,
      remarks: this.state.feedback,
      last_edit_date: date.getTime(),
      level: userLevel,
    };
    historyRef.set(postHistory);

    // Close modals
    this.setState({
      isOpen: false,
      confirmationModal: false,
      successModal: true,
    });
  };

  render() {
    console.log(this.state.userId);
    return (
      <div className="modal-wrapper">
        <Button
          className="btn btn-primary"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Deny
        </Button>

        {/* Decline Modal */}
        <Dialog
          className="modal-container"
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deny</DialogTitle>
          <DialogContent className="modal-content">
            <DialogContentText id="alert-dialog-description">
              <form noValidate autoComplete="off">
                <TextField
                  className="input-field"
                  id="reason-field"
                  label="Reason"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.feedback}
                  onChange={this.handleChange}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={this.confirmation}
              color="primary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Modal */}
        <ConfirmationModal
          heading="Confirmation"
          description="Are you sure you want to deny this KYC?"
          open={this.state.confirmationModal}
          close={this.handleClose}
        >
          <Button
            className="btn btn-secondary"
            color="secondary"
            variant="outlined"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            onClick={this.denyKyc}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes, Deny KYC
          </Button>
        </ConfirmationModal>

        {/* Success Modal */}
        <SuccessModal
          heading="Congratulations!"
          description="Your submission is successful."
          open={this.state.successModal}
          close={this.handleClose}
        />
      </div>
    );
  }
}

export default DeclineModal;
