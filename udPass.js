function update_password(){
  var user = firebase.auth().currentUser;
  var oldPassword = document.getElementById('oldPass').value;
  var newPassword = document.getElementById('newPass').value;

  var credentials = firebase.auth.EmailAuthProvider.credential(
  user.email,
  oldPassword
);

// Prompt the user to re-provide their sign-in credentials
  user.reauthenticateAndRetrieveDataWithCredential(credentials).then(function() {
    //success
  }).catch(function(error) {
    console.log(error);
  });

  user.updatePassword(newPassword).then(function() {
    window.alert("Password Changed!!");
  }).catch(function(error) {
    console.log(error);
  });
}

