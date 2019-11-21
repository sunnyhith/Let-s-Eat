import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Geosuggest from "react-geosuggest";
import "assets/css/geosuggest.css";

const animatedComponents = makeAnimated();

const cuisine = [
  { value: "american", label: "American" },
  { value: "chinese", label: "Chinese" },
  { value: "indian", label: "Indian" }
];

const diet = [
  { value: "veg", label: "Vegeterian" },
  { value: "nonveg", label: "Non-Vegeterian" },
  { value: "vegan", label: "Vegan" }
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
