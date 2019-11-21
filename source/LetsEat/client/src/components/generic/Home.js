import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "contexts/Auth";
import { getUserEveryEvents } from "components/events/eventUtil.js";
//core components
import Loading from "components/generic/Loading";
import EventCard from "components/generic/EventCard";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//Styling
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/layout/DashboardStyle.js";
const usestyles = makeStyles(styles);

const Home = () => {
  const classes = usestyles();
  const { currentUser, preference, loading } = useContext(AuthContext);
  const [ eventResult, setEventResult ] = useState(false);
  const [ eventLists, setEventLists ] = useState(null);

  useEffect(() => {
    if (!eventResult && currentUser) {
      getUserEveryEvents(currentUser.email).then(list_events =>{
        console.log("??", list_events.guest_event);
        setEventLists(list_events);
        setEventResult(true);
      }).catch(error=>{console.log(error)})
    }
  }, [eventResult, currentUser]);

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (!preference) {
    return <Redirect to="/survey" />;
  } else {
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h2 className={classes.title}> Welcome Back! </h2>
                <h3 className={classes.subtitle}>
                {currentUser.displayName.toUpperCase()}, invite your friends to an event now!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        </Parallax>

        <div className={classes.mainRaised}>
        {
          (eventResult && eventLists.hasOwnProperty('host_event')) ? 
            <div className={classes.listTitle}>
              <h2>Events You Host</h2>
            </div>
          : ""
        }
        {
          eventResult ? (eventLists.host_event).map((event) => {
              return (
              <EventCard 
                eventInfo={event}
              />);
            }) : ""
        }
        {
          (eventResult && eventLists.hasOwnProperty('guest_event')) ? 
            <div className={classes.listTitle}>
              <h2>Events You Got Invited</h2>
            </div>
          : ""
        }
        {
          eventResult ? (eventLists.guest_event).map((event) => {
              return (
              <EventCard 
                eventInfo={event}
              />);
            }) : ""
        }
        </div>
      </div>
    );
  }
};

export default Home;
