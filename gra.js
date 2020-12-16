var player1Color = "blue";
var player2Color = "red";
var playerLeft = document.querySelector("#playerLeft");
var playerRight = document.querySelector("#playerRight");

var milisec = 0;
var shotPass = false;
var timeOut = false;

colorButtons("leftButton", player1Color);
colorButtons("rightButton", player2Color);

document.addEventListener('keydown', function(event) {
	console.log(event.keyCode);
    if(event.keyCode == 16) {
    	//playerRight
    	playerShot(1);
    	shotPass = true;

    }
    else if(event.keyCode == 13) {
    	//playerLeft
    	playerShot(2);
    	shotPass = true;
    }
});

//INIT
window.onload = function() {
	
	showCowboys(1);
	replaceKeyboard("ENTR", "red");
	replaceKeyboard(" |^|", "#3095ff");

	
}
//
startGameTrigger.onclick = () =>{
	var node = document.getElementById("startMenu");
  	while (node.firstChild) {
    	node.removeChild(node.lastChild);
  	}
  	node.remove();
	showCowboys();
	cutdown();

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

function showCowboys(elem=null){
	if (elem==null){
		playerLeft = document.querySelector("#playerLeft");
		playerRight = document.querySelector("#playerRight");
	}else{
		playerLeft = document.querySelector("#menuPlayerLeft");
		playerRight = document.querySelector("#menuPlayerRight");
	}

	playerLeft.insertAdjacentHTML("beforeend",replace(playerOne[1]));
	playerRight.insertAdjacentHTML("beforeend",replace(playerTwo[1]));	

	document.getElementById("player1").style = "color: "+ player1Color;
	document.getElementById("player2").style = "color: "+ player2Color;

}

function cutdown(){
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
	  				timeOut = true;

					milisec = Date.now() |0
					console.log(milisec);
	  			}
	    }, 900 * i);
	  })(i);
	}
}

function afterCount(){
	document.querySelector("#player1").remove()
	document.querySelector("#player2").remove()

	playerLeft.insertAdjacentHTML("beforeend",replace(playerOne[0]));
	playerRight.insertAdjacentHTML("beforeend",replace(playerTwo[0]));	

	
}


function playerShot(player){

	var xD = Date.now() |0
	console.log(xD);
	milisec = xD - milisec
	
	

	if(player == 1){
		if(timeOut == true && shotPass == false){
			
			console.log("LSHIFT");

			document.querySelector("#player1").remove()
			document.querySelector("#player2").remove()

			playerLeft.insertAdjacentHTML("beforeend",replace(playerOne[0]));
			playerRight.insertAdjacentHTML("beforeend",replace(playerTwo[2]));
			
			document.getElementById("playerLeft").style = "color: "+ player1Color;
			document.getElementById("playerRight").style = "color: "+ player2Color;


			colorButtons("leftButton", player1Color, "pressed");

		}
	}else if(player == 2){
		if(timeOut == true && shotPass == false){

		console.log("enter");
		document.querySelector("#player1").remove();
		document.querySelector("#player2").remove();

		playerLeft.insertAdjacentHTML("beforeend",replace(playerOne[2]));
		playerRight.insertAdjacentHTML("beforeend",replace(playerTwo[0]));

		document.getElementById("playerLeft").style = "color: "+ player1Color;
		document.getElementById("playerRight").style = "color: "+ player2Color;
		
		colorButtons("rightButton", player2Color, "pressed");


		}

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

