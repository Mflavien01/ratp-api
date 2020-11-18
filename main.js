var i=0;
var j=1;

var y = setInterval(function() {
	if (innerHeight>800){
		document.body.style.height="".concat(innerHeight,"px");
	}
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
		document.getElementById("horaire1").innerHTML= "".concat("Prochain passage à : ", response.result.schedules[i].message);
		document.getElementById("horaire2").innerHTML="".concat("2ème passage à : ", response.result.schedules[i+j].message);
		document.getElementById("horaire3").innerHTML="".concat("3ème passage à : ", response.result.schedules[i+j+1].message);
	}

};
xhr.open('GET', endpoint, true);
xhr.send();  
//localStorage.setItem("direction",direction);
//localStorage.setItem("gare",gare);
},1000)

if (window.screen.width > window.screen.height){
	document.body.style.backgroundImage = "url(train.jpg)";
	document.getElementById("content").style.display=="";
	document.getElementById("content").style.align-items=="";
	document.getElementById("content").style.justify-content=="";
} else{
	document.body.style.backgroundImage = "url(train_tel.jpg)";
	document.getElementById("content").style.display==flex;
	document.getElementById("content").style.align-items==center;
	document.getElementById("content").style.justify-content==space-between;
}	
})
