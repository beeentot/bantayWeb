$(document).ready(function(){

	var tBody = document.getElementById("tBody");

	var rowIndx = 0;

	var modalIndx = "modal";

	var urlRef = firebase.database().ref().child("/Rescue Requests/Deployed Rescue Requests/");

	urlRef.on("child_added", function(snapshot) 
	{
  	// snapshot.forEach(function(child) 
  	// {
  	// 	var test = "/Rescue Requests/Deployed Rescue Requests/"+child.key;
  	// 	var urlRef1 = firebase.database().ref().child(test);
  	// 	urlRef1.once("value").then(function(snapshot)
  	// 	{
  			var childKey = snapshot.key;

  			var row = tBody.insertRow(rowIndx);
  			var cellTime = row.insertCell(0);
  			var cellTimeDeployed = row.insertCell(1);
  			var cellFname = row.insertCell(2);
  			var cellLname = row.insertCell(3);
  			var cellCnum = row.insertCell(4);
  			var cellLoc = row.insertCell(5);
  			var cellLand = row.insertCell(6);
  			var cellNop = row.insertCell(7);
  			var cellVul = row.insertCell(8);
  			var cellSpec = row.insertCell(9);
  			var cellRes = row.insertCell(10);
  			var cellStat = row.insertCell(11);

  			var valSen = snapshot.child("requestSenior").val();
  			var valPwd = snapshot.child("requestPwd").val();
  			var valMed = snapshot.child("requestMedical").val();
  			var valOth = snapshot.child("requestOther").val();
  			var valInf = snapshot.child("requestInfant").val();

  			var bool = "";
  			var counter = 0;

  			if (valSen == "true" && counter == 0) {
  				bool = bool.concat("Senior Citizen");
  				counter ++;
  			} 
  			if (valPwd == "true" && counter == 0) {
  				bool = bool.concat("PWD");
                counter ++;
  			}
  			else if(valPwd == "true" && counter > 0){
  				bool = bool.concat(", PWD");
                counter ++;
  			}
  			if (valMed == "true" && counter == 0) {
  				bool = bool.concat("with Medical Conditions");
                counter ++;
  			}
            else if(valMed == "true" && counter > 0){
  				bool = bool.concat(", with Medical Conditions");
                counter ++;
  			}
  			if (valOth == "true" && counter == 0) {
  				bool = bool.concat("Other");
                counter ++;
  			}
            else if(valOth == "true" && counter > 0){
  				bool = bool.concat(", Other");
                counter ++;
  			}
  			if (valInf == "true" && counter == 0) {
  				bool = bool.concat("with Infant");
                counter ++;
  			}
            else if(valInf == "true" && counter > 0){
  				bool = bool.concat(", with Infant");
                counter ++;
  			}
            
  			var valFname = snapshot.child("requestFirstName").val();
  			var valLname = snapshot.child("requestLastName").val();
  			var valCnum = snapshot.child("requestContactNumber").val();
  			var valLoc = snapshot.child("requestLocation").val();
  			var valLand = snapshot.child("requestLandmarks").val();
  			var valNop = snapshot.child("requestPax").val();
  			var valVul = bool;
  			var valSpec = snapshot.child("requestSpecific").val();
  			var valRes = snapshot.child("rescueTeam").val();
  			var valAcknow = snapshot.child("rescueTeam").val();

  			var valTimestamp = snapshot.child("requestTimestamp").val();
  			var valAcknow = snapshot.child("requestDateTimeDeployed").val();

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

				//acknowledge TIMESTAMP
				var myAckDate = new Date(valAcknow);

				var myRescueResult = ((myAckDate.getMonth().toString().length > 1) ? (myAckDate.getMonth() + 1) : 
	  				('0' + (myAckDate.getMonth() + 1))) + '/' + ((myAckDate.getDate().toString().length > 1) ? myAckDate.getDate() :
	  				('0' + myAckDate.getDate())) + '/' + myAckDate.getFullYear();

	  			//TIME FORMAT 12 HOURS
				var ResHours = myAckDate.getHours();
				var ResMinutes = myAckDate.getMinutes();
				var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
				ResHours = ResHours % 12;
				ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
				ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
				var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	
	 		

  			cellTime.appendChild(document.createTextNode(result+" "+strTime ));
  			cellTimeDeployed.appendChild(document.createTextNode(myRescueResult+" "+ResStrTime));//timedeployed
  			cellFname.appendChild(document.createTextNode(valFname));
  			cellLname.appendChild(document.createTextNode(valLname));
  			cellCnum.appendChild(document.createTextNode(valCnum));
  			cellLoc.appendChild(document.createTextNode(valLoc));
  			cellLand.appendChild(document.createTextNode(valLand));
  			cellNop.appendChild(document.createTextNode(valNop));
  			cellVul.appendChild(document.createTextNode(valVul));
  			cellSpec.appendChild(document.createTextNode(valSpec));
  			cellRes.appendChild(document.createTextNode("Team " +valRes));

  			// var btn = document.createElement('input');

  			var btn = document.createElement('input');
			btn.setAttribute("type", "button");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#"+modalIndx+rowIndx);    
			btn.setAttribute("value", "Rescued");
			btn.id = childKey;
			btn.className = 'btn btn-success';

			// btn.onclick = function() { status(childKey); };
			// btn.onclick =  acknow;
			cellStat.appendChild(btn);

			var divModal = document.createElement("div");
			divModal.setAttribute("id", rowIndx);

			$("body").append(divModal);

			var header = "Confirmation";
			var content = "Change status to rescued?";
			// var strSubmitFunc = "acknow("+childKey+","+selectOpt+")";
			var btnText = "Yes";
			doModal(rowIndx, childKey, header, content, btnText, modalIndx);
  		

  			rowIndx = rowIndx + 1; 
  	// 	});
  	// });
	});
});


