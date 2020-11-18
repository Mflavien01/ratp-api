var i=0;
var j=1;
var k=1;

var x = setInterval(function (){
  var direction = document.getElementById("direction").value;
  var gare = document.getElementById("gare").value;

  var endpoint = ''.concat('https://api-ratp.pierre-grimaud.fr/v4/schedules/rers/b/',gare,'/',direction);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		if (response.result.schedules[i].message[6]=="t" || response.result.schedules[i].message[5]=="v"){
			i++;
		}
		if (response.result.schedules[i+j].message[6]=="t" || response.result.schedules[i+j].message[5]=="v"){
			j++;
		}
		if (response.result.schedules[i+j+k].message[6]=="t" || response.result.schedules[i+j+k].message[5]=="v"){
			k++;
		}
		if(response.result.schedules[i+j+k].message==response.result.schedules[i+j].message){
			document.getElementById("horaire1").innerHTML= "".concat("Prochain passage à : ", response.result.schedules[i].message);
			document.getElementById("horaire2").innerHTML="".concat("2ème passage à : ", response.result.schedules[i+j].message);
			document.getElementById("horaire3").innerHTML="";
		}else{
			document.getElementById("horaire1").innerHTML= "".concat("Prochain passage à : ", response.result.schedules[i].message);
			document.getElementById("horaire2").innerHTML="".concat("2ème passage à : ", response.result.schedules[i+j].message);
			document.getElementById("horaire3").innerHTML="".concat("3ème passage à : ", response.result.schedules[i+j+k].message);
		}
	}

};
xhr.open('GET', endpoint, true);
xhr.send();  
},1000)
