import * as firebase from 'firebase/app';

// need to handle signing in two accounts without log out,
// currently overwrite
function emailSignIn() {
    var email = document.getElementById("sign_in_email").value;
    var password = document.getElementById("sign_in_psw").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            ()=>{
                window.alert('Login success!');
            }
        )
        .catch(
        function(error) 
        {
            console.log('signInWithEmailAndPassword failed. ' + 
                        'errorCode: ' + error.code + ' errorMessage: ' + error.message);

            window.alert('Error: Fail to sign in using email.' +
                            'Please check your email and password is correct.');
        }
    );

    
}
export default emailSignIn;