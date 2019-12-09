import React from "react";
// core components
import EmailList from "components/events/emailList";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const GuestLists = props => {
  const classes = usestyles();
  const guestList = ["invited", "attending", "tentative", "declined"];
  const listText = ["Invited", "Attending", "Tentative", "Declined"];

  return (
    <GridContainer className={classes.tabContainer}>
      <GridItem xs={12}>
        {props.isHost && !props.eventInfo.final_decision ? (
          <Button
            className={classes.editButton}
            size="sm"
            simple
            color="info"
            onClick={() => {
              props.setOpenInvitationModal(true);
            }}
          >
            <i className="far fa-edit"></i>
            Invite More
          </Button>
        ) : (
          ""
        )}
      </GridItem>
      {guestList.map((guest, index) => {
        if (props.eventInfo[guest] && props.eventInfo[guest].length > 0) {
          return (
            <>
              <GridItem xs={12} sm={12} md={3} lg={2}>
                <p className={classes.listSubtitle}> {listText[index]} : </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={8} lg={9}>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <EmailList emails={props.eventInfo[guest]} self={false} />
                </GridItem>
              </GridItem>
            </>
          );
        }
      })}
    </GridContainer>
  );
};

export default GuestLists;
