import React, { forwardRef, useState } from "react";
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// core components
import Button from "components/CustomButtons/Button.js";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";
//Styling
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles(modalStyle);

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const InstructionsModal = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [modal, setModal] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const stepContent = [
    "For starters, we'll start with a short survey",
    "We need you to complete this survey for helping us suggest better restaurants for you",
    "After successfully completing the survey, you will automatically be redirected to your personalized Dashboard",
    "Dashboard is the place where you can view the Events that you are hosting, or are invited to!",
    "Excited? Let's get this survey out of the way!"
  ];
  const stepCount = stepContent.length;

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <h5>{stepContent[0]}</h5>
          </div>
        );
      case 1:
        return (
          <div>
            <h5>{stepContent[1]}</h5>
          </div>
        );
      case 2:
        return (
          <div>
            <h5>{stepContent[2]}</h5>
          </div>
        );
      case 3:
        return (
          <div>
            <h5>{stepContent[3]}</h5>
          </div>
        );
      case 4:
        return (
          <div>
            <h5>{stepContent[4]}</h5>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const closeModal = () => setModal(false);

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
      >
        <DialogTitle disableTypography className={classes.modalHeader}>
          <h3 className={classes.modalTitle}>Welcome to Let's Eat!</h3>
        </DialogTitle>
        <DialogContent className={classes.instrModalBody}>
          <Typography component={"div"}>
            {getStepContent(activeStep)}
          </Typography>
          <MobileStepper
            variant="dots"
            steps={stepCount}
            position="static"
            activeStep={activeStep}
            className={classes.instrModalStepper}
            nextButton={
              <Button
                color={activeStep === stepCount - 1 ? "rose" : "info"}
                round
                onClick={activeStep === stepCount - 1 ? closeModal : handleNext}
              >
                {activeStep === stepCount - 1 ? "Continue" : "Next"}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                color="info"
                round
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructionsModal;
