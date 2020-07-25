import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const ConfirmationModal = (props) => {
  return (
    <div className="modal-wrapper">
      <Dialog
        className="modal-container"
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.heading}</DialogTitle>
        <DialogContent className="modal-content">
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{props.children}</DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
