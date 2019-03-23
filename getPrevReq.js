$(document).ready(function(){

	var tBody = document.getElementById("tBody");

	var rowIndx = 0;

  var ctr = 0;

  onChildAdded(tBody,rowIndx);
});//END OF READY

function onChildAdded(tBody,rowIndx){
    var valueRef = firebase.database().ref().child("/Rescue Requests/New Rescue Requests/");
    valueRef.orderByChild('requestLandmarks').on("value", function(printSnapshot) 
    {
      $("#tBody").empty();

      printSnapshot.forEach(function(child) 
      {

        var test = "/Rescue Requests/New Rescue Requests/"+child.key;
        var urlRef1 = firebase.database().ref().child(test);

          urlRef1.on("value", function(printSnapshot) 
          {
            // console.log(printSnapshot.key);
            var childKey = printSnapshot.key;
            var valTimestamp = printSnapshot.child("requestTimestamp").val();

            var myDate = new Date(valTimestamp);

              //YEAR FORMAT MM/DD/YY
              var result = ((myDate.getMonth().toString().length > 1) ? (myDate.getMonth() + 1) : 
              ('0' + (myDate.getMonth() + 1))) + '/' + ((myDate.getDate().toString().length > 1) ? myDate.getDate() :
              ('0' + myDate.getDate())) + '/' + myDate.getFullYear();

              //TIME FORMAT 12 HOURS 
              var hours = myDate.getHours();
              var minutes = myDate.getMinutes();
              var ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var strTime = hours + ':' + minutes + ' ' + ampm;

            var valFname = printSnapshot.child("requestFirstName").val();
            var valLname = printSnapshot.child("requestLastName").val();
            var valLoc = printSnapshot.child("requestLocation").val();

            $("#tBody").append("<tr data-id='"+childKey+"'>"+
                                "<td class='mdl-data-table__cell--non-numeric'>" + result +" "+strTime+"</td>" +
                                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+"</td>" +
                                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc + "</td>");
          });//END OF URLREF1
      });//END OF printSnapshot
    });//END OF ValueRef ON CHILD ADDED
}
