import React, {useState} from 'react';
import Datetime from "react-datetime";
import moment from "moment";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { updateEvent } from "./eventUtil.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function EditModal(props) {
  //Props: 
  //open : boolean
  //closeModal : function
  //eventId : string
  //eventInfo : Object
  const classes = useStyles();
  const [ eventInfo, setEventInfo ] = useState({
    edit_event_name: props.eventInfo.event_name,
    edit_location: props.eventInfo.location,
    edit_message: props.eventInfo.message,
    edit_start_time: Date(props.eventInfo.start_time * 1000),
  });
  const [ errors, setErrors ] = useState({
    edit_event_name: " - Invalid",
    edit_location: " - Invalid",
    edit_start_time: " - Please select a time",
    edit_message: " - Invalid",
  });
  const [ isValid, setIsValid ] = useState({
    edit_event_name: true,
    edit_location: true,
    edit_start_time: true,
    edit_message: true,
  });

  const handleInput = (event) => {
    let id = event.target.id.toString();
    if (event.target.value === '') {
      setIsValid({
        ...isValid,
        [id]: false,
      });
    } else if (!isValid[id]) {
      setIsValid({
        ...isValid,
        [id]: true,
      });
    }
    setEventInfo({
        ...eventInfo,
        [id]: event.target.value,
    });
    // eventInfo[id] = event.target.value;
  };

  const handleTimeInput = (event) => {
    eventInfo.start_time = event.toDate();
    if (!isValid["start_time"]) {
      setIsValid({
        ...isValid,
        start_time: true,
      });
    }
  }

  const handleSubmit = () => {
    var isReady = true;
    var validate = {};

    for (var key in isValid) {
      if (!isValid[key]) {
        isReady = false;
      } else if (!eventInfo[key]) {
        isReady = false;
        validate = {
          ...validate,
          [key]: false,
        };
      } 
    }

    if (!isReady) {
      setIsValid({
        ...isValid,
        ...validate,
      });
    } else {
       updateEvent(props.eventId, {
            event_name: eventInfo.edit_event_name,
            location: eventInfo.edit_location,
            start_time: eventInfo.edit_start_time,
            message: eventInfo.edit_message,
       });
       props.closeModal(true);
    }
  }
  
  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.editModal
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
          <h4 className={classes.modalTitle}>Update Event Detail</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >

            <CustomInput
                id="edit_event_name"
                error={!isValid['edit_event_name']}
                labelText={"Event Name".concat(isValid['edit_event_name'] ? '' : errors.edit_event_name)}
                formControlProps={{
                    fullWidth: true,
                    required: true
                }}
                inputProps={{
                    value: eventInfo.edit_event_name,
                    onChange: handleInput,
                }}
            />
            <CustomInput
              id="edit_location"
              error={!isValid['edit_location']}
              labelText={"Location".concat(isValid['edit_location'] ? '' : errors.edit_location)}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
              inputProps={{
                value: eventInfo.edit_location,
                onChange: handleInput,
              }}
            />
            <InputLabel 
              className={classes.label} 
              error={!isValid['edit_start_time']}
            >
              {isValid['edit_start_time'] ? 'Start Time' : errors.start_time}
            </InputLabel>
            <FormControl fullWidth>
              <Datetime
                defaultValue={moment(eventInfo.edit_start_time)}
                onChange={handleTimeInput}
                inputProps={{ placeholder: "Start Time", readOnly:true}}
                isValidDate={(selectedDate, currentDate) => {return selectedDate.isAfter( Datetime.moment().add( 1, 'day' ) )}}
              />
            </FormControl>
            <CustomInput
                id="edit_message"
                error={!isValid['edit_message']}
                labelText={"Event Description".concat(isValid['edit_message'] ? '' : errors.edit_message)}
                inputProps={{
                    value: eventInfo.edit_message,
                    onChange: handleInput,
                    multiline: true,
                    rows: "2"
                }}
                    formControlProps={{
                    fullWidth: true,
                    required: true
                }}
            />


        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={handleSubmit} color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}