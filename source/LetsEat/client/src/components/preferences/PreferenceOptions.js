import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Geosuggest from "react-geosuggest";
import InputLabel from "@material-ui/core/InputLabel";
import "assets/css/geosuggest.css";
import { makeStyles } from '@material-ui/core/styles';

const animatedComponents = makeAnimated();
const useStyles = makeStyles({
  label: {
      color: "error",
      display: "inline-flex",
      fontSize: "11px",
      transition: "0.3s ease all",
      lineHeight: "1.428571429",
      fontWeight: "400",
      paddingLeft: "0",
      letterSpacing: "normal"
  },
  locationInput: {
    color: "#495057",
    height: "unset",
    padding: "0 0 7px",
    boxShadow: "none",
    borderBottom: "1px solid #D2D2D2",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: "#AAAAAA"
    },
    "&:focus": {
      paddingLeft: "5px",
      borderBottom: "2px solid #9c27b0",
      borderColor: "transparent"
    },
  },
});

let defaultLocation = "";
let defaultCuisine = [];
let defaultDiet = [];
let defaultPrice = [];

const cuisine = [
  { value: "American", label: "American" },
  { value: "Chinese", label: "Chinese" },
  { value: "Indian", label: "Indian" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Mexican", label: "Mexican" },
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "Middle Eastern", label: "Middle Eastern" },
  { value: "Korean", label: "Korean" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "German", label: "German" },
  { value: "French", label: "French" },
  { value: "Coffee and Tea", label: "Coffee and Tea" },
  { value: "Dessert", label: "Dessert" },
  { value: "African", label: "African" },
  { value: "Latin American", label: "Latin American" }
];

const diet = [
  { value: "vegeterian", label: "Vegeterian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "gluten_free", label: "Gluten Free" }
];

const price = [
  { value: "1", label: "$" },
  { value: "2", label: "$$" },
  { value: "3", label: "$$$" },
  { value: "4", label: "$$$$" }
];

const CurrentLocation = props => {
  const classes = useStyles();
  const [location, setLocation] = useState(defaultLocation);

  const updateState = suggest => {
    const description = suggest ? suggest.description : "";
    const params = {
      target: {
        id: props.id,
        value: description
      }
    };
    props.handleSelectChange(params);
  };

  const updateInput  = input => {
    setLocation(input);
  }

  return (
    <div>
      <InputLabel
        className={classes.label}
      >
        {location === defaultLocation ? "" : "Location"}
      </InputLabel>
      <Geosuggest
        placeholder="Current Location *"
        initialValue={defaultLocation}
        onSuggestSelect={updateState}
        onChange={updateInput}
        value={location}
        inputClassName={classes.locationInput}
      />
    </div>
  );
};

const CuisineType = props => {
  const updateState = selectOption => {
    const params = {
      target: {
        id: props.id,
        value: selectOption
      }
    };
    props.handleSelectChange(params);
    defaultCuisine = selectOption;
  };
  return (
    <Select
      isMulti
      value={defaultCuisine}
      onChange={updateState}
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={cuisine}
      placeholder="Favourite Cuisines"
    />
  );
};

const DietaryRestrictions = props => {
  const updateState = selectOption => {
    const params = {
      target: {
        id: props.id,
        value: selectOption
      }
    };
    props.handleSelectChange(params);
    defaultDiet = selectOption;
  };
  return props.visible ? (
    <Select
      isMulti
      value={defaultDiet}
      onChange={updateState}
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={diet}
      placeholder="Dietary Restrictions"
      display="none"
    />
  ) : (
    <React.Fragment></React.Fragment>
  );
};

const PriceRange = props => {
  const updateState = selectOption => {
    const params = {
      target: {
        id: props.id,
        value: selectOption
      }
    };
    props.handleSelectChange(params);
    defaultPrice = selectOption;
  };

  return (
    <Select
      isMulti
      value={defaultPrice}
      onChange={updateState}
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={price}
      placeholder="Price Range"
    />
  );
};

export { CurrentLocation, CuisineType, DietaryRestrictions, PriceRange };
