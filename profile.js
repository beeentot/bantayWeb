 $(document).ready(function () {

  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      // User is signed in.
      var name, email, photoUrl, uid, emailVerified;

      user.providerData.forEach(function (profile) {

        document.getElementById("email_display").innerHTML = profile.email

      // document.getElementById("pass_display").innerHTML = profile.providerId

      // console.log("  Photo URL: " + profile.photoURL);
      });   
      
    } else {
      // User is signed out.
      // ...
    }

  });

  // var fileButton = document.getElementById('fileButton');

  // fileButton.addEventListener('change', function(e) {

  //   //get file
  //   var file = e.target.files[0];
  //   //create storage
  //   var storageRef = firebase.storage().ref('profilePic/' + file.name);

  //   //upload file
  //   storageRef.put(file);

  // });



  document.getElementById("form_about").addEventListener("submit",(e)=>{
  var text = document.getElementById("exampleFormControlTextarea1").value;
  e.preventDefault();
  saveAbout(text);

  window.alert('Edit success!');
  location.reload();
  })

  viewAbout();

  $imgSrc = $('#imgProfile').attr('src');
  function readURL(input) {

    if (input.files && input.files[0]) {
    var reader = new FileReader();

      reader.onload = function (e) {
        $('#imgProfile').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $('#btnChangePicture').on('click', function () {
    // document.getElementById('profilePicture').click();
    if (!$('#btnChangePicture').hasClass('changing')) {
      $('#profilePicture').click();
    }
      else {
      // change
    }
  });

  $('#profilePicture').on('change', function () {
    readURL(this);
    $('#btnChangePicture').addClass('changing');
    $('#btnChangePicture').attr('value', 'Confirm');
    $('#btnDiscard').removeClass('d-none');
  // $('#imgProfile').attr('src', '');
  });

  $('#btnDiscard').on('click', function () {
    // if ($('#btnDiscard').hasClass('d-none')) {
    $('#btnChangePicture').removeClass('changing');
    $('#btnChangePicture').attr('value', 'Change');
    $('#btnDiscard').addClass('d-none');
    $('#imgProfile').attr('src', $imgSrc);
    $('#profilePicture').val('');
  // }
  });
});


function saveAbout(text) 
{
  var post_Aboout = firebase.database().ref("Notes/");
  post_Aboout.set({
  notes: text 
  });
}

function viewAbout() 
{
  var ref = firebase.database().ref().child("/Notes/");
  ref.once("value", function(snapshot) 
  {
  snapshot.forEach(function(child) 
    {
      var childKey = child.val();
      // console.log(childKey);
      document.getElementById("about").innerHTML = childKey;

      });
  });
}