function status(key){

		var ref = firebase.database().ref("/Rescue Requests/Deployed Rescue Requests/"  +key);

		var strAck = Date.now();

		ref.child("/requestDateTimeRescued").set(strAck);//TimeRescued

	// var urlRef = firebase.database().ref("/Rescue Requests/Deployed Rescue Requests/");

	var urlRef2 = firebase.database().ref("/Rescue Requests/Reports/" +key);

	 ref.once('value', function(snap)  {
      urlRef2.set( snap.val(), function(error) {
           if( !error ) {  ref.remove(); }
           else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
     });

	window.alert("Resident rescued!");
	location.reload();
}



function doModal(placementId, modalId, heading, formContent, btnText, modalIndx)
{
	var div1 = document.createElement('div');
	div1.id = modalIndx+placementId;
	div1.className = 'modal fade';
	div1.setAttribute("role", "dialog");
	div1.setAttribute("tabindex", "-1"); 
	div1.setAttribute("aria-labelledby", "exampleModalLongTitle"); 
	div1.setAttribute("aria-hidden", "true");      

	var innerDiv1m = document.createElement('div');
	innerDiv1m.className = 'modal-dialog';
	innerDiv1m.setAttribute("role", "document");
	div1.appendChild(innerDiv1m);              

	var innerDiv2m = document.createElement('div');
	innerDiv2m.className = 'modal-content';
	innerDiv1m.appendChild(innerDiv2m);

	var innerDiv3 = document.createElement('div');
	innerDiv3.className = 'modal-header';
	innerDiv2m.appendChild(innerDiv3);


	var innerH5 = document.createElement('h5');
	innerH5.className = 'modal-title';
	var text = document.createTextNode("Confirmation");
	innerH5.appendChild(text);
	innerDiv3.appendChild(innerH5);

	var buttonM = document.createElement("button");
	buttonM.className = 'close';
	buttonM.setAttribute("data-dismiss", "modal");
	buttonM.setAttribute("aria-hidden", "true");
	buttonM.setAttribute("value", "Close");
	innerDiv3.appendChild(buttonM); 

	var innerDiv31 =  document.createElement('div');
	innerDiv31.className = 'modal-body';
	innerDiv2m.appendChild(innerDiv31);

	var innerH5Body = document.createElement('h5');
	var textOne = document.createTextNode("Change status to rescued?");
	innerH5Body.appendChild(textOne);
	innerDiv31.appendChild(innerH5Body);

	var innerDiv32 =  document.createElement('div');
	innerDiv32.className = 'modal-footer';
	innerDiv2m.appendChild(innerDiv32);

	var yesButton = document.createElement("input");
	yesButton.className = 'btn btn-danger';
	yesButton.setAttribute("type", "button");
	yesButton.setAttribute("value", "Yes");
	yesButton.onclick = function() { status(modalId); };
	innerDiv32.appendChild(yesButton);

	var closeButton = document.createElement("input");
	closeButton.className = 'btn btn-default';
	closeButton.setAttribute("data-dismiss", "modal");
	closeButton.setAttribute("type", "button");
	closeButton.setAttribute("value", "Close");
	innerDiv32.appendChild(closeButton);

	 $("#"+placementId).append(div1);

}