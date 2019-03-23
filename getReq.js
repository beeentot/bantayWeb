 $(document).ready(function(){

	var tBody = document.getElementById("tBody"); 

	var confirm = document.getElementById("confirm");

	var rowIndx = 0; 

	var modalIndx = "modal"; 

	var ctrRes = 0; 
	var ctrTime = 0; 
	var ctrChild_Changed = 0; 
	var added_Childkey = "";

	var childChanges = false; //

	var arrRescuer = []; //
	var arrCtr = 0;

	selectOptionRescuer(arrCtr,arrRescuer);

	// onChildAdded(urlRef,childChanges,ctrTime,rowIndx,arrRescuer,modalIndx,ctrChild_Changed);
	onValue(childChanges,ctrTime,rowIndx,arrRescuer,modalIndx,ctrChild_Changed,tBody);
});// end of onready


function onValue(childChanges,ctrTime,rowIndx,arrRescuer,modalIndx,ctrChild_Changed,tBody){

	var urlRef = firebase.database().ref().child("/Rescue Requests/New Rescue Requests/");
	
	urlRef.orderByChild('notPriority').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	$("#modal").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/New Rescue Requests/"+child.key;
	  		var urlRef1 = firebase.database().ref().child(test);

          	urlRef1.on("value", function(printSnapshot) 
	  		{

	  			var childKey = printSnapshot.key;

	  			var valSen = printSnapshot.child("requestSenior").val();
	  			var valPwd = printSnapshot.child("requestPwd").val();
	  			var valMed = printSnapshot.child("requestMedical").val();
	  			var valOth = printSnapshot.child("requestOther").val();
	  			var valInf = printSnapshot.child("requestInfant").val();

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
		           
	  			// var valTime = snapshot.child("requestDateTime").val();
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();

	  			var valRecTime = printSnapshot.child("receivedTimestamp").val();

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

				var dynamic = "";

				for(var i = 0; i<arrRescuer.length; i++)
				{
					dynamic += "<option value='"+arrRescuer[i]+"'>"+arrRescuer[i]+"</option>";
				}

				var selectOpt = "mySelect"+rowIndx;

				var styleRow = "";

				var valNot = printSnapshot.child("notPriority").val();
				var valUrgent = printSnapshot.child("urgentFlag").val();

				console.log(valUrgent);

				if (valNot == "false" && valUrgent == "1"){
					styleRow += "style='background-color: #ff7070;'"
				}else if(valNot == "false" && valUrgent == "0"){
					styleRow += "style='background-color: #fc6000;'"
				}else{
					styleRow += "style='background-color: #ccb4a7;'"
				}

	            $("#tBody").append("<tr id='"+childKey+"' "+styleRow+">"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + result +" "+strTime+"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric' style='width:25%;'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" +
					                "<select id='mySelect"+rowIndx+"' class='custom-select my-1 mr-sm-2'>"+
					                dynamic +
					                "</select></td>" +
									"<td class='mdl-data-table__cell--non-numeric'>"+
									"<input type='button' class='btn btn-danger' value='Acknowledge' data-toggle='modal' data-target='#"+modalIndx+""+rowIndx+"'/></td>");

	            var divModal = document.createElement("div");
				divModal.setAttribute("id", rowIndx);
				// document.body.appendChild(divModal);

				$("#modal").append(divModal);

				doModal(rowIndx, childKey, selectOpt, modalIndx);

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function doModal(placementId, modalId, selectOpt, modalIndx)
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
	var textOne = document.createTextNode("Are you sure you want to Acknowledge?");
	innerH5Body.appendChild(textOne);
	innerDiv31.appendChild(innerH5Body);

	var innerDiv32 =  document.createElement('div');
	innerDiv32.className = 'modal-footer';
	innerDiv2m.appendChild(innerDiv32);

	var yesButton = document.createElement("input");
	yesButton.className = 'btn btn-danger';
	yesButton.setAttribute("type", "button");
	yesButton.setAttribute("value", "Yes");
	yesButton.onclick = function() { acknow(modalId,selectOpt); };
	innerDiv32.appendChild(yesButton);

	var closeButton = document.createElement("input");
	closeButton.className = 'btn btn-default';
	closeButton.setAttribute("data-dismiss", "modal");
	closeButton.setAttribute("type", "button");
	closeButton.setAttribute("value", "Close");
	innerDiv32.appendChild(closeButton);

	 $("#"+placementId).append(div1);
}


function selectOptionRescuer(arrayCtr,arrRescuer){
	var urlRef2 = firebase.database().ref().child("/Rescue Team/");
	urlRef2.once("value", function(snapshot) 
	{
	snapshot.forEach(function(child) 
		{
			var temp = "";
			var rescuer = child.key;
			temp = rescuer;

			arrRescuer[arrayCtr] = temp;

			arrayCtr++; 
		});
	});
}

function acknow(key,selectOpt){
	console.log(key);
	console.log(selectOpt);

			var ref = firebase.database().ref("/Rescue Requests/New Rescue Requests/"  +key);

			var strAck = Date.now();

			ref.child("/requestDateTimeDeployed").set(strAck);

	// window.alert(key);
	var e = document.getElementById(selectOpt);
	// console.log(key);
	var strSel = e.options[e.selectedIndex].text;

	var urlRef = firebase.database().ref("/Rescue Requests/New Rescue Requests/" +key);

	urlRef.child("/rescueTeam").set(strSel);
	// ref1 = new Firebase("/Rescue Requests/New Rescue Requests/");
	var urlRef2 = firebase.database().ref("/Rescue Requests/Deployed Rescue Requests/" +key);

	urlRef.once('value', function(snap)  {
		urlRef2.set( snap.val(), function(error) {
		   if( !error ) {  urlRef.remove(); }
		   else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
		});
    });
	window.alert("Request Acknowledged");
	location.reload();
}