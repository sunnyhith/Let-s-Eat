import React, { createContext, useEffect, useState, useCallback } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [preference, setPreference] = useState(undefined);
  const [authStatusReported, setAuthStatusReported] = useState(false);
  const [prefereneReported, setPrefereneReported] = useState(false);
  const [loading, setLoading] = useState(true);

  const updatePreference = useCallback(preference => {
    console.log(preference);
    setPreference(preference);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AuthStateChange");
      setCurrentUser(user);
      if (user) {
        const { uid } = user;
        const db = firebase.firestore();
        db.collection("users")
          .doc(`${uid}`)
          .get()
          .then(doc => {
            if (doc.exists && doc.data().hasPreferences) {
              //TODO: read all preferences from firebase
              setPreference(true);
              setLoading(false);
            } else {
              setPreference(false);
              setLoading(false);
            }
          })
          .catch(function(error) {
            console.log("Error getting preferences:", error);
          });
      } else if (authStatusReported) {
        setPreference(false);
        setLoading(false);
      }
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     console.log("AuthStateChange");
  //     setPrefereneReported(false);
  //     setCurrentUser(user);
  //     setLoading(true);
  //     setAuthStatusReported(true);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (authStatusReported && prefereneReported) {
  //     console.log("SET",preference);
  //     setLoading(false);
  //   }
  // }, [prefereneReported, authStatusReported]);

  // useEffect(() => {
  //   console.log("read preferences");
  //   if (authStatusReported && currentUser) {
  //     const { uid } = currentUser;
  //     const db = firebase.firestore();
  //     db.collection("users")
  //       .doc(`${uid}`)
  //       .get()
  //       .then(doc => {
  //         if (doc.exists && doc.data().hasPreferences) {
  //             //TODO: read all preferences from firebase
  //             setPreference(true);
  //             setPrefereneReported(true);
  //             setLoading(false);
  //         } else {
  //           setPreference(false);
  //           setPrefereneReported(true);
  //           setLoading(false);
  //         }
  //       })
  //       .catch(function(error) {
  //         console.log("Error getting preferences:", error);
  //       });
  //   } else if (authStatusReported) {
  //     setPreference(false);
  //     setPrefereneReported(true);
  //     setLoading(false);
  //   }
  // }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        preference,
        loading,
        updatePreference
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
