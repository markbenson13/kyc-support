import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import SuccessIcon from "../../assets/images/icons/success.png";

const SuccessModal = (props) => {
  return (
    <div className="modal-wrapper">
      <Dialog
        className="modal-container"
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img src={SuccessIcon} alt="Success icon" />
          {props.heading}
        </DialogTitle>
        <DialogContent className="modal-content">
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn btn-primary"
            onClick={props.close}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SuccessModal;
