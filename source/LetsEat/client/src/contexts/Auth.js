import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    if (typeof preference === "boolean") {
      setLoading(false);
    }
  }, [preference]);

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser;
      const db = firebase.firestore();
      db.collection("users")
        .doc(`${uid}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().hasPreferences) {
              setPreference(true);
            } else {
              setPreference(false);
            }
          } else {
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
          return true;
        });
    }
  }, [currentUser]);

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
