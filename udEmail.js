function update_email(){
    var user = firebase.auth().currentUser;
    var newEmail = document.getElementById('newEmail').value;
    var oldPassword = document.getElementById('oldPass').value;

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

  user.updateEmail(newEmail).then(function() {
    window.alert("success");
  }).catch(function(error) {
    console.log(error);
  });
}