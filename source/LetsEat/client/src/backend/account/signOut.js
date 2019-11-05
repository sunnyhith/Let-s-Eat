import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';


function signOut(){
    var user = firebase.auth().currentUser;
    if(user){
        firebase.auth().signOut()
        .then(
            function(){
                window.alert("Successfully signed out " + user.displayName);
            }
        )
        .catch
        (
            function(error)
            {
                console.log('Failed to signed out. ' + 
                            'errorCode: ' + error.code + ' errorMessage: ' + error.message);
                window.alert('Fail to sign up using email\n' + error.message);
            }
        )
    }
    else{
        window.alert("User is not signed in.");
    }
}

export default signOut;

