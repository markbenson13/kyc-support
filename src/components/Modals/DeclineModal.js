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
    };
    this.handleChange = this.handleChange.bind(this);
    this.denyKyc = this.denyKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    const person = this.props.userInfo;

    this.setState({ userDetails: person });

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
    const userId = this.state.userDetails;

    var historyRef = firebase
      .database()
      .ref("/user_kyc/" + userId + "/history")
      .push();
    // var key = historyRef.key;

    var postHistory = {
      status: "Denied",
      review_date: Date.now(),
      reviewer: this.state.adminInfo.email,
      remarks: this.state.feedback,
      last_edit_date: Date.now(),
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
    return (
      <div className="modal-wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Deny
        </Button>

        {/* Decline Modal */}
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deny</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form noValidate autoComplete="off">
                <TextField
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
            <Button onClick={this.confirmation} color="primary" autoFocus>
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
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button onClick={this.denyKyc} color="primary" autoFocus>
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
