
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("TESTTS");
    // User is signed in.
    window.location="home.html";
    console.log("TESTTS");


  } else {
    // No user is signed in.
    console.log("No auth");
  }
});

function login(){
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  // console.log("TESTTS");
  console.log(userEmail);
  if (userEmail.lastIndexOf("rescue") >= 0){
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      window.alert("Error: "  + errorMessage);
    });

  } else{
    window.alert("No user found");
  }
}





