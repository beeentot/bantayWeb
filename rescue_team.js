$(document).ready(function(){
	var ctr = 0;
	document.getElementById("form_addRescueTeam").addEventListener("submit",(e)=>{
	var team_name = document.getElementById("team_name").value;
	e.preventDefault();
	createRescueTeam(team_name);

	form_addRescueTeam.reset();
	//alert box for success after ok redirect ka sa page ng rescuer
  window.a
})
	viewTeam();


  document.getElementById("form_removeRescuer").addEventListener("submit",(e)=>{
  var team = document.getElementById("selectRemoveTeam").value;
  e.preventDefault();
  deleteRescueTeam(team);
  // console.log(team);
  })

  var urlRef = firebase.database().ref().child("/Rescue Team/");
  urlRef.once("value", function(snapshot) 
  {
  snapshot.forEach(function(child) 
    {
    var childKey = child.key;

    var select = document.getElementById("selectRemoveTeam"),
    opt = document.createElement("option");
    opt.value = childKey;
    opt.textContent = childKey;
    select.appendChild(opt);
      });
  });
});//ready

function createRescueTeam(team_name)
{
	var post_teamRef = firebase.database().ref("Rescue Team/");
	var new_teamRef = post_teamRef.child(team_name);
	console.log("test");
	new_teamRef.set({
	TeamName: team_name
	});

  window.alert("Team " + team_name +" Added!!!");
  location.reload();
}

function viewTeam()
{
	var urlRef = firebase.database().ref().child("/Rescue Team/");
	urlRef.once("value", function(snapshot) 
	{
	snapshot.forEach(function(child) 
  	{
  		var childKey = child.key;
  		// console.log(childKey);
  		var row;
  		var column;
  		var body;
  		var div = document.createElement('div');
  		var h2 = document.createElement('h2');
  		var tbl = document.createElement('table');

  		var tbody = document.createElement('tbody');
  		var tr = document.createElement('tr');
  		var td = document.createElement('td');

  		tbody.appendChild(tr);
  		tbl.appendChild(tbody);

  		var header = tbl.createTHead();

      tbl.id = childKey;
      tbl.setAttribute('class', 'table table-striped table-bordered');
      row = header.insertRow(0);

    	column0 = row.insertCell(0);
    	column1 = row.insertCell(1);
      column2 = row.insertCell(2);
    	h2.innerHTML = childKey;

    	column1.innerHTML = "Rescuer Name";
    	column2.innerHTML = "Designation";
    	document.getElementById("addtable").appendChild(h2);
    	document.getElementById("addtable").appendChild(tbl);
    	});
	});
}



function deleteRescueTeam(team) {
  urlRef = firebase.database().ref().child("/Rescue Team/" +team);
  urlRef.remove();

  window.alert("Team " + team +" Deleted!!!");
  location.reload();
}