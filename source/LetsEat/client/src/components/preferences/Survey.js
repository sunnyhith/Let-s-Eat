import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "components/generic/Loading";
import {
  CurrentLocation,
  CuisineType,
  DietaryRestrictions,
  PriceRange
} from "components/preferences/PreferenceOptions";
// import {testPreference} from "components/preferences/preferenceUtil";
import { AuthContext } from "../../contexts/Auth";
import firebase from "firebase";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
//Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { amber, green } from "@material-ui/core/colors";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const Survey = () => {
  const classes = usestyles();
  const { currentUser, preference, loading } = useContext(AuthContext);
  const [writeDone, setWriteDone] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [inputFields, setInputFields] = useState({
    firstName: "",
    lastName: "",
    currentLocation: "",
    dietaryRestrictions: [],
    pricePreference: [],
    favCuisines: []
  });
  const steps = [
    "About You",
    "Preferences",
    "Dietary Restrictions",
    "Favourite Cuisines"
  ];

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  const handleChange = event => {
    setInputFields({
      ...inputFields,
      [event.target.id]: event.target.value
    });
  };

  const updatePreference = userInfo => {
    const db = firebase.firestore();
    var docRef = db
      .collection("users")
      .doc(userInfo.email)
      .update({
        hasPreferences: true,
        name: inputFields.firstName + " " + inputFields.lastName,
        currentLocation: inputFields.currentLocation,
        dietaryRestrictions: inputFields.dietaryRestrictions.reduce(
          (a, cusine) => ((a[cusine.label] = ""), a),
          {}
        ),
        pricePreference: inputFields.pricePreference.reduce(
          (a, cusine) => ((a[cusine.label] = ""), a),
          {}
        ),
        favCuisines: inputFields.favCuisines.reduce(
          (a, cusine) => ((a[cusine.label] = ""), a),
          {}
        )
      })
      .then(() => {
        console.log("Document successfully written!");
        setWriteDone(true);
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
        setWriteDone(false);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    updatePreference(currentUser);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        const fullName = currentUser.displayName.split(" ");
        let fName, lName;
        if (fullName.length === 2) {
          fName = fullName[0];
          lName = fullName[1];
        }
        return (
          <div id="form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CustomInput
                  id="firstName"
                  labelText={"First Name"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: fName ? fName : inputFields.firstName,
                    disabled: fName ? true : false
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CustomInput
                  id="lastName"
                  labelText={"Last Name"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: lName ? lName : inputFields.lastName,
                    disabled: lName ? true : false
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CurrentLocation
                  id="currentLocation"
                  handleSelectChange={handleChange}
                />
              </GridItem>
            </GridContainer>
          </div>
        );
      case 1:
        return (
          <div id="form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <PriceRange
                  id="pricePreference"
                  handleSelectChange={handleChange}
                />
              </GridItem>
            </GridContainer>
          </div>
        );
      case 2:
        return (
          <div id="form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <DietaryRestrictions
                  id="dietaryRestrictions"
                  handleSelectChange={handleChange}
                />
              </GridItem>
            </GridContainer>
          </div>
        );
      case 3:
        return (
          <div id="form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CuisineType
                  id="favCuisines"
                  handleSelectChange={handleChange}
                />
              </GridItem>
            </GridContainer>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  }));

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon
  };

  const [open, setOpen] = useState(false);

  const MySnackbarContentWrapper = props => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  };

  MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (preference) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.root}>
        <Parallax image={require("assets/img/bkg.jpg")}></Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <div>
                      <Button round simple color="info" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button
                        round
                        disabled={!writeDone}
                        color="info"
                        component={Link}
                        to="/"
                      >
                        Dashboard
                      </Button>
                      {activeStep === steps.length && writeDone === true && (
                        <p>SUCCESS: Preferences Saved</p>
                      )}
                      {activeStep === steps.length && writeDone === false && (
                        <p>ERROR: Preferences Not Saved</p>
                      )}
                    </div>
                    <div>
                      <Snackbar
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center"
                        }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                      >
                        <MySnackbarContentWrapper
                          onClose={handleClose}
                          variant={writeDone ? "success" : "error"}
                          message={
                            writeDone
                              ? "Awesome! Survey is now complete, redirecting to Dashboard."
                              : `Error saving your responses. Please "Reset" and try again`
                          }
                        />
                      </Snackbar>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography component={"div"}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <Button
                      disabled={activeStep === 0}
                      round
                      color="info"
                      simple
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      round
                      color="info"
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Survey;
