import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "components/generic/Loading";
import SnackbarContent from "components/Snackbar/SnackbarContent";
// import Check from "@material-ui/icons/Check";
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

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types";
import clsx from "clsx";
// import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { amber, green } from "@material-ui/core/colors";
//Price Preference Imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const Survey = () => {
  const classes = usestyles();
  const { currentUser, preference, loading } = useContext(AuthContext);
  const [writeDone, setWriteDone] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [inputFields, setInputFields] = useState({
    firstName: "",
    lastName: "",
    currentLocation: "",
    foodPreferences: "",
    dietaryRestrictions: "",
    pricePreference: "",
    favCuisines: ""
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

  const handleSelectChange = name => event => {
    setInputFields({
      ...inputFields,
      [name]: event.target.value
    });
  };

  const updatePreference = userInfo => {
    //TODO: store all preference into firebase
    const db = firebase.firestore();
    var docRef = db
      .collection("users")
      .doc(userInfo.email)
      .update({
        hasPreferences: true,
        name: inputFields.firstName + " " + inputFields.lastName,
        currentLocation: inputFields.currentLocation,
        foodPreferences: inputFields.foodPreferences,
        dietaryRestrictions: inputFields.dietaryRestrictions,
        pricePreference: inputFields.pricePreference,
        favCuisines: inputFields.favCuisines
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
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    updatePreference(currentUser);
    console.log(inputFields);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
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
                    value: inputFields.firstName
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
                    value: inputFields.lastName
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CustomInput
                  id="currentLocation"
                  labelText={"Current Location"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: inputFields.currentLocation
                  }}
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
                <CustomInput
                  id="foodPreferences"
                  labelText={"Food Preferences"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: inputFields.foodPreferences
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <FormControl required className={classes.formControl}>
                  <InputLabel>Price</InputLabel>
                  <Select
                    id="pricePreference"
                    value={inputFields.pricePreference}
                    onChange={handleSelectChange("pricePreference")}
                    autoWidth={true}
                  >
                    <MenuItem value="Any">Any</MenuItem>
                    <MenuItem value="$">$</MenuItem>
                    <MenuItem value="$$">$$</MenuItem>
                    <MenuItem value="$$$">$$$</MenuItem>
                    <MenuItem value="$$$$">$$$$</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
          </div>
        );
      case 2:
        return (
          <div id="form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={6}>
                <CustomInput
                  id="dietaryRestrictions"
                  labelText={"Dietary Restrictions"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: inputFields.dietaryRestrictions
                  }}
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
                <CustomInput
                  id="favCuisines"
                  labelText={"Favourite Cuisines"}
                  formControlProps={{
                    fullWidth: true,
                    required: true
                  }}
                  inputProps={{
                    onChange: handleChange,
                    value: inputFields.favCuisines
                  }}
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
  } else if (!preference) {
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
                    {/* <Typography
                      component={"div"}
                      className={classes.instructions}
                    >
                      Survey completed! Redirecting to your Dashboard...
                    </Typography> */}
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
                              : "Error saving your responses, please try again."
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
  } else {
    return <Redirect to="/" />;
  }
};

export default Survey;
