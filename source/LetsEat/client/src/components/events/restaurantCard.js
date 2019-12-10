import React, { useState, useEffect } from "react";
// core components
import { changeVote } from "components/events/votingUtil";
import Button from "components/CustomButtons/Button.js";
import Badge from "components/Badge/Badge.js";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
//Styling
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    marginBottom: "30px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  content: {
    minHeight: "180px"
  },
  detail: {
    margin: "10px 0"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const RestaurantCard = props => {
  const classes = usestyles();
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [voteCount, setVoteCount] = useState(props.restaurant.cnt);
  const { eventId, index } = props;

  const handleVote = event => {
    changeVote(eventId, index);
    if (isSelected) {
      setIsSelected(false);
      setVoteCount(voteCount - 1);
      props.updateVote(props.index, voteCount - 1);
    } else {
      setIsSelected(true);
      setVoteCount(voteCount + 1);
      props.updateVote(props.index, voteCount + 1);
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.restaurant.image_url}
        title="Paella dish"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.restaurant.name}
        </Typography>
        <div className={classes.detail}>
          {props.restaurant
            ? props.restaurant.categories.map((type, index) => {
                return (
                  <Badge key={index} color="primary">
                    {type}
                  </Badge>
                );
              })
            : ""}
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          price: {props.restaurant.price}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          rating: {props.restaurant.rating}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.text}
        >
          {props.restaurant.review_count} reviews on Yelp
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          color={isSelected ? "secondary" : "default"}
          onClick={handleVote}
        >
          <FavoriteIcon />
          <Typography variant="caption" display="block" gutterBottom>
            {voteCount > 0 ? voteCount : ""}
          </Typography>
        </IconButton>
        <Button
          simple
          size="sm"
          color="info"
          href={props.restaurant.url}
          target="_blank"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
