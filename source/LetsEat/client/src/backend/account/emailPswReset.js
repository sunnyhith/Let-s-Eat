import * as firebase from "firebase/app";

function resetPsw(emailAddress) {
  var auth = firebase.auth();
  // var emailAddress = document.getElementById("reset_psw_email").value;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function() {
      window.alert("Password reset email sent. Please check your inbox");
    })
    .catch(function(error) {
      window.alert("Failed to send password reset email.\n" + error.message);
    });
}
export default resetPsw;
