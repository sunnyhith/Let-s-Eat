import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { createEvent } from "components/events/eventUtil.js";
import Datetime from "react-datetime";
import { validateEmail } from "util/validator.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// core components
import EmailList from "components/events/emailList";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const CreateEvent = () => {
  const classes = usestyles();
  const { currentUser, preference, loading } = useContext(AuthContext);

  const [eventInfo, setEventInfo] = useState({
    event_name: "",
    location: "",
    message: "",
    start_time: null
  });
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({
    event_name: " - Invalid",
    location: " - Invalid",
    start_time: " - Please select a time",
    message: " - Invalid"
  });
  const [isValid, setIsValid] = useState({
    event_name: true,
    location: true,
    start_time: true,
    message: true
  });
  const [eventResult, setEventResult] = useState(null);

  const handleInput = event => {
    let id = event.target.id.toString();
    if (event.target.value === "") {
      setIsValid({
        ...isValid,
        [id]: false
      });
    } else if (!isValid[id]) {
      setIsValid({
        ...isValid,
        [id]: true
      });
    }
    eventInfo[id] = event.target.value;
  };

  const handleEmailInput = event => {
    let newEmail = event.target.value.replace(/\s+/g, "");
    if (event.key === " " || event.key === "Enter") {
      if (!validateEmail(newEmail)) {
        setErrors({
          ...errors,
          email_input: "  - Input valid email address"
        });
      } else {
        setEmails(emails.concat(newEmail));
        delete errors.email_input;
      }
      event.target.value = "";
      if (event.preventDefault) event.preventDefault();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    var isReady = true;
    var validate = {};

    for (var key in isValid) {
      if (!isValid[key]) {
        isReady = false;
      } else if (!eventInfo[key]) {
        isReady = false;
        validate = {
          ...validate,
          [key]: false
        };
      }
    }

    if (!isReady) {
      setIsValid({
        ...isValid,
        ...validate
      });
    } else {
      console.log("ready to submit");
      console.log(eventInfo);
      console.log(emails);
      //send message,
      var eventId = await createEvent({
        ...eventInfo,
        guests: emails
      });
      console.log(eventId);
      if (eventId) {
        //send emails to the invite list here
        fetch(`/api/event/send-invites/${eventId}`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            host: currentUser,
            eventInfo: eventInfo,
            emails: emails
          })
        }).then(response => {
          if (response.status === 200 || response.status === 202) {
            console.log(response);
            setEventResult(eventId);
          } else {
            console.log("response failed");
            setEventResult(null);
          }
        });
      }
    }
  };

  const handleTimeInput = event => {
    eventInfo.start_time = event.toDate();
    if (!isValid["start_time"]) {
      setIsValid({
        ...isValid,
        start_time: true
      });
    }
  };

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (eventResult) {
    return <Redirect to={`/event/${eventResult}`} />;
  } else {
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")}></Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <div className={classes.sectionTitle}>
                <h2>Create Event</h2>
              </div>
              <div id="form">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInput
                      id="event_name"
                      error={!isValid["event_name"]}
                      labelText={"Event Name".concat(
                        isValid["event_name"] ? "" : errors.event_name
                      )}
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        onChange: handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      id="location"
                      error={!isValid["location"]}
                      labelText={"Location".concat(
                        isValid["location"] ? "" : errors.location
                      )}
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        onChange: handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <InputLabel
                      className={classes.label}
                      error={!isValid["start_time"]}
                    >
                      {isValid["start_time"] ? "" : errors.start_time}
                    </InputLabel>
                    <br />
                    <FormControl fullWidth className={classes.placeholderText}>
                      <Datetime
                        onChange={handleTimeInput}
                        inputProps={{
                          placeholder: "Start Time",
                          readOnly: true
                        }}
                        isValidDate={(selectedDate, currentDate) => {
                          return selectedDate.isAfter(
                            Datetime.moment().add(1, "day")
                          );
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInput
                      id="message"
                      error={!isValid["message"]}
                      labelText={"Event Description".concat(
                        isValid["message"] ? "" : errors.message
                      )}
                      inputProps={{
                        onChange: handleInput,
                        multiline: true,
                        rows: "2"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={2}>
                    <p className={classes.subtitle}> Guest List: </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9} lg={10}>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <CustomInput
                        id="email_input"
                        error={errors.hasOwnProperty("email_input")}
                        labelText={"Input Email to Invite Friends!".concat(
                          errors.email_input || ""
                        )}
                        inputProps={{
                          type: "email",
                          onKeyDown: handleEmailInput
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <EmailList emails={emails} setEmails={setEmails} />
                    </GridItem>
                  </GridItem>
                </GridContainer>
                <div className={classes.submitButton}>
                  <Button round color="info" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateEvent;
