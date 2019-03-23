$(document).ready(function(){	

	var arrRescteam = [];
	var arrCtrTeam = [];
	var arrCtr = 0;
	var urlRef3 = firebase.database().ref().child("/Rescue Team/");
	urlRef3.once("value", function(snapshot) 
	{
	snapshot.forEach(function(child) 
		{
			var temp = "";
			var rescuer = child.key;
			temp = rescuer;
			// console.log("test"+rescuer);

			arrRescteam[arrCtr] = temp;
			// console.log(arrRescuer);
			arrCtrTeam[arrCtr] = 1;
			arrCtr++; 
		});
	});
	viewRescuers(arrRescteam,arrCtrTeam);

	document.getElementById("form_addRescuer").addEventListener("submit",(e)=>{
	var name = document.getElementById("recipient_name").value;
	var designation = document.getElementById("recipient_designation").value;
	var team = document.getElementById("selectTeam").value;
	e.preventDefault();
	createTask(name,designation,team);
	form_addRescuer.reset();
	})


	var urlRef = firebase.database().ref().child("/Rescue Team/");
	urlRef.once("value", function(snapshot) 
	{
	snapshot.forEach(function(child) 
  	{
  		var childKey = child.key;
  		// console.log(childKey);

		var select = document.getElementById("selectTeam"),
	    opt = document.createElement("option");
		opt.value = childKey;
		opt.textContent = childKey;
		select.appendChild(opt);
    	});
	});
});



function createTask(name,designation,team){
	var postsRef = firebase.database().ref("/Rescuers/");
	var newPostRef = postsRef.child(name);
	newPostRef.set({
	name: name,
	designation: designation,
	team: team
	});
	window.alert("Rescuer " + name +" Added");
	location.reload();
}


function viewRescuers(arrRescteam,arrCtrTeam)
{
	var urlRef = firebase.database().ref().child("/Rescuers/");
	urlRef.once("value", function(snapshot) 
	{
	snapshot.forEach(function(child) 
  	{

  		var temp = "/Rescuers/"+child.key;
  		var urlRef4 = firebase.database().ref().child(temp);

  		urlRef4.once("value").then(function(snapshot)
  		{	
	  		var valTeam = snapshot.child("team").val();	
	  		// console.log(valTeam);
	  		for (var i = 0; i < arrRescteam.length; i++)
	  		{	

	  			if(valTeam == arrRescteam[i]){


	  				var table_team = document.getElementById(valTeam);

	  				var checkbox = document.createElement("input");

					checkbox.type = "checkbox";    // make the element a checkbox
					checkbox.name = "mycheckboxes";      // give it a name we can check on the server side
					checkbox.class = "form-check form-check-inline"
					checkbox.style.display='block';
					checkbox.id = child.key;

	  				var row = table_team.insertRow(arrCtrTeam[i]);
	  				var cellChckbox = row.insertCell(0);
	  				var cellName = row.insertCell(1);
		  			var cellDesignation = row.insertCell(2);

		  			cellChckbox.appendChild(checkbox);

		  			var valName = snapshot.child("name").val();
		  			var valDesignation = snapshot.child("designation").val();

		  			cellName.appendChild(document.createTextNode(valName));
		  			cellDesignation.appendChild(document.createTextNode(valDesignation));

		  			arrCtrTeam[i]++;

	  			}else
	  			{
	  				// console.log("!!!!");
	  			}
	  		}//end of for loop
  		});//end of url4
    });//end of snapshot	
	});//end of url
	// deleteRescuer("mycheckboxes");
	// console.log(deleteRescuer("mycheckboxes"));
}


// Pass the checkbox name to the function
function deleteRescuer(chkboxName) {
	var checkboxes = document.getElementsByName(chkboxName);
	var checkboxesChecked = [];
	// loop over them all
	for (var i=0; i<checkboxes.length; i++) 
	{
	// And stick the checked ones onto an array...
	if (checkboxes[i].checked) {
	var checked = checkboxes[i].id;
		checkboxesChecked.push(checked);
		}
	}
	console.log(checkboxesChecked);
	// Return the array if it is non-empty, or null 
	// return checkboxesChecked.length > 0 ? checkboxesChecked : null;


var arrCtr = 0;

for(var x=0; x<checkboxesChecked.length; x++){

	var urlRef = firebase.database().ref("/Rescuers/" + checkboxesChecked[x]);
	console.log("asas"+checkboxesChecked[x]);
	console.log("test"+urlRef);
	
	urlRef.remove();
	}

	window.alert("Remove success!!");
}


