// firebase.auth().onAuthStateChanged(function(user) {
//   if (!user) {
//     // User is signed in.
//     console.log("BYE");

//   } else if(user) {
//     // No user is signed in.
//     // window.location="login.php";
//     console.log("you");
//   }
// });
	
function resetPass(){
  var userEmail = document.getElementById("email").value;

  firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
    // Email sent.
    window.alert("Password Reset Email Sent!");
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email'){
      window.alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found'){
      window.alert(errorMessage)
    }
    console.log(error);
  });
};