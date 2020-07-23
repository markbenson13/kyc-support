import React from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import SuccessModal from "./SuccessModal";
import ConfirmationModal from "./ConfirmationModal";

class ApproveModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      successModal: false,
      close: false,
      adminInfo: [],
      userId: [],
    };

    this.approveKyc = this.approveKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    const userId = this.props.userId;
    this.setState({ userId: userId });

    admin.providerData.forEach((adminData) => {
      this.setState({ adminInfo: adminData });
    });
  }

  // Open modal
  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  // Close modal
  handleClose = () => {
    this.setState({ isOpen: false, successModal: false });
  };

  // Approve KYC
  approveKyc = () => {
    const userId = this.state.userId;
    console.log("userId", userId);

    const time = new Date().getTime();
    const date = new Date(time);

    var historyRef = firebase
      .database()
      .ref("/user_kyc/" + userId + "/history")
      .push();

    var postHistory = {
      id: userId,
      status: "Approved",
      review_date: date.getTime(),
      reviewer: this.state.adminInfo.email,
      remarks: "Approved",
      last_edit_date: date.getTime(),
    };
    historyRef.set(postHistory);

    // Close current modal, and open success modal
    this.setState({ isOpen: false, successModal: true });
  };

  render() {
    return (
      <div className="modal-wrapper">
        {/* Approve Modal */}
        <Button
          className="btn btn-primary"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Approve
        </Button>

        {/* Confirmation Modal */}
        <ConfirmationModal
          heading="Confirmation"
          description="Are you sure you want to approve this KYC?"
          open={this.state.isOpen}
          close={this.handleClose}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            onClick={this.approveKyc}
            variant="contained"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </ConfirmationModal>

        {/* Success Modal */}
        <SuccessModal
          heading="Congratulations!"
          description="KYC is Approved."
          open={this.state.successModal}
          close={this.handleClose}
        />
      </div>
    );
  }
}

export default ApproveModal;
