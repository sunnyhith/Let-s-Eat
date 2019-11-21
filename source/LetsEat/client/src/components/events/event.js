import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { readEvent, getUserStatus, changeGuestStatus } from "components/events/eventUtil.js";
import moment from "moment";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import EditModal from "components/events/editModal";
import InvitationModal from "components/events/invitationModal";
import EmailList from "components/events/emailList";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const Event = (props) => {
  const classes = usestyles();
  const { currentUser, preference, loading } = useContext(AuthContext);
  
  const eventId = props.match.params.event_id;
  const guestList = ["invited", "attending", "tentative", "declined"];
  const [eventResult, setEventResult] = useState(false);
  const [eventInfo, setEventInfo] = useState({});
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isHost, setIsHost] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const statusList = {
    invited: "invited",
    tentative: "Maybe",
    declined: "Can't go",
    attending: "Going",
  }

  useEffect(() => {
      var getEventInfo = async () => {
          console.log("getEventInfo");
          var tempEvent = await readEvent(eventId);
          setEventInfo(tempEvent);
          setEventResult(true);
      };
      
      if (!eventResult) {
          getEventInfo();
      }
  },[eventResult]);  

  useEffect(() => {
    if (currentUser && eventResult && typeof isHost === 'undefined') {
      console.log(currentUser.email == eventInfo.host);
      setIsHost(currentUser.email == eventInfo.host);
    }

  }, [currentUser, eventResult, isHost]);

  useEffect(() => {
    var getStatus = async () => {
      var status = await getUserStatus(currentUser.email, eventId);
      setStatus(status);
    };

    if (currentUser && typeof status === 'undefined') {
      getStatus();
    }

  }, [currentUser, status]);

  const handleInvitationModal = (hadUpdate) => {
      if (hadUpdate) {
          setEventResult(false);
      }
      setOpenInvitationModal(false);
  }

  const handleEditModal = (hadUpdate) => {
    if (hadUpdate) {
        setEventResult(false);
    }
    setOpenEditModal(false);
}

  const handleStatusChange = (event) => {
    changeGuestStatus(
      currentUser.email,
      eventId,
      event.target.id,
    );
    setStatus(event.target.id);
    setEventResult(false);
  }

  console.log(eventInfo);

  if (loading) {
    return <Loading/>;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (!eventResult){
      return (
        <div>
            <Parallax image={require("assets/img/bkg.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.sections}>
                    <div className={classes.container}>
                        <div className={classes.sectionTitle}>
                            <h2><i className="fa fa-spinner fa-pulse fa-fw"></i></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  } else {
    return (
      <div>
        <EditModal
            open={openEditModal}
            closeModal={handleEditModal}
            eventId={eventId}
            eventInfo={eventInfo}
        />
        <InvitationModal
            open={openInvitationModal}
            closeModal={handleInvitationModal}
            eventId={eventId}
        />
        <Parallax image={require("assets/img/bkg.jpg")}/>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <div className={classes.sectionTitle}>
                  <h2> 
                    {eventInfo.event_name} 
                    {isHost ? 
                        <Button 
                            justIcon
                            size="sm"
                            round
                            simple
                            color="github"
                            className={classes.titleEditButton}
                            onClick={() => {setOpenEditModal(true)}}
                        > 
                            <i className="far fa-edit"></i>
                        </Button>
                      : ""
                    }
                  </h2>
                  {(typeof status === 'undefined' || isHost)? '' :
                    <CustomDropdown
                      noLiPadding
                      hoverColor="info"
                      buttonText={statusList[status]}
                      buttonProps={{
                        size: "sm",
                        color: "info"
                      }}
                      dropdownList={[
                        <p 
                          id="attending"
                          className={classes.dropdownLink}
                          onClick={handleStatusChange}
                        >Going</p>,
                        <p
                          id="tentative"
                          className={classes.dropdownLink}
                          onClick={handleStatusChange}
                        >Maybe</p>,
                        <p
                          id="declined"
                          className={classes.dropdownLink}
                          onClick={handleStatusChange}
                        >Can't Go</p>,
                      ]}
                    />
                  }
              </div>
              <div id="form">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      id="location"
                      labelText={"Location"}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: eventInfo.location,
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                    <CustomInput
                      id="start_time"
                      labelText={"Start Time"}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: moment.unix(eventInfo.start_time.seconds).format('LLLL'),
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInput
                      id="message"
                      labelText={"Event Description"}
                      inputProps={{
                        multiline: true,
                        value: eventInfo.message,
                      }}
                      formControlProps={{
                        fullWidth: true,
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6} lg={6}>
                    <p className={classes.listTitle}> Guest List: </p>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6} lg={6} className={classes.rightOperation}>
                  {isHost ? 
                      <Button 
                          className={classes.editButton}
                          size="sm"
                          round
                          simple
                          color="info"
                          onClick={() => {setOpenInvitationModal(true)}}
                      > 
                          <i className="far fa-edit"></i>
                          Invite More
                      </Button>
                  : ""
                  }
                  </GridItem>


                  {
                    guestList.map(guest => {  
                        if (eventInfo[guest] && eventInfo[guest].length > 0) {
                            return (
                                <>
                                    <GridItem xs={12} sm={12} md={3} lg={2}>
                                        <p className={classes.listSubtitle}> {guest} : </p>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={8} lg={9}>
                                        <GridItem xs={12} sm={12} md={12} lg={12}>
                                            <EmailList
                                                emails={eventInfo[guest]}
                                                self={false}
                                            />
                                        </GridItem>
                                    </GridItem>
                                </>
                            );
                        }
                    })
                  }

                </GridContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Event;
