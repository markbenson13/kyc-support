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
      userData: [],
    };
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.escalateKyc = this.escalateKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    const userData = {
      id: this.props.userData.id,
      current_level: this.props.userData.currentLevel,
      status: this.props.userData.currentStatus,
    };

    this.setState({ userData: userData });

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
      status: "Escalated",
      review_date: date.getTime(),
      reviewer: adminEmail,
      remarks: this.state.feedback,
      last_edit_date: date.getTime(),
      level: userLevel,
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
          className="modal-container"
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Escalate</DialogTitle>
          <DialogContent className="modal-content">
            <DialogContentText id="alert-dialog-description">
              <form noValidate autoComplete="off">
                <TextField
                  className="input-field"
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
                  className="input-field"
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
