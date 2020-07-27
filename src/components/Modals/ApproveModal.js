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
      userData: [],
    };

    this.approveKyc = this.approveKyc.bind(this);
  }

  componentDidMount() {
    const admin = firebase.auth().currentUser;
    // const userId = this.props.userData;

    const userData = {
      id: this.props.userData.id,
      current_level: this.props.userData.currentLevel,
      status: this.props.userData.currentStatus,
    };

    console.log("user data", userData);

    // this.setState({ userId: userId });
    this.setState({ userData: userData });

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
    const userId = this.state.userData.id;
    const userLevel = this.state.userData.current_level;
    const adminEmail = this.state.adminInfo.email;
    console.log("userLevel", this.state.userData);

    const time = new Date().getTime();
    const date = new Date(time);

    var historyRef = firebase
      .database()
      .ref("/user_kyc/" + userId + "/history")
      .push();

    var statusRef = firebase.database().ref("/user_kyc/" + userId + "/status");

    var postHistory = {
      id: userId,
      status: "Approved",
      review_date: date.getTime(),
      reviewer: adminEmail,
      remarks: "Approved",
      last_edit_date: date.getTime(),
      level: userLevel,
    };

    let current_level = "";
    let current_status = "";
    if (userLevel == 2) {
      current_level = 3;
      current_status = "completed";
    } else {
      current_level = 4;
      current_status = "completed";
    }

    var updateStatus = {
      current_level: current_level,
      level_1: [
        { label: "Phone Verification", level: "1_1", status: "completed" },
        { label: "Email Verification", level: "1_2", status: "completed" },
      ],
      level_2: [
        {
          label: "Identity Verification",
          level: "2_1",
          status: current_status,
        },
        { label: "Selfie Verification", level: "2_2", status: current_status },
      ],
      level_3: [
        { label: "Address Verification", level: "3", status: current_status },
      ],
      level_4: [
        { label: "Proof of Income", level: "4", status: current_status },
      ],
    };

    console.log("updated status", updateStatus);

    historyRef.set(postHistory);
    statusRef.set(JSON.stringify(updateStatus));

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
          className="modal-container"
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
          className="modal-container"
        />
      </div>
    );
  }
}

export default ApproveModal;
