import * as firebase from 'firebase/app';

function resetPsw(emailAddress) {
    var auth = firebase.auth();    
    // var emailAddress = document.getElementById("reset_psw_email").value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        window.alert("password reset email sent.")
    }).catch(function(error) {
        window.alert('Failed to sent password reset email.\n' + error.message);
    });
}
export default resetPsw;