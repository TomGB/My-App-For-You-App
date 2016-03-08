
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
var holdButtonTimer;
var heldButtonGameId; 
var defaultReportText = "Reason: ";
var enableReport=true;
//$( document ).ready(function() {
//	onDeviceReady();
//});

function spawnIcons(){
		console.log("0.5");
		var title = new Array();
		var icon = new Array();
		console.log("1");
		for(var i=0; i<localStorage["numberOfGamesOwned"]; i++){
			if(localStorage.getItem(i+".gameCode")!==null){
				title.push(localStorage[i+".title"]);
				icon.push(localStorage[i+".app_icon"]);
			}
			else{
				title.push("");
				icon.push(null);
			}
			
		}
		console.log("2");
		$(".each_app").remove();
		for (var i = 0; i < title.length; i++) {
			if(localStorage.getItem(i+".gameCode")!==null){
				console.log("3");
				var mainElement = $("<article class='each_app'></article>");
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
			}
		};
		console.log("4");
		$(".app_icon").on('touchend', function () {
			
			clickEndApp();
		});
	
		$(".app_icon").on('touchstart', function () {
			clickStartApp($(this).attr('id'));
		});
		console.log("Num of games owned " + localStorage["numberOfGamesOwned"]);
		//deleteApp(0);
}
function clickStartApp(gameID){
	console.log("Click start on app");
	holdButtonTimer=setTimeout(displayAppOptions, 1000);
	heldButtonGameId=gameID;
}
function clickEndApp(){
	console.log("Click end on app");
	if(holdButtonTimer!==null){
		clearTimeout(holdButtonTimer);
		holdButtonTimer=null;
		loadGame(heldButtonGameId);
	}
	else{
		clearTimeout(holdButtonTimer);
		holdButtonTimer=null;
	}
	
	
}
function deleteApp(){
	console.log("LocalStorageLen before DELETE: " + localStorage.length);
	var repeat=true;
	while(repeat){
		repeat=false;
		for(var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage[key];
			console.log("considering.. i="+i+" Key: "+key + " => " + localStorage.key(i));
			if(key===null){
				repeat=true;
			}
			if(key!==null && key.charAt(0)==heldButtonGameId){
				console.log("removing item... " + key + " => ");
				localStorage.removeItem(key);
				
			}
			else{
				console.log(" NOT removing. " + key + " => ");
			}
		
		}
	}
	console.log("LocalStorageLen AFTER DELETE: " + localStorage.length);
	spawnIcons();
	$( ".lightbox" ).addClass("hidden");
}
function displayAppOptions(){
	$( ".lightbox" ).removeClass("hidden");
	console.log("displayGameOptionsMenu");
	clearTimeout(holdButtonTimer);
	holdButtonTimer=null;
}
function onBackButtonPress() {
	endEverything();
	$(".main_body canvas").remove();

	$( "div.select_your_app" ).removeClass("hidden");
	$( ".input_area" ).removeClass("hidden");
	$( ".add_app" ).removeClass("hidden");
	spawnIcons();
	firstTimeRun=false;
}

document.addEventListener("deviceready", onDeviceReady, false);
//drawTouchIndex();
function successFunction(){
	console.log("Full Screen Plugin Success");
}
function errorFunction(){
	console.log("Full Screen Plugin Error");
}

