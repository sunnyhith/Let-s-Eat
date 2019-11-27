import React, {useState} from 'react';
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import EmailList from "components/events/emailList";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {validateEmail} from "util/validator.js";
import {inviteGuests} from "./eventUtil.js";
// import modalStyle from "assets/jss/layout/modalStyle.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function InvitationModal(props) {
  //Props: 
  //open : boolean
  //closeModal : function
  //eventId : string
  const [ errors, setErrors ] = useState(false);
  const [ emails, setEmails] = useState([]);

  const classes = useStyles();

  const handleEmailInput = (event) => {
    let newEmail = event.target.value.replace(/\s+/g, '');
    if (event.key === ' ' || event.key === 'Enter') {     
      if (!validateEmail(newEmail)) {
        setErrors(true);
      } else {
        setEmails(emails.concat(newEmail));
        setErrors(false);
      }
      event.target.value = "";
      if(event.preventDefault) event.preventDefault(); 
    }    
  }

  const handleSubmit = () => {
    var input = document.getElementById("email_input").value;
    console.log(input);
    var newGuests = emails;
    if (input && validateEmail(input)){
      newGuests = newGuests.concat(input);
    }
    console.log(newGuests);
    if (newGuests === undefined || newGuests.length === 0) {
      props.closeModal(false);
    } else {
      inviteGuests(props.eventId, newGuests);
      props.closeModal(true);
    }
  }
  
  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.invitationModal
        }}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.closeModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => props.closeModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Invite More Friends</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
              <CustomInput
                id="email_input"
                error={errors}
                labelText={("Input Email to Invite Friends!").concat(errors ? ' - Invalid' : '')}
                inputProps={{
                  type: "email",
                  onKeyDown: handleEmailInput
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
              
              <EmailList
                emails={emails}
                setEmails={setEmails}
              />



        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={handleSubmit} color="success">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}