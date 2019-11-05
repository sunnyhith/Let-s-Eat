import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../config/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

function emailSignUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            function(result){
                result.user.updateProfile(
                {
                  displayName: firstName + ' ' + lastName
                })
                window.alert('Create account success!');
                window.alert('Welcome! ' + firstName + ' ' + lastName);
            }
        )
        .catch(
            function(error) 
            {
                console.log('createUserWithEmailAndPassword failed. ' + 
                            'errorCode: ' + error.code + ' errorMessage: ' + error.message);
                window.alert('Fail to sign up using email.\n' + error.message );
            }
        )
};

export default emailSignUp;