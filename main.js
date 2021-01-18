var i=0;
var j=1;
var storage=false;
var direct=""

function testStorage() {
    if (localStorage.length>1){
	    document.getElementById("directionSelect").value=localStorage.getItem("direction");
	    document.getElementById("gareSelect").value=localStorage.getItem("gare");
	    storage=true;
	}else {
		var direction = document.getElementById("directionSelect").value;
 		var gare = document.getElementById("gareSelect").value;
		storage=true;
	}
}

function compteARebours(textIn, now){
	var textOut;
	textIn=String(textIn);
	if (isNaN(parseInt("".concat(textIn[0], textIn[1])))){
		textOut=textIn;
		return textOut;
	}else {
		var heure=parseInt("".concat(textIn[0], textIn[1]));
		var minute=parseInt("".concat(textIn[3], textIn[4]));
		var heureTrain=new Date(Date.now());
		heureTrain.setHours(heure, minute, 00);
		var time=heureTrain.getTime()-now.getTime();
		var time = Math.floor(time / (1000 * 60));
		var voie="";
		if(textIn[6]=== undefined){
			textOut="".concat(time, " min ");
		}else{
			for (let i = 5; i < 20; i++) {
				if(textIn[i]!==undefined){
					voie+=textIn[i];
				}
			}
			textOut="".concat(time, " min ", voie);
		}
		return textOut;
	}

}

var x = setInterval(function (){
	if (innerHeight>800){
		document.body.style.height="".concat(innerHeight,"px");
	}
	var direction = document.getElementById("directionSelect").value;
 	var gare = document.getElementById("gareSelect").value;
 	var unite = document.getElementById("uniteSelect").value;
	if (storage==true){
		localStorage.setItem("direction",direction);
		localStorage.setItem("gare",gare);
	}

  var endpoint = ''.concat('https://api-ratp.pierre-grimaud.fr/v4/schedules/rers/b/',gare,'/',direction);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		if (response.result.schedules[i].message[6]=="t" || response.result.schedules[i].message[0]=="s"){
			i++;
		}
		if (response.result.schedules[i+j].message[6]=="t" || response.result.schedules[i+j].message[0]=="s"){
			j++;
		}
		if (response.result.schedules[i].code == "EMAL" || response.result.schedules[i].code == "EMOI" || response.result.schedules[i].code == "EVAL" ||response.result.schedules[i].code == "EVOL" ||response.result.schedules[i].code == "IHOP" ||response.result.schedules[i].code == "PAKE" ||response.result.schedules[i].code == "PAPO" ||response.result.schedules[i].code == "PCIL"){
			direct1="train direct";
		}
		else{
			direct1="train omnibus";
		}
		if (response.result.schedules[i+j].code == "EMAL" || response.result.schedules[i+j].code == "EMOI" || response.result.schedules[i+j].code == "EVAL" ||response.result.schedules[i+j].code == "EVOL" ||response.result.schedules[i+j].code == "IHOP" ||response.result.schedules[i+j].code == "PAKE" ||response.result.schedules[i+j].code == "PAPO" ||response.result.schedules[i+j].code == "PCIL"){
			direct2="train direct";
		}
		else{
			direct2="train omnibus";
		}
		if (response.result.schedules[i+j+1].code == "EMAL" || response.result.schedules[i+j+1].code == "EMOI" || response.result.schedules[i+j+1].code == "EVAL" ||response.result.schedules[i+j+1].code == "EVOL" ||response.result.schedules[i+j+1].code == "IHOP" ||response.result.schedules[i+j+1].code == "PAKE" ||response.result.schedules[i+j+1].code == "PAPO" ||response.result.schedules[i+j+1].code == "PCIL"){
			direct3="train direct";
		}
		else{
			direct3="train omnibus";
		}
		// pour les minute
		if (unite=="min"){
			document.getElementById("horaire1").innerHTML= "".concat("<u>Prochain passage :</u> <b>", compteARebours(response.result.schedules[i].message, new Date (response._metadata.date)),"</b>, <i>", direct1, "</i>");
			document.getElementById("horaire2").innerHTML="".concat("<u>2ème passage :</u> <b>", compteARebours(response.result.schedules[i+j].message, new Date (response._metadata.date)),"</b>, <i>", direct2, "</i>");
			document.getElementById("horaire3").innerHTML="".concat("<u>3ème passage :</u> <b>", compteARebours(response.result.schedules[i+j+1].message, new Date (response._metadata.date)),"</b>, <i>", direct3, "</i>");
		}
		
		if (unite=="heure"){
			document.getElementById("horaire1").innerHTML= "".concat("<u>Prochain passage :</u> <b>", response.result.schedules[i].message,"</b>, <i>", direct1, "</i>");
			document.getElementById("horaire2").innerHTML="".concat("<u>2ème passage :</u> <strong>", response.result.schedules[i+j].message,"</strong>, <i>", direct2, "</i>");
			document.getElementById("horaire3").innerHTML="".concat("<u>3ème passage :</u> <b>", response.result.schedules[i+j+1].message,"</b>, <i>", direct3, "</i>");
		}
	
	}

};
xhr.open('GET', endpoint, true);
xhr.send();  
		
if (window.screen.width > window.screen.height){
	document.body.style.backgroundImage = "url(train.jpg)";
	document.getElementById("dirLabel").style.fontSize="20px";
	document.getElementById("directionSelect").style.fontSize="20px";
	document.getElementById("gareLabel").style.fontSize="20px";
	document.getElementById("gareSelect").style.fontSize = "20px";
	document.getElementById("titre").style.fontSize = "50px";
	document.getElementById("gares").style.width = "30%";
	document.getElementById("reponses").style.width = "40%";
	document.getElementById("content").style.display ="flex";
	document.getElementById("content").style.textAlign ="center";
	document.getElementById("horaire1").style.fontSize="25px";
	document.getElementById("horaire2").style.fontSize="25px";
	document.getElementById("horaire3").style.fontSize="25px";
	document.getElementById("titre").style.marginLeft = "30%";
	document.getElementById("titre").style.marginRight = "30%";
	document.getElementById("lien").style.whidth = "25%";
	document.getElementById("lien").style.fontSize = "16px";
	document.getElementById("br").innerHTML = "";
	document.getElementById("content").style.marginLeft = null;
	document.getElementById("content").style.marginRight = null;
} else{
	document.body.style.backgroundImage = "url(train_tel.jpg)";
	document.getElementById("dirLabel").style.fontSize="60px";
	document.getElementById("unite").style.fontSize="60px" ;
	document.getElementById("directionSelect").style.fontSize="45px";
	document.getElementById("uniteSelect").style.fontSize="45px";
	document.getElementById("gareLabel").style.fontSize="60px";
	document.getElementById("titre").style.fontSize = "80px";
	document.getElementById("gareSelect").style.fontSize = "45px";
	document.getElementById("reponses").style.fontSize = "60px";
	document.getElementById("content").style.display ="block";
	document.getElementById("content").style.textAlign ="center";
	document.getElementById("gares").style.width = "80%";
	document.getElementById("reponses").style.width = "80%";
	document.getElementById("horaire1").style.fontSize="60px";
	document.getElementById("horaire2").style.fontSize="60px";
	document.getElementById("horaire3").style.fontSize="60px";
	document.getElementById("titre").style.marginLeft = "5%";
	document.getElementById("titre").style.marginRight = "5%";
	document.getElementById("lien").style.whidth = "30%";
	document.getElementById("lien").style.fontSize = "24px";
	document.getElementById("br").innerHTML = "<br><br><br><br>";
	document.getElementById("content").style.marginLeft = "10%";
}
}, 1000)
