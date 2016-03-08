
var canvasVar = '<canvas width="400" id="myCanvas" height="450" style="overflow:hidden;"></canvas>';
// var canvasVar = $('<canvas/>',{'width':100,'height':200,'class':'radHuh'});
//document.body.appendChild(canvas);
//      <canvas width="400" id="myCanvas" height="450" style="overflow:hidden;"></canvas>

var output;
var outputSave;
var currentGame="0";
var currentGameType="0";

var firstTimeRun=false;

 //var screenWidth=window.innerWidth;
 //var screenHeight=window.innerHeight;
 var screenWidth = $(window).width();
var screenHeight = $(window).height();
var myMedia = null; 
//$( document ).ready(function() {
//	onDeviceReady();
//});
function onBackButtonPress() {
 $(".main_body canvas").remove();
 $( "div.select_your_app" ).removeClass("hidden");
 $( ".input_area" ).removeClass("hidden");
 $( ".add_app" ).removeClass("hidden");
 
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	document.addEventListener("backbutton", onBackButtonPress, false);
   myMedia=new Media("sounds/CarMusic11.wav");
	deviceHeight = $(".select_your_app").height()+60;
	deviceWidth = $(".select_your_app").width();

	console.log("js running");

	clearCache();//
	
	// document.addEventListener("intel.xdk.device.hardware.back", backButtonClicked, false);    
	window.document.addEventListener('touchmove', preventDefaultScroll, false);

		
	$(".code_input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$(".save_button").click();
		}
	});

	$(".save_button").click(function(){
		buttonClicked();
	});

	$(".add_app").click(function(event){
		console.log("add app clicked")
		$(".input_area").removeClass("nodisplay");
		$(".code_input").focus();
	});

	$(".input_area").click(function(event){
		if (event.target === this){
			$(".input_area").addClass("nodisplay");
		}
	});

	$(".select_your_app").css("height",window.innerHeight-60);

	var title = new Array();
	var icon = new Array();

	for(var i=0; i<localStorage["numberOfGamesOwned"]; i++){
		title.push(localStorage[i+".title"]);
		icon.push(localStorage[i+".app_icon"]);
	}

	//var title = ["app 1 yo","app 2 yo","app 3 yo","app 4 yo","app 5 yo","666666666","seven","nom nom nom nom"];
	//var icon = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];

	for (var i = 0; i < title.length; i++) {

		var mainElement = $("<article class='each_app'></sarticle>");
		var iconElement = $("<div class='app_icon'  id='"+i+"'></div>");
		var titleElement = $("<h1 class='app_title'>"+title[i]+"</div>");
		mainElement.html(iconElement);
		mainElement.append(titleElement);
		iconElement.css( "background-image", "url(\'"+icon[i]+"\')" );
		iconElement.css( "background-size", "cover" );
		iconElement.css( "background-position", "50%" );
		$(".select_your_app").append(mainElement);

		// console.log(title[i]);
		// console.log(icon[i]);
	};

	$(".app_icon").click(function(){
		loadGame($(this).attr('id'));
	});

}


// function supports_html5_storage() {
// 	try {
// 		return 'localStorage' in window && window['localStorage'] !== null;
// 	} catch (e) {
// 		return false;
// 	}
// }

function getFileIntoLocalStorage(gameId, variable, dataType, url){
	// Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
	var rhinoStorage = localStorage.getItem(gameId+"."+variable);

	if(dataType=="0"){
		rhino = new Image();//document.getElementById("rhino");
	}else if(dataType=="js"){
		rhino= document.createElement('script');
	}

	if (rhinoStorage) {
		// Reuse existing Data URL from localStorage

		if(dataType=="0"){
			rhino.setAttribute("src", rhinoStorage);
		}else if(dataType=="js"){
			rhino.setAttribute("src", rhinoStorage);
		}
		console.log("Already exists: "+gameId+"."+variable);
		if(dataType=="js"){
			console.log("append");                    
			var script = document.createElement('script');
			script.src = localStorage[localStorage["currentGameId"]+".script"];//'data:text/javascript,' + encodeURI(localStorage[Number(localStorage["currentGameId"])+".script"]);
			script.onload = function() {
				//optional callback
			};
			// document.body.appendChild(canvas);
			document.body.appendChild(script);
			console.log("------------------");
			console.log(localStorage["currentGameId"]+".script");
			console.log(localStorage[localStorage["currentGameId"]+".script"]);
			console.log(output.game_script);
		}
	} else {

		// Create XHR, Blob and FileReader objects
		var xhr = new XMLHttpRequest(), blob, fileReader = new FileReader();

		xhr.open("GET", url, true);
		// Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
		xhr.responseType = "arraybuffer";

		xhr.addEventListener("load", function () {
			if (xhr.status === 200) {
				// Create a blob from the response
				
				console.log("dataType= "+dataType);
				
				if(dataType=="0"){
					blob = new Blob([xhr.response], {type: "image/png"});
				}else if(dataType=="js"){
					blob = new Blob([xhr.response], {type: "text/javascript"});
				}

				// onload needed since Google Chrome doesn't support addEventListener for FileReader
				fileReader.onload = function (evt) {
					// Read out file contents as a Data URL
					var result = evt.target.result;
					// Set image src to Data URL
					rhino.setAttribute("src", result);
					// Store Data URL in localStorage
					try {
						localStorage.setItem(gameId+"."+variable, result);


						console.log("Saved to: "+gameId+"."+variable);
						if(dataType=="js"){
							console.log("append");
							var script = document.createElement('script');
							script.src = localStorage[localStorage["currentGameId"]+".script"];//'data:text/javascript,' + encodeURI(localStorage[Number(localStorage["currentGameId"])+".script"]);
							script.onload = function() {
								//optional callback
							};
							//document.body.appendChild(canvas);
							document.body.appendChild(script);
							console.log("------------------");
							console.log(localStorage["currentGameId"]+".script");
							console.log(localStorage[localStorage["currentGameId"]+".script"]);
							console.log(output.game_script);
						}
					}catch (e) {
						console.log("Storage failed: " + e);
					}
				};
				// Load blob as Data URL
				fileReader.readAsDataURL(blob);
			}
		}, false);
		// Send XHR
		xhr.send();
	}
}


