  var app_fireBase = {};
  (function(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC6_68doXkpvtCPWttukvwSZmi-2qCBIi0",
      authDomain: "bantay-26ebe.firebaseapp.com",
      databaseURL: "https://bantay-26ebe.firebaseio.com",
      projectId: "bantay-26ebe",
      storageBucket: "bantay-26ebe.appspot.com",
      messagingSenderId: "76052840068"
    };
    firebase.initializeApp(config);

    app_fireBase = firebase;

  })()