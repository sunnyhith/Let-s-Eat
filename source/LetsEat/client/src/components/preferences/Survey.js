import React, { Component } from "react";

export class Survey extends Component {
  state = {
    firstName: "",
    lastName: "",
    currentLocation: "",
    foodPreferences: "",
    pricePreference: "",
    favCuisines: []
  };
  render() {
    return (
      <div className="card-panel">
        <h4 className="header2">This is the Survey Page</h4>
        <div className="row">
          <form className="col s12 l5" _lpchecked="1">
            <div className="row">
              <div className="input-field col s12 l5">
                <input placeholder="John Doe" type="text" />
                <label for="first_name" class="active">
                  Name
                </label>
              </div>
            </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
          </form>
        </div>
      </div>
    );
  }
}

export default Survey;
