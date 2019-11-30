import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Geosuggest from "react-geosuggest";
import "assets/css/geosuggest.css";

const animatedComponents = makeAnimated();

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
  { value: "none", label: "No dierary restriction" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "gluten_free", label: "Gluten Free"}
];

const price = [
  { value: "1", label: "$" },
  { value: "2", label: "$$" },
  { value: "3", label: "$$$" },
  { value: "4", label: "$$$$" }
];

const CurrentLocation = props => {
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
  return (
    <Geosuggest placeholder="Current Location" onSuggestSelect={updateState} />
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
  };
  return (
    <Select
      isMulti
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
  };
  return (
    <Select
      isMulti
      onChange={updateState}
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={diet}
      placeholder="Dietary Restrictions"
    />
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
  };
  return (
    <Select
      isMulti
      onChange={updateState}
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={price}
      placeholder="Price Range"
    />
  );
};

export { CurrentLocation, CuisineType, DietaryRestrictions, PriceRange };
