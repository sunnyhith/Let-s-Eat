import React, { createContext, useEffect, useState, useCallback } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  });

  useEffect(() => {
    if (currentUser) {
      const { email } = currentUser;
      const db = firebase.firestore();
      db.collection("users")
        .doc(`${email}`)
        .get()
        .then(doc => {
          if (doc.exists && doc.data().hasPreferences) {
            setPreference(true);
          } else {
            setPreference(false);
          }
        })
        .catch(function(error) {
          console.log("Error getting preferences:", error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof preference === "boolean") {
      setLoading(false);
    }
  }, [preference]);

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
