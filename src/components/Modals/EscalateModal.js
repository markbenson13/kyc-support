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
import SuccessModal from "./SuccessModal";
import firebase from "firebase";

class EscalateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      feedback: "",
      email: "",
      confirmationModal: false,
      successModal: false,
      userId: [],
    };
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.escalateKyc = this.escalateKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    const userId = this.props.userId;

    this.setState({ userId: userId });

    admin.providerData.forEach((adminData) => {
      this.setState({ adminInfo: adminData });
    });
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
      successModal: false,
    });
  };

  handleFeedbackChange(e) {
    this.setState({ feedback: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  escalateKyc = () => {
    const userId = this.state.userId;

    var historyRef = firebase
      .database()
      .ref("/user_kyc/" + userId + "/history")
      .push();

    // var key = historyRef.key;

    var postHistory = {
      status: "Escalated",
      review_date: Date.now(),
      reviewer: this.state.adminInfo.email,
      remarks: this.state.feedback,
      last_edit_date: Date.now(),
    };
    historyRef.set(postHistory);

    // Close modal
    this.setState({
      isOpen: false,
      successModal: true,
    });
  };

  render() {
    return (
      <div className="modal-wrapper">
        <Button
          className="btn btn-primary"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Escalate
        </Button>

        {/* Decline Modal */}
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Escalate</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form noValidate autoComplete="off">
                <TextField
                  id="reason-field"
                  label="Reason"
                  fullWidth
                  value={this.feedback}
                  onChange={this.handleFeedbackChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Escalate to (email)"
                  type="email"
                  fullWidth
                  value={this.email}
                  onChange={this.handleEmailChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-primary"
              onClick={this.escalateKyc}
              color="primary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

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

export default EscalateModal;
