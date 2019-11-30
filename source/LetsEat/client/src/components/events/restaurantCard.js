import React from "react";
// core components
import Button from "components/CustomButtons/Button.js";
import Badge from 'components/Badge/Badge.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
//Styling
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    marginBottom: "30px",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    minHeight: "180px",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RestaurantCard = (props) => {
    const classes = usestyles();

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
            {
                props.restaurant ? props.restaurant.categories.map((type,index) => {
                    return (
                        <Badge 
                            key={index}
                            color="primary"
                        >
                            {type}
                        </Badge>
                    );
                }) : ""
            }
            <Typography variant="body2" color="textSecondary" component="p">
                Details
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <Button 
                simple 
                size="small" 
                color="info" 
                href={props.restaurant.url}
                target="_blank"
            >
                Learn More
            </Button>
        </CardActions>
        </Card>
    );

}

export default RestaurantCard;