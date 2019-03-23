$(document).ready(function(){

	var tBody = document.getElementById("tBody");

	var rowIndx = 0;

	// var rootRef = firebase.database.ref();
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	// var test = urlRef
	// console.log("test"+urlRef);

	onValue(tBody, rowIndx, urlRef);

	document.getElementById("searchFunction").addEventListener("submit",(e)=>{
		var search = document.getElementById("search").value;
		e.preventDefault();
		searchFunction(search);
	})
});


function onValue(tBody, rowIndx, urlRef){

	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('notVulnerable').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}


function searchFunction(search){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");


	urlRef.orderByChild('requestFirstName').startAt(search).endAt(search+"\uf8ff").on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;
  			
  			console.log(printSnapshot.val());	

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
	  		var urlRef1 = firebase.database().ref().child(test);

	  		console.log("TEST 1");

          	urlRef1.on("value", function(printSnapshot) 
	  		{
	  			console.log(printSnapshot.val());
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef

}

function submitName(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestFirstName').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}


function submitNum() {
		var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestContactNumber').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitLoc(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestLocation').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitLand(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestLandmarks').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef

}

function submitNo(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestPax').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef

}

function submitVul(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('notVulnerable').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitSpec(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestSpecific').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef

}

function submitRes(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('rescueTeam').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitReceived(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestTimestamp').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitDep(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestDateTimeDeployed').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}

function submitRescued(){
	var urlRef = firebase.database().ref().child("/Rescue Requests/Reports/");
	
	urlRef.orderByChild('requestDateTimeRescued').on("value", function(printSnapshot) 
    {
    	$("#tBody").empty();
    	rowIndx = 0;

	  	printSnapshot.forEach(function(child) 
	  	{
	  		var test = "/Rescue Requests/Reports/"+child.key;
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
		           
	  			var valFname = printSnapshot.child("requestFirstName").val();
	  			var valLname = printSnapshot.child("requestLastName").val();
	  			var valCnum = printSnapshot.child("requestContactNumber").val();
	  			var valLoc = printSnapshot.child("requestLocation").val();
	  			var valLand = printSnapshot.child("requestLandmarks").val();
	  			var valNop = printSnapshot.child("requestPax").val();
	  			var valVul = bool;
	  			var valSpec = printSnapshot.child("requestSpecific").val();
	  			var valRes = printSnapshot.child("rescueTeam").val();
	  			// var valReceived = snapshot.child("requestDateTime").val();

	  			console.log(valFname);

	  			var valTimestamp = printSnapshot.child("requestTimestamp").val();
	  			var valDeploy = printSnapshot.child("requestDateTimeDeployed").val();

	  			var valRescued = printSnapshot.child("requestDateTimeRescued").val();

				//REQUEST TIME STAMP	
		  			var myRequestDate = new Date(valTimestamp);

		  			//YEAR FORMAT MM/DD/YY
		  			var myRequestResult = ((myRequestDate.getMonth().toString().length > 1) ? (myRequestDate.getMonth() + 1) : 
		  				('0' + (myRequestDate.getMonth() + 1))) + '/' + ((myRequestDate.getDate().toString().length > 1) ? myRequestDate.getDate() :
		  				('0' + myRequestDate.getDate())) + '/' + myRequestDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var RecHours = myRequestDate.getHours();
					var RecMinutes = myRequestDate.getMinutes();
					var RecAmPm = RecHours >= 12 ? 'PM' : 'AM';
					RecHours = RecHours % 12;
					RecHours = RecHours ? RecHours : 12; // the hour '0' should be '12'
					RecMinutes = RecMinutes < 10 ? '0'+RecMinutes : RecMinutes;
					var RecStrTime = RecHours + ':' + RecMinutes + ' ' + RecAmPm;

				//DELPLOY TIME STAMP	
		  			var myDeployDate = new Date(valDeploy);

		  			//YEAR FORMAT MM/DD/YY
		  			var myDeployResult = ((myDeployDate.getMonth().toString().length > 1) ? (myDeployDate.getMonth() + 1) : 
		  				('0' + (myDeployDate.getMonth() + 1))) + '/' + ((myDeployDate.getDate().toString().length > 1) ? myDeployDate.getDate() :
		  				('0' + myDeployDate.getDate())) + '/' + myDeployDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var depHours = myDeployDate.getHours();
					var depMinutes = myDeployDate.getMinutes();
					var depAmPm = depHours >= 12 ? 'PM' : 'AM';
					depHours = depHours % 12;
					depHours = depHours ? depHours : 12; // the hour '0' should be '12'
					depMinutes = depMinutes < 10 ? '0'+depMinutes : depMinutes;
					var depStrTime = depHours + ':' + depMinutes + ' ' + depAmPm;

				//RESCUED TIMESTAMP
					var myRescueDate = new Date(valRescued);

					var myRescueResult = ((myRescueDate.getMonth().toString().length > 1) ? (myRescueDate.getMonth() + 1) : 
		  				('0' + (myRescueDate.getMonth() + 1))) + '/' + ((myRescueDate.getDate().toString().length > 1) ? myRescueDate.getDate() :
		  				('0' + myRescueDate.getDate())) + '/' + myRescueDate.getFullYear();

		  			//TIME FORMAT 12 HOURS
					var ResHours = myRescueDate.getHours();
					var ResMinutes = myRescueDate.getMinutes();
					var ResAmPm = ResHours >= 12 ? 'PM' : 'AM';
					ResHours = ResHours % 12;
					ResHours = ResHours ? ResHours : 12; // the hour '0' should be '12'
					ResMinutes = ResMinutes < 10 ? '0'+ResMinutes : ResMinutes;
					var ResStrTime = ResHours + ':' + ResMinutes + ' ' + ResAmPm;	


	            $("#tBody").append("<tr id='"+childKey+"'>"+
					                "<td class='mdl-data-table__cell--non-numeric'>" + valFname +" "+valLname+ "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valCnum +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valLoc +"</td>" +
					               	"<td class='mdl-data-table__cell--non-numeric'>" + valLand +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valNop +"</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valVul + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'>" + valSpec + "</td>" +
					                "<td class='mdl-data-table__cell--non-numeric'> Team " + valRes + "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRequestResult +" "+RecStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myDeployResult +" "+depStrTime+ "</td>" +
									"<td class='mdl-data-table__cell--non-numeric'>" + myRescueResult +" "+ResStrTime+ "</td>");

				rowIndx = rowIndx + 1;		
		  	});//end of url 1 
	  	});//end of printSnapshot
	});//end of urlRef
}