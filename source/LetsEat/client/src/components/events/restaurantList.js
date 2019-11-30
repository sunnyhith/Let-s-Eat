import React from "react";
// core components
import RestaurantCard from "components/events/restaurantCard";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//Styling
import styles from "assets/jss/layout/CreateEventStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const RestaurantList = (props) => {
    const classes = usestyles();

    return (
        <GridContainer className={classes.container}>
          {
            props.restaurants.map((restaurant,index) => {
              return (
                <GridItem xs={12} md={6} lg={4} key={index}>
                  <RestaurantCard
                    restaurant={restaurant}
                  />
                </GridItem>
              );
            })
          }
        </GridContainer>
    );

}

export default RestaurantList;