function buttonClicked(){
	console.log("submit pressed");

	var code = "code=" + $(".code_input").val();

	$.ajax({
		type: "POST",
		url: "http://myappforyou.co.uk/getcode",

		data: code, // serializes the form's elements.
		success: function(data){
			console.log(data);
			if (data == "No code was received"){
				// alert("Incorrect Code");
			}else if(data=="bad code"){
				$(".input_area").append("<div class='error_message'>The code entered was incorrect.</div>");
				setTimeout(function() {
					$(".error_message").remove();
				}, 4000);
			}else{
				console.log("good code");
				$(".main_body").append(canvasVar); 
				firstTimeRun=true;
				var codeAlreadyUsed=false;
				for(var i=0; i<Number(localStorage["numberOfGamesOwned"]); i++){
					if(localStorage[""+i+".gameCode"]==code){
						codeAlreadyUsed=true;
					}
				}
				if(codeAlreadyUsed){
					//No need to add another game, should already exist
					//alert("Code used previously");
				}else{
					//add another game

					if(localStorage["numberOfGamesOwned"]){
						localStorage["numberOfGamesOwned"]=Number(localStorage["numberOfGamesOwned"])+1;    
					}else{
						localStorage["numberOfGamesOwned"] = "1"; 
					} 

					localStorage[""+Number(localStorage["numberOfGamesOwned"])-1+".gameCode"]=code;
					//alert("New Game added!: code: " + localStorage[""+Number(localStorage["numberOfGamesOwned"])-1+".gameCode"]);
				}



				$( "div.select_your_app" ).remove();
				$( ".input_area" ).remove();
				$( ".add_app" ).remove();
				output=null;
				output = jQuery.parseJSON( data );                  
				outputSave=output;                  

				//console.log(output.game_script);

				for(var i=0; i<Number(localStorage["numberOfGamesOwned"]); i++){
					if(localStorage[""+i+".gameCode"]==code){
						localStorage["currentGameId"]=i; // figure out game Id
						currentGame=""+i;
					}
				}
				console.log("current game id: "+currentGame);
				getFileIntoLocalStorage(localStorage["currentGameId"],"script","js",output.game_script);


				// console.log(output.title);
				// console.log(output.message);
				// console.log(output.poor_message);
				// console.log(output.good_message);
				// console.log(output.perfect_message);
				// console.log(output.card_back);
				// console.log(output.border);
				// for (var i = 0; i < output.images.length; i++) {
				// 	console.log(output.images[i]);
				// }
			}         
		}
	});
}
function loadGame(gameId){          
	//alert(localStorage["numberOfGamesOwned"]);
	if(localStorage[gameId+".gameCode"]){
		$( "div.select_your_app" ).remove();
		$( ".input_area" ).remove();
		$( ".add_app" ).remove();
		currentGame=gameId;

		var script = document.createElement('script');
		script.src = localStorage[gameId+".script"];//'data:text/javascript,' + encodeURI(localStorage[Number(localStorage["currentGameId"])+".script"]);
		script.onload = function() {
			//optional callback
		};

		console.log("Attempt to load game:" +gameId+"/");
		console.log(gameId+".script");
		console.log(localStorage[gameId+".script"]);

		$(".main_body").append(canvasVar); 
		document.body.appendChild(script);
		
	}else{
		//alert("No game found");
	}

}

function clearCache(){
	localStorage.clear();
}

var preventDefaultScroll = function(event) {
	// Prevent scrolling on this element
	event.preventDefault();
	window.scroll(0, 0);
	return false;
};

function backButtonClicked() {
	//alert(currentGameType);
	if(currentGameType!=0){
		gameScreen=0;
		if(currentGameType==1){
			drawDifficultyChoiceScreen();
		}
		else if(currentGameType==2){
			drawMenuPage();
		}
		//alert(currentGameType);
	}
}



