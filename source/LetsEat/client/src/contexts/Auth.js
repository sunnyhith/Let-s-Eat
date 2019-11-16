import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [preference, setPreference] = useState(undefined);
  const [authStatusReported, setAuthStatusReported] = useState(false);
  const [prefereneReported, setPrefereneReported] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setAuthStatusReported(true);
    });
  }, []);

  useEffect(() => {
    if (authStatusReported && prefereneReported) {
      setLoading(false);
    }
  }, [authStatusReported, prefereneReported]);

  useEffect(() => {
    if (authStatusReported && currentUser) {
      const { email } = currentUser;
      const db = firebase.firestore();
      db.collection("users")
        .doc(`${email}`)
        .get()
        .then(doc => {
          if (doc.exists && doc.data().hasPreferences) {
            //TODO: read all preferences from firebase
            setPreference(true);
            setPrefereneReported(true);
          } else {
            setPreference(false);
            setPrefereneReported(true);
          }
        })
        .catch(function(error) {
          console.log("Error getting preferences:", error);
        });
    } else if (authStatusReported) {
      setPreference(false);
      setPrefereneReported(true);
    }
  }, [authStatusReported]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        preference,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
