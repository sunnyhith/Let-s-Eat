import React, { useState } from "react";
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// core components
import Button from "components/CustomButtons/Button.js";
//Styling
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const InstructionsModal = () => {
  const [modal, setModal] = useState(true);
  const classes = useStyles();
  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          {/* <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton> */}
          <h3 className={classes.modalTitle}>Welcome to Let's Eat!</h3>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <h4 className={classes.modalTitle}>
            Please read through the following instructions carefully
          </h4>
          <h5>Add directions/instructions here</h5>
          <h5>Add directions/instructions here</h5>
          <h5>Add directions/instructions here</h5>
          <h5>Add directions/instructions here</h5>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => setModal(false)} round color="info">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InstructionsModal;
