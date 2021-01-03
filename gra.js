// default player colors
var player1Color = "pink";
var player2Color = "yellow";
readColorCookie();
var player1Colorpicker = document.getElementById("player1color");
var player2Colorpicker = document.getElementById("player2color");
//players var for object
var playerLeft = null;
var playerRight = null;

var milisec = 0;
// can I shoot rn?
var shootPass = true;
//
var endMenuVisible = false;


function readColorCookie(){
	var x = document.cookie;
	console.log(x);
	console.log(x);

}

class Player{
	color = null;
	assets = null;


	constructor(assets, color){
		this.color = color;
		this.assets = assets;	
		return true
	}

	id(){
		var start = this.assets[1].indexOf('id="')+4;
		var end = this.assets[1].indexOf('>')-1;
		var id = this.assets[1].substring(start, end);
		return id;
	}
	showReady(parentDiv){

		var player = document.querySelector(parentDiv);

		if (player.childNodes["length"] > 1){
			return false
		}	
		player.insertAdjacentHTML("beforeend",replace(this.assets[1]));	
		document.getElementById(this.id()).style = "color: " + this.color;
		
	}
	showShot(parentDiv){
			//Player.showShot("#playerRight"); to run propertly
		var id = this.id()
		var player = document.querySelector(parentDiv);	

		document.querySelector("#"+this.id()).remove()
		player.insertAdjacentHTML("beforeend",replace(this.assets[0]));
		document.getElementById(id).style = "color: "+ this.color;


	}
	showKilled(parentDiv){
			//Player.showShot("#playerRight"); to run propertly
		var id = this.id()
		var player = document.querySelector(parentDiv);
		
		document.querySelector("#"+this.id()).remove()

		player.insertAdjacentHTML("beforeend",replace(this.assets[2]));
		document.getElementById(id).style = "color: "+ this.color;
			

	}
	delete(parentDiv){
		var node = document.querySelector(parentDiv);
	  	while (node.lastChild) {
	    	node.removeChild(node.lastChild);
	  	}


	}

}




document.addEventListener('keydown', function(event) {
	console.log(event.keyCode);

    if(event.keyCode == 16) {
  		if (!shootPass){
	 	    playerLeft.showShot("#playerLeft");
	    	playerRight.showKilled("#playerRight");
	    	colorButtons("leftButton", playerLeft.color, "pressed");
	    	shootPass = true;
			insertTime("2.137");
    	}

    }
    else if(event.keyCode == 13) {
    	if (!shootPass){
	    	playerRight.showShot("#playerRight");
	    	playerLeft.showKilled("#playerLeft");
	    	colorButtons("rightButton", playerRight.color, "pressed");
	    	shootPass = true;
	    	insertTime("2.137");


    	}
    }

});

//INIT
window.onload = function() {
	
	playerLeft = new Player(playerOne, player1Color);
	playerRight = new Player(playerTwo, player2Color);
	colorButtons("leftButton", player1Color);
	colorButtons("rightButton", player2Color);
	document.getElementById("menuPlayerLeftPre").style = "color: "+ player1Color+"; float: left;";
	document.getElementById("menuPlayerRightPre").style = "color: "+ player2Color+"; float: right;";



	showCowboys("#menuPlayerLeft","#menuPlayerRight");
	replaceKeyboard("ENTR", player2Color);
	replaceKeyboard(" |^|", player1Color);

	
}

//color picker

menuPlayerLeftPre.onclick = () =>{
	var inp = document.getElementById("player1color");
	inp.focus();
	inp.click();

	player1Color = inp.value
}
menuPlayerRightPre.onclick = () =>{
	var inp = document.getElementById("player2color");
	inp.focus();
	inp.click();

	player1Color = inp.value
}





player1Colorpicker.addEventListener('change', (event) => {
  	player1Color = player1Colorpicker.value;
	document.querySelector("#player1").remove()
	
	playerLeft.delete("#menuPlayerLeft");
	playerLeft = new Player(playerOne, player1Colorpicker.value);
	playerLeft.showReady("#menuPlayerLeft");

	colorUpdate(1); 

	//document.cookie = "player1Color="+ player1color+"; player2color="+player2color+";";
	document.cookie = "player1Color="+ player1color+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";



});


player2Colorpicker.addEventListener('change', (event) => {
  	player2Color = player2Colorpicker.value;
	document.querySelector("#player2").remove()
	
	playerRight.delete("#menuPlayerRight");
	playerRight = new Player(playerTwo, player2Colorpicker.value);
	playerRight.showReady("#menuPlayerRight");

	colorUpdate(2); 
	//document.cookie = "player1Color="+ player1color+"; player2color="+player2color+";";
	document.cookie = "player2Color="+ player2color+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

function colorUpdate(player){
	if(player == 1 ){
	replaceKeyboard(" |^|", player1Color);
	document.getElementById("menuPlayerLeftPre").style = "color: "+ player1Color+"; float: left;";
	colorButtons("leftButton", player1Color);
}else{
	replaceKeyboard("ENTR", player2Color);
	document.getElementById("menuPlayerRightPre").style = "color: "+ player2Color+"; float: right;";
	colorButtons("rightButton", player2Color);
}
}



// after closing menu
startGameTrigger.onclick = () =>{
	var node = document.getElementById("startMenu");
  	while (node.firstChild) {
    	node.removeChild(node.lastChild);
  	}
  	node.remove();
	showCowboys("#playerLeft", "#playerRight");
	counter();

}


function replaceKeyboard(key, colorChar){
	const colorBlink = document.querySelectorAll("#menuKeyboard");

	for (const color of colorBlink) {
	  color.innerHTML = color.innerHTML
	    .replaceAll(key, '<span class="blinker" style="color: '+ colorChar+';">'+ key+'</span>');
	}
}


function replace(str){
	str = str.replaceAll("*","`");
	str = str.replaceAll("%","'");

	return str;
}

function showCowboys(div1, div2){
	playerLeft.showReady(div1);
	playerRight.showReady(div2);

}

function counter(){
	var count = document.querySelector("#countdown");

	for (var i=0; i<= countdown.length; i++) {
	  (function(i) {
	    setTimeout(function() { 
	    	 try{
				document.querySelector(".count").remove();
			}catch{
				
			}
				count.insertAdjacentHTML("beforeend",replace(countdown[countdown.length-i]));
	  			if(countdown.length == i){
	  				shootPass = false;
					milisec = Date.now() |0
					console.log(milisec);
	  			}
	    }, 900 * i);
	  })(i);
	}
}


function colorButtons(buttnId, color, status=0){

	var btn = document.getElementById(buttnId)
	
	if(status){
		btn.style = "color: black";
		btn.style = "background-color: "+ color;
	}else{
		btn.style = "color: "+ color;
	}

}


function insertTime(time){

	if (endMenuVisible == false) {
	console.log(time);
		endMenuVisible = true;
		var area = document.querySelector("#endMenuTimeShow");
		arr = Array();
		for(i=0;i<time.length;i++){
			if(time[i] != "."){
				area.insertAdjacentHTML("beforeend",replace(digits[time[i]]));
			}else{
				area.insertAdjacentHTML("beforeend",replace(digits[10]));
			}
		}

		var menu = document.querySelector(".endMenu")
		menu.classList.add("endMenuAppear");
		menu.style = "z-index: 11;";
		document.documentElement.style.setProperty("--endMenuColor", "#48ff48");
		console.log("arr");


	}
}