function onDeviceReady() {
	//StatusBar.hide;
	//console.log('Orientation is ' + screen.orientation);
	//screen.lockOrientation('portrait');
	//console.log('Orientation is now ' + screen.orientation);
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
	$(".report_area").click(function(event){
		//if (event.target === this){
		//	$(".report_area").addClass("nodisplay");
	//	}
	});

	$(".select_your_app").css("height",window.innerHeight-60);

	spawnIcons();
	
	
	$( "div[name=cancel]").on('touchstart', function () {
		$( ".lightbox" ).addClass("hidden");
	});
	$( "div[name=report]").on('touchstart', function () {
		$( ".report_area" ).removeClass("nodisplay");
		 $(".text_area").val(defaultReportText);
		$( ".lightbox" ).addClass("hidden");
		console.log("report clicked");
	});
		
	$( "div[name=delete]").on('touchstart', function () {
			console.log("delete clicked");
			deleteApp();
	});
	
	$( "div[name=sendReport]").on('touchstart', function () {
			sendReport();
			//$( ".report_area" ).addClass("nodisplay");
	});
	$( "div[name=cancelReport]").on('touchstart', function () {
			$( ".report_area" ).addClass("nodisplay");
	});
	

	//var title = ["app 1 yo","app 2 yo","app 3 yo","app 4 yo","app 5 yo","666666666","seven","nom nom nom nom"];
	//var icon = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];



	

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
					console.log("type is js");
					console.log(xhr.response);
					try {
					  blob = new Blob([xhr.response], {type: "text/javascript"});
					}
					catch (e) {
					   // statements to handle any exceptions
					  console.log("Exception: "+e); // pass exception object to error handler
					}
					
					console.log("blob1");
					console.log("xhr.response");
					blob = new Blob([xhr.response], {type: "text/javascript"});
					console.log("blob");
				}

				// onload needed since Google Chrome doesn't support addEventListener for FileReader
				fileReader.onload = function (evt) {
					console.log("fileReaderOnLoad");
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
							//console.log(localStorage["currentGameId"]+".script");
							//console.log(localStorage[localStorage["currentGameId"]+".script"]);
							//console.log(output.game_script);
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

function sendReport(){
	if(enableReport){
		console.log("send report function started");
		var reportText = $(".text_area").val();
		var reportAppId = localStorage[heldButtonGameId+".gameCode"];
		console.log("Report Text: " + reportText);
		console.log("Report ID: " + reportAppId);
		
		
	$.ajax({
		type: "POST",
		url: "http://myappforyou.co.uk/reportapp",
		
		data: { text: reportText, appId: reportAppId },
		success: function(data){
			console.log("ajax call successful");
			 $(".text_area").val("Your report has been successfully sent!");
			 enableReport=false;
			 setTimeout(function() {				 
				$(".report_area").addClass("nodisplay");
				enableReport=true;
			}, 4000);
		},
		 error: function(xhr, textStatus, errorThrown){
			 defaultReportText=reportText;
			 $(".text_area").val("There was a problem with sending your report. Please try again later.");
			
			
			console.log("There was a problem with sending your report. Please try again later");
			console.log(errorThrown);
			console.log(textStatus);
		}
		
		});
	}
	else{
		console.log("report already sent");
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



				$( "div.select_your_app" ).addClass("hidden");
				$( ".input_area" ).addClass("hidden");
				$( ".add_app" ).addClass("hidden");
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
	//	$( "div.select_your_app" ).remove();
	//	$( ".input_area" ).remove();
	//	$( ".add_app" ).remove();
	$( "div.select_your_app" ).addClass("hidden");
				$( ".input_area" ).addClass("hidden");
				$( ".add_app" ).addClass("hidden");
		currentGame=gameId;

		var script = document.createElement('script');
		script.src = localStorage[gameId+".script"];//'data:text/javascript,' + encodeURI(localStorage[Number(localStorage["currentGameId"])+".script"]);
		script.onload = function() {
			//optional callback
		};

		console.log("Attempt to load game:" +gameId+"/");
		//console.log(gameId+".script");
		//console.log(localStorage[gameId+".script"]);

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

/*function drawTouchIndex() {

            var pressEnd = function(e) {

               
            };
           
            var pressStart = function(e) {
				var touch = e.touches[0];
				x = touch.pageX;
				y = touch.pageY;
                
            };
         
           document.addEventListener("touchstart", pressStart, false);
           document.addEventListener("touchend", pressEnd, false);
        
 }; */


