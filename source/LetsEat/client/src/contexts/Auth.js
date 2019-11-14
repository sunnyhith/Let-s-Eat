import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [preference, setPreference] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    // const uid = currentUser.uid;
    if (currentUser) {
      const { uid } = currentUser;
      const db = firebase.firestore();
      db.collection("users")
        .doc(`${uid}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().hasPreferences) {
              console.log("preferencesssssssss ", currentUser);
              console.log("docdata ", doc.data());
              setPreference(true);
              // this.setState({ preference: true });
            }
            //   return true; //doc.data().hasPreferences;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            //   return true;
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
          return true;
        });
    }
  }, [currentUser]);

  // Will call this method when the user successfully completes the survey
  // and the preferences data is successfully stored in db
  //   const updatePreference = () => {
  //     setPreference(true);
  //   };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        preference,
        loading
        // updatePreference
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
