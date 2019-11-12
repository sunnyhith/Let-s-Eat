import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAA-LkFAIUh_ApELB7-434Whu63iDBXGts",
  authDomain: "let-s-eat-342c9.firebaseapp.com",
  databaseURL: "https://let-s-eat-342c9.firebaseio.com",
  projectId: "let-s-eat-342c9",
  storageBucket: "let-s-eat-342c9.appspot.com",
  messagingSenderId: "267143236796",
  appId: "1:267143236796:web:aaeba2be509b11992814b9",
  measurementId: "G-QGPPC1GRT0",
  clientId:
    "267143236796-0vsi50q43ttknqv12sl30n2328aph4ko.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/contacts.readonly"
  ]
});

export default firebaseConfig;
