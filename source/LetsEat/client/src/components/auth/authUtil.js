import * as firebase from 'firebase/app';

var emailSignIn = () => {
    var email = document.getElementById("sign_in_email").value;
    var password = document.getElementById("sign_in_psw").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
        }).catch(
        (error) => {
            console.log('signInWithEmailAndPassword failed. ' + 
                        'errorCode: ' + error.code + ' errorMessage: ' + error.message);
            window.alert('Error: Fail to sign in using email.' +
                            'Please check your email and password is correct.');
        }
    );   
  }

var signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(
            (result)  => {
                var isNewUser = result.additionalUserInfo.isNewUser;
                if (isNewUser) {
                window.alert('User has not yet regitsered.');
                }
                else{
                window.alert('Welcome back! ' + result.user.displayName);
                }
            }
        )
        .catch(
            (error) => {
                console.log('Fail to sign in using Google account.')
            }
        );
}

var signOut = () => {
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

export {
    emailSignIn,
    signInWithGoogle,
    signOut
};