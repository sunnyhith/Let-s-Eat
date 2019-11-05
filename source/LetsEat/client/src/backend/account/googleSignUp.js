import * as firebase from 'firebase/app';

function signUpWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider)
    .then(
      function(result) 
      {
        var isNewUser = result.additionalUserInfo.isNewUser;
        if (!isNewUser) {
          window.alert('Fail to create new account.' +
                        'The account' + result.user.displayName + 'is used already!');
        }
        else{
          window.alert('Account created! Welcome ' + result.user.displayName);
        }
     }
    )
    .catch(
      function(error)
      {
        console.log('Fail to create account using Google account.')
      }
    );
}

export default signUpWithGoogle;