// default player colors


var player1Color = localStorage.getItem("player1color");
var player2Color = localStorage.getItem("player2color");

if (player1Color == null){
	player1Color = "blue";
}
if (player2Color == null){
	player2Color = "red";
	}	

//colorpicker
var player1Colorpicker = document.getElementById("player1color");
var player2Colorpicker = document.getElementById("player2color");
//players var for object
var playerLeft = null;
var playerRight = null;

var milisec = 0;
// can I shoot rn?
var shootPass = true;
// can I show end menu
var endMenuVisible = false;
//
var winner = "";


/*endMenu("2137")*/

//Player object
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
		var id = this.id()
		var player = document.querySelector(parentDiv);	

		document.querySelector("#"+this.id()).remove()
		player.insertAdjacentHTML("beforeend",replace(this.assets[0]));
		document.getElementById(id).style = "color: "+ this.color;

	}

	showKilled(parentDiv){
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

//when key pressed
document.addEventListener('keydown', function(event) {
	console.log(event.keyCode);
	//player left shot 16 ascii == shift
    if(event.keyCode == 16) {
  		if (!shootPass){
	    	winner = "left";
	    	shootPass = true;
	 	    
	 	    playerLeft.showShot("#playerLeft");
	    	playerRight.showKilled("#playerRight");
	    	
	    	milisec2 = Date.now() |0
			milisec = milisec2 - milisec;
			milisec = milisec.toString()
			
	    	colorButtons("leftButton", playerLeft.color, "pressed");
	    	endMenu(milisec);
    	}
    }
    // 13 ascii == enter
    else if(event.keyCode == 13) {
    	//player right shot
    	if (!shootPass){
	    	winner = "right";
	    	shootPass = true;
	    	
	    	playerRight.showShot("#playerRight");
	    	playerLeft.showKilled("#playerLeft");
	    	
	    	milisec2 = Date.now() |0
			milisec = milisec2 - milisec;
			milisec = milisec.toString()
			
	    	colorButtons("rightButton", playerRight.color, "pressed");
	    	endMenu(milisec);

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

//color picker events
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

playAgain.onclick = () =>{
	window.location.reload();

}

//updating players colors
player1Colorpicker.addEventListener('change', (event) => {
  	player1Color = player1Colorpicker.value;
  	
  	console.log(player1Color);
	document.querySelector("#player1").remove()
	
	playerLeft.delete("#menuPlayerLeft");
	playerLeft = new Player(playerOne, player1Colorpicker.value);
	playerLeft.showReady("#menuPlayerLeft");

	//adding color to the local storage of broweser
	localStorage.setItem("player1color",playerLeft.color);
	colorUpdate(1); 
});

player2Colorpicker.addEventListener('change', (event) => {
  	player2Color = player2Colorpicker.value;
	document.querySelector("#player2").remove()
	console.log(player2Color);
	
	playerRight.delete("#menuPlayerRight");
	playerRight = new Player(playerTwo, player2Colorpicker.value);
	playerRight.showReady("#menuPlayerRight");

	//adding color to the local storage of broweser
	localStorage.setItem("player2color",playerRight.color);
	colorUpdate(2); 
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


// after closing main menu (efter revolver clicked)
startGameTrigger.onclick = () =>{
	var node = document.getElementById("startMenu");
  	while (node.firstChild) {
    	node.removeChild(node.lastChild);
  	}
  	node.remove();

	showCowboys("#playerLeft", "#playerRight");
	
	var scene = document.querySelector(".scene");
	scene.style = "margin-top: -62vh;";

	counter();

}


function replaceKeyboard(key, colorChar){
	const colorBlink = document.querySelectorAll("#menuKeyboard");

	for(const color of colorBlink) {
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

	for(var i=0; i<= countdown.length; i++) {
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

function timeProcessing(time){

	if (time.length>3){
		switch (time.length){
			case 4:
				time2 = time.substring(0, 1) + "." + time.substring(1);
				time = time2;
				break;
			case 5:
				time = time.substring(0, 2) + "." + time.substring(2);
				break;	
			case 6:
				time = time.substring(0, 3) + "." + time.substring(3);
				break;	
		
		}
	time = time.substring(0,5);
	time += "s";
	}else{
		time += "ms";
	}
	return time;
}

function appearMenu(){
	var menu = document.querySelector(".endMenu");
	
	menu.classList.add("endMenuAppear");
	menu.style = "z-index: 11;";

	document.documentElement.style.setProperty("--endMenuColor", "#48ff48");
}

function showEndMenuImages(){
	var leftImg = document.getElementById("endMenuPlayer1");
	var rightImg = document.getElementById("endMenuPlayer2");

	if (winner == "right"){
		leftImg.insertAdjacentHTML("beforeend",replace(playerOne[4]));
		rightImg.insertAdjacentHTML("beforeend",replace(playerTwo[3]));
	}else if (winner == "left"){
		leftImg.insertAdjacentHTML("beforeend",replace(playerOne[3]));
		rightImg.insertAdjacentHTML("beforeend",replace(playerTwo[4]));
	}
	leftImg.style= "color: "+ playerLeft.color;
	rightImg.style = "color: "+playerRight.color;
}

function endMenu(time){

	time = timeProcessing(time);
	

	if (endMenuVisible == false) {
		console.log(time);
		endMenuVisible = true;
		var area = document.querySelector("#endMenuTimeShow");
		arr = Array();
		for(i=0;i<time.length;i++){
			if(time[i] == "."){
				area.insertAdjacentHTML("beforeend",replace(digits[10]));
			}else if(time[i] == "m"){
				area.insertAdjacentHTML("beforeend",replace(digits[11]));
			}else if(time[i] == "s"){
				area.insertAdjacentHTML("beforeend",replace(digits[12]));
			}else{
				area.insertAdjacentHTML("beforeend",replace(digits[time[i]]));
			}
		}

	appearMenu()
	showEndMenuImages()

	}
}


