import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Check from "@material-ui/icons/Check";
import { AuthContext } from "../../contexts/Auth";
import firebase from "firebase";

const Survey = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  const [writeDone, setWriteDone] = useState(false);
  const [inputFields, setInputFields] = useState({
    firstName: "",
    lastName: "",
    currentLocation: "",
    foodPreferences: "",
    pricePreference: "",
    favCuisines: ""
  });

  const onChange = event => {
    setInputFields({ ...inputFields, [event.target.id]: event.target.value });
  };

  const updatePreference = userInfo => {
    //TODO: store all preference into firebase
    const db = firebase.firestore();
    var docRef = db
      .collection("users")
      .doc(userInfo.email)
      .update({
        hasPreferences: true,
        test: "Adding new field"
      })
      .then(function() {
        console.log("Document successfully written!");
        setWriteDone(true);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const onSubmit = event => {
    // event.preventDefault();
    updatePreference(currentUser);
    console.log(inputFields);
  };

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (preference) {
    return <Redirect to="/" />;
  } else if (writeDone) {
    return (
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
            at your phone and find them...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
    );
  } else {
    return (
      <React.Fragment>
        <Parallax image={require("assets/img/bkg.jpg")}>
          <div className="container">
            <form onSubmit={onSubmit} className="white">
              <h4 className="grey-text text-darken-3">
                Please fill out the following details
              </h4>
              <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={inputFields.firstName}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={inputFields.lastName}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="currentLocation">Current Location</label>
                <input
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  value={inputFields.currentLocation}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="foodPreferences">Food Preferences</label>
                <input
                  type="text"
                  id="foodPreferences"
                  name="foodPreferences"
                  value={inputFields.foodPreferences}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="pricePreference">Price Preference</label>
                <input
                  type="text"
                  id="pricePreference"
                  name="pricePreference"
                  value={inputFields.pricePreference}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="favCuisines">Favourite Cuisines</label>
                <input
                  type="text"
                  id="favCuisines"
                  name="favCuisines"
                  value={inputFields.favCuisines}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input-field">
                <button className="btn red z-depth-0">Submit</button>
              </div>
            </form>
          </div>
        </Parallax>
      </React.Fragment>
    );
  }
};

export default Survey;
