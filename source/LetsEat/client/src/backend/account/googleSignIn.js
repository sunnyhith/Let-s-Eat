import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';


function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
      .then(
        function(result) 
        {
          var isNewUser = result.additionalUserInfo.isNewUser;
          if (isNewUser) {
            result.user.delete();
            window.alert('User has not yet regitsered.');
          }
          else{
            window.alert('Welcome back! ' + result.user.displayName);
          }
       }
      )
      .catch(
        function(error)
        {
          console.log('Fail to sign in using Google account.')
        }
      );
}

export default signInWithGoogle;