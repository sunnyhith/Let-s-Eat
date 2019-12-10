import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import {
  readEvent,
  getUserStatus,
  changeGuestStatus,
  setFinalDecision
} from "components/events/eventUtil.js";
import { create_sugst_save_to_db } from "components/suggest-restaurant/suggestionDb.js";
import moment from "moment";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import EditModal from "components/events/editModal";
import InvitationModal from "components/events/invitationModal";
import RestaurantList from "components/events/restaurantList";
import GuestLists from "components/events/guestLists";
import Loading from "components/generic/Loading";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Badge from "components/Badge/Badge.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const Event = props => {
  const classes = usestyles();
  const { currentUser, loading } = useContext(AuthContext);

  const eventId = props.match.params.event_id;
  const [eventResult, setEventResult] = useState(false);
  const [eventDeleted, setEventDeleted] = useState(false);
  const [eventInfo, setEventInfo] = useState({});
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [loadingFinalDecision, setLoadingFinalDecision] = useState(false);
  const [isHost, setIsHost] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const statusList = {
    invited: "invited",
    tentative: "Maybe",
    declined: "Can't go",
    attending: "Going"
  };

  useEffect(() => {
    var getEventInfo = async () => {
      var tempEvent = await readEvent(eventId);
      setEventInfo(tempEvent);
      setEventResult(true);
    };
    if (!eventResult) {
      getEventInfo();
    }
  }, [eventResult]);

  useEffect(() => {
    if (currentUser && eventResult && typeof isHost === "undefined") {
      setIsHost(currentUser.email == eventInfo.host);
    }
  }, [currentUser, eventResult, isHost]);

  useEffect(() => {
    var getStatus = async () => {
      var status = await getUserStatus(currentUser.email, eventId);
      setStatus(status);
    };

    if (currentUser && typeof status === "undefined") {
      getStatus();
    }
  }, [currentUser, status]);

  const handleInvitationModal = hadUpdate => {
    if (hadUpdate) {
      setEventResult(false);
    }
    setOpenInvitationModal(false);
  };

  const handleEditModal = action => {
    if (action.delete) {
      setEventDeleted(true);
    }
    if (action.update) {
      setEventResult(false);
    }
    setOpenEditModal(false);
  };

  const handleStatusChange = status => {
    changeGuestStatus(currentUser.email, eventId, status);
    setStatus(status);
    setEventResult(false);
  };

  const handleGenerateSuggestions = () => {
    var getSugst = async () => {
      try {
        await create_sugst_save_to_db(eventId);
      } catch (error) {
        setLoadingSuggestion(false);
      }
      setEventResult(false);
    };
    setLoadingSuggestion(true);
    getSugst();
  };

  const handleSendReminder = () => {
    fetch("/api/event/sendMails", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "remindInvitees",
        host: currentUser,
        eventInfo: eventInfo,
        emails: eventInfo.invited,
        start_time: moment(eventInfo.start_time.toDate()).format("llll")
      })
    }).then(response => {
      if (response.status === 200 || response.status === 202) {
        window.alert("Reminders sent to your friends");
        setEventResult(eventId);
      } else {
        window.alert("Error: Failed to send Reminders. Please try again");
        setEventResult(null);
      }
    });
  };

  const updateVote = (id, vote) => {
    eventInfo.vote_cnt[id] = vote;
  };

  const handleFinalDecision = () => {
    var updateDecision = async () => {
      let max = eventInfo.vote_cnt[0];
      let maxIndex = 0;
      for (var i = 1; i < eventInfo.vote_cnt.length; i++) {
        if (eventInfo.vote_cnt[i] > max) {
          maxIndex = i;
          max = eventInfo.vote_cnt[i];
        }
      }
      try {
        await setFinalDecision(eventId, maxIndex);
        fetch("/api/event/sendMails", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            action: "finalRestaurant",
            host: currentUser,
            eventInfo: eventInfo,
            emails: eventInfo.attending.concat(eventInfo.tentative),
            start_time: moment(eventInfo.start_time.toDate()).format("llll"),
            restaurant: eventInfo.restaurants[maxIndex]
          })
        }).then(response => {
          if (response.status === 200 || response.status === 202) {
            window.alert("Final restaurant details mailed to your friends");
            setEventResult(false);
            setLoadingFinalDecision(false);
          } else {
            window.alert(
              "Error: Failed to send the Finalized Restaurant. Please try again"
            );
            setLoadingFinalDecision(false);
          }
        });
      } catch (error) {
        setLoadingFinalDecision(false);
      }
    };

    setLoadingFinalDecision(true);
    updateDecision();
  };

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (eventDeleted) {
    return <Redirect to="/" />;
  } else if (!eventResult) {
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <Loading />
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
          currentUser={currentUser}
          eventId={eventId}
          eventInfo={eventInfo}
        />
        <InvitationModal
          open={openInvitationModal}
          closeModal={handleInvitationModal}
          eventId={eventId}
          eventInfo={eventInfo}
        />
        <Parallax image={require("assets/img/bkg.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.sections}>
            <div className={classes.container}>
              <div className={classes.sectionTitle}>
                <h2 className={classes.eventName}>
                  {eventInfo.event_name}
                  {isHost ? (
                    <Button
                      justIcon
                      size="sm"
                      round
                      simple
                      color="github"
                      className={classes.titleEditButton}
                      onClick={() => {
                        setOpenEditModal(true);
                      }}
                    >
                      <i className="far fa-edit"></i>
                    </Button>
                  ) : (
                    ""
                  )}

                  {typeof status === "undefined" ||
                  isHost ||
                  status === "invited" ? (
                    ""
                  ) : (
                    <div className={classes.statusDropdown}>
                      <CustomDropdown
                        className={classes.statusDropdown}
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
                            onClick={() => {
                              handleStatusChange("attending");
                            }}
                          >
                            Going
                          </p>,
                          <p
                            id="tentative"
                            className={classes.dropdownLink}
                            onClick={() => {
                              handleStatusChange("tentative");
                            }}
                          >
                            Maybe
                          </p>,
                          <p
                            id="declined"
                            className={classes.dropdownLink}
                            onClick={() => {
                              handleStatusChange("declined");
                            }}
                          >
                            Can't Go
                          </p>
                        ]}
                      />
                    </div>
                  )}
                </h2>
                <p className={classes.infoText}>
                  <i
                    className={classNames(
                      "fas fa-map-marker-alt",
                      classes.infoIcon
                    )}
                  ></i>
                  {eventInfo.location}
                </p>
                <p className={classes.infoText}>
                  <i
                    className={classNames("far fa-clock", classes.infoIcon)}
                  ></i>
                  {moment(eventInfo.start_time.toDate()).format("llll")}
                </p>
                <p className={classes.infoText}>
                  <i
                    className={classNames(
                      "fas fa-info-circle",
                      classes.infoIcon
                    )}
                  ></i>
                  {eventInfo.message}
                </p>
              </div>
              <div className={classes.sectionBody}>
                {!isHost || eventInfo.invited.length === 0 ? (
                  ""
                ) : (
                  <div>
                    <h5 className={classes.respondText}>
                      {eventInfo.invited.length} guests haven't responded yet.
                      You can wait or send them a reminder
                    </h5>
                    <Button
                      size="sm"
                      color="info"
                      id="attending"
                      className={classes.respondButton}
                      onClick={() => handleSendReminder()}
                    >
                      send reminder
                    </Button>
                  </div>
                )}

                {!eventInfo.final_decision ? (
                  ""
                ) : (
                  <div>
                    <h5 className={classes.respondText}>
                      Final decision has been made:{" "}
                      <Badge color="info">
                        {eventInfo.restaurants[eventInfo.final_decision].name}
                      </Badge>
                    </h5>
                  </div>
                )}

                {!isHost ||
                eventInfo.final_decision ||
                !Array.isArray(eventInfo.restaurants) ||
                eventInfo.restaurants.length === 0 ? (
                  ""
                ) : (
                  <div>
                    <h5 className={classes.respondText}>
                      Ready to generate and send the final decison?
                    </h5>
                    {loadingFinalDecision ? (
                      <React.Fragment>
                        <i className="fa fa-spinner fa-pulse fa-fw" />
                        Generating Final Restaurant Decision...
                      </React.Fragment>
                    ) : (
                      <Button
                        size="sm"
                        color="info"
                        id="attending"
                        className={classes.respondButton}
                        onClick={() => handleFinalDecision()}
                      >
                        generate final decision
                      </Button>
                    )}
                  </div>
                )}

                {!Array.isArray(eventInfo.restaurants) ||
                eventInfo.restaurants.length === 0 ? (
                  ""
                ) : (
                  <h4 className={classes.respondText}>
                    Vote for your favorite restaurants from the suggestions
                    below
                  </h4>
                )}

                {!isHost ||
                (Array.isArray(eventInfo.restaurants) &&
                  eventInfo.restaurants.length !== 0) ? (
                  ""
                ) : (
                  <>
                    <h5 className={classes.respondText}>
                      Or Generate Restaurants Suggestions Now:
                    </h5>
                    {loadingSuggestion ? (
                      <React.Fragment>
                        <i className="fa fa-spinner fa-pulse fa-fw" />
                        Generating suggestions...
                      </React.Fragment>
                    ) : (
                      <Button
                        size="sm"
                        color="info"
                        id="attending"
                        className={classes.respondButton}
                        onClick={() => {
                          handleGenerateSuggestions();
                        }}
                      >
                        Generate
                      </Button>
                    )}
                  </>
                )}

                {typeof status === "undefined" ||
                isHost ||
                status !== "invited" ? (
                  ""
                ) : (
                  <div>
                    <p className={classes.respondText}>
                      You are invited to this event, Respond Now:
                    </p>
                    <Button
                      size="sm"
                      color="info"
                      id="attending"
                      className={classes.respondButton}
                      onClick={() => {
                        handleStatusChange("attending");
                      }}
                    >
                      Going
                    </Button>
                    <Button
                      size="sm"
                      color="info"
                      id="tentative"
                      className={classes.respondButton}
                      onClick={() => {
                        handleStatusChange("tentative");
                      }}
                    >
                      Maybe
                    </Button>
                    <Button
                      size="sm"
                      color="info"
                      id="declined"
                      className={classes.respondButton}
                      onClick={() => {
                        handleStatusChange("declined");
                      }}
                    >
                      Can't Go
                    </Button>
                  </div>
                )}
              </div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  {eventInfo.restaurants ? (
                    <NavPills
                      color="info"
                      tabs={[
                        {
                          tabButton: "Restaurants",
                          tabContent: (
                            <RestaurantList
                              restaurants={eventInfo.restaurants}
                              eventId={eventId}
                              updateVote={updateVote}
                            />
                          )
                        },
                        {
                          tabButton: "Guest List",
                          tabContent: (
                            <GuestLists
                              eventInfo={eventInfo}
                              isHost={isHost}
                              setOpenInvitationModal={setOpenInvitationModal}
                            />
                          )
                        }
                      ]}
                    />
                  ) : (
                    <NavPills
                      color="info"
                      tabs={[
                        {
                          tabButton: "Guest List",
                          // tabIcon: Schedule,
                          tabContent: (
                            <GuestLists
                              eventInfo={eventInfo}
                              isHost={isHost}
                              setOpenInvitationModal={setOpenInvitationModal}
                            />
                          )
                        }
                      ]}
                    />
                  )}
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Event;
