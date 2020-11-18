var x = setInterval(function (){
  var direction = document.getElementById("direction").value;
  var gare = document.getElementById("gare").value;

  var endpoint = ''.concat('https://api-ratp.pierre-grimaud.fr/v4/schedules/rers/b/',gare,'/',direction);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		var i=0;
		if (response.result.schedules[i].message="Train terminus V.A" || response.result.schedules[i].message="Sans voyageurs V.A"){
			i++;
		}
		document.getElementById("horaire1").innerHTML=response.result.schedules[i].message;
	}

};
xhr.open('GET', endpoint, true);
xhr.send();  
},1000)
