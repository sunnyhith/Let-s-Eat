import React from "react";
import { Link, Redirect } from "react-router-dom";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import {
  cardTitle,
  cardLink,
  cardSubtitle
} from "assets/jss/material-kit-react.js";

const styles = theme => ({
  cardTitle,
  cardLink,
  cardSubtitle: {
    ...cardSubtitle,
    color: "rgba(0, 0, 0, 0.87)"
  },
  cardText: {
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: "10px"
  },
  hightlight: {
    margin: "0 5px 0 10px"
  },
  card: {
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      minWidth: "340px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "60vw",
      minWidth: "340px"
    },
    [theme.breakpoints.up("md")]: {
      width: "50vw",
      minWidth: "500px",
      marginBottom: "60px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "40vw",
      minWidth: "800px"
    }
  }
});

const useStyles = makeStyles(styles);

export default function EventCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardBody>
        <Link to={"/event/" + props.eventInfo.event_id}>
          <h3 className={classes.cardTitle}>{props.eventInfo.event_name}</h3>
          <h4 className={classes.cardSubtitle}>
            <i className="fas fa-map-pin"></i> {props.eventInfo.location}.
            <small className={classes.cardFooter}>
              <span className={classes.hightlight}>
                {" "}
                {props.eventInfo.attending_cnt}{" "}
              </span>
              Attending.
              <span className={classes.hightlight}>
                {" "}
                {props.eventInfo.invited_cnt}{" "}
              </span>
              Invited.
              <span className={classes.hightlight}>
                {" "}
                {props.eventInfo.declined_cnt}{" "}
              </span>
              Declined.
            </small>
          </h4>
          <p className={classes.cardText}>{props.eventInfo.message}</p>
        </Link>
      </CardBody>
    </Card>
  );
}
