firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // User is signed in.
    // document.getElementById("user").style.display = "block"; // user div nilalagayn nya ng style display block
    // document.getElementById("main").style.display = "none";
    window.location="index.html";
    console.log("BYE");

  } else if(user) {
    // No user is signed in.
    // window.location="login.php";
    // console.log("you");
  }
}); 
	
function logout(){
	// window.location="login.php";
	// firebase.auth().signOut();
	firebase.auth().signOut().then(function() {
  	console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
}


