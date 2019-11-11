import * as firebase from 'firebase';
import firebaseConfig from '../../config/firebaseConfig';

//initial Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();


export default firebaseApp;