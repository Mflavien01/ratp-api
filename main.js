var list = [];
var list2 = [];
var taille=0;
var taille2=0;
var mode=0;
function time(){
  var direction = document.getElementById("direction").value;
  var gare = document.getElementById("gare").value;

  var endpoint = ''.concat('https://api-ratp.pierre-grimaud.fr/v4/schedules/rers/b/',gare,'/',direction);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		console.log(this.responseText);
	}

};
xhr.open('GET', endpoint, true);
xhr.send();  
	
}
