
var canvasVar = '<canvas width="400" id="myCanvas" height="450" style="overflow:hidden;"></canvas>';
// var canvasVar = $('<canvas/>',{'width':100,'height':200,'class':'radHuh'});
//document.body.appendChild(canvas);
//      <canvas width="400" id="myCanvas" height="450" style="overflow:hidden;"></canvas>

var output;
var outputSave;
var currentGame="0";
var currentGameType="0";

var firstTimeRun=false;
var downloadedItems=0;
 //var screenWidth=window.innerWidth;
 //var screenHeight=window.innerHeight;
 var screenWidth = $(window).width();
var screenHeight = $(window).height();
var myMedia = null;
var holdButtonTimer;
var heldButtonGameId; 
var defaultReportText = "Reason: ";
var enableReport=true;
var appFileSystem;
var filePath;
//$( document ).ready(function() {
//	onDeviceReady();
//});
var downloadURL = 'http://www.myappforyou.co.uk/img/floor1.png';
var testImage=new Image();
testImage.src="images/home.png";


function spawnIcons(){
		//alert("spawnIcons start");
		try{
		console.log("0.5");
		var title = new Array();
		var icon = new Array();
		console.log("1");
		for(var i=0; i<localStorage["numberOfGamesOwned"]; i++){
			if(localStorage.getItem(i+".gameCode")!==null){
				title.push(localStorage[i+".title"]);
				try{icon.push(localStorage["filePath"]+i+"/app_icon.jpg");}
				catch(e){
					console.log("Exception push icon: " + e);}
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
		catch(e){
			//alert("Exception in spawn icons: "+ e);			
		}
}
function clickStartApp(gameID){
	// console.log("click start on app");
	console.log("Click start on app");
	holdButtonTimer=setTimeout(displayAppOptions, 1000);
	heldButtonGameId=gameID;
}
function clickEndApp(){
	// console.log("click end app");
	console.log("Click end on app");
	if(holdButtonTimer!==null){
		clearTimeout(holdButtonTimer);
		holdButtonTimer=null;
		//console.log("go to load game");
		//console.log("game number: "+heldButtonGameId);
		getGameFromMemory(heldButtonGameId);
	}
	else{
		//console.log("else hold button timer");
		clearTimeout(holdButtonTimer);
		holdButtonTimer=null;
	}
	
	
}
function deleteAll(){
	
	try{
		for(heldButtonGameId=0; heldButtonGameId<30; heldButtonGameId++){
		//alert(heldButtonGameId);
		//if(localStorage[heldButtonGameId+".gameCode"]){
			//alert("delete all. Item found: "+heldButtonGameId);
			deleteApp();
		//}
		//else{
			//alert("delete all. Item NOT found: "+heldButtonGameId);
		//}
		
		}
	}catch(e){
		//alert("exception "+ e);
	}
	localStorage["numberOfGamesOwned"]=null;
	spawnIcons();	
		
	
}
function deleteApp(){
		//alert("delete app.");
	console.log("LocalStorageLen before DELETE: " + localStorage.length);
	var debugString="Debug String: ";
	var repeat=true;
	while(repeat){
		repeat=false;
		for(var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage[key];
			//console.log("considering.. i="+i+" Key: "+key + " => " + localStorage.key(i));
			if(key===null){
				repeat=true;
			}
			if(key!==null && key.charAt(0)==heldButtonGameId){
				console.log("removing item... " + key + " => ");
				debugString=debugString.concat("removing item... " + key);
				localStorage.removeItem(key);
				
			}
			else{
				//console.log(" NOT removing. " + key + " => ");
			}
		
		}
	}
	console.log("about to remove file: ");
	removefile();
	console.log("LocalStorageLen AFTER DELETE: " + localStorage.length);
	spawnIcons();
	$( ".lightbox" ).addClass("hidden");
	//console.log(debugString);
}
function displayAppOptions(){
	$( ".lightbox" ).removeClass("hidden");
	console.log("displayGameOptionsMenu");
	clearTimeout(holdButtonTimer);
	holdButtonTimer=null;
}
function onBackButtonPress() {
	try{
	//alert("obbp");
	endEverything();
	//alert("obbp 2");
	$(".main_body canvas").remove();

	$( "div.select_your_app" ).removeClass("hidden");
	//alert("obbp 3");
	$( ".input_area" ).removeClass("hidden");
	$( ".add_app" ).removeClass("hidden");
	spawnIcons();
	firstTimeRun=false;
	//alert("obbp 4");
	}
	catch(e){
		//alert("Exception in onBackButtonPress() function: " + e);
	}
}

document.addEventListener("deviceready", onDeviceReady, false);
drawTouch();
function successFunction(){
	console.log("Full Screen Plugin Success");
}
function errorFunction(){
	console.log("Full Screen Plugin Error");
}
function onPause() {
    onBackButtonPress();
}

function onDeviceReady() {
	//alert("On device ready start");
	console.log("Ready");
	StatusBar.hide;
	//file
	  
	 // getFileSystem();
	  
	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	//file end
	//console.log('Orientation is ' + screen.orientation);
	screen.lockOrientation('portrait');
	//console.log('Orientation is now ' + screen.orientation);
	try{
		document.addEventListener("backbutton", onBackButtonPress, false);
		document.addEventListener("pause", onPause, false);

	}
	catch(e){
		//alert("Exception on add event listener line: " + e);
	}

   try{
	   myMedia=new Media("sounds/CarMusic11.wav");
   }
   catch(e){
		//alert("Exception on myMedia=newMedia line: " + e);
	}
	

 
	console.log("js running");

	//clearCache();
	
	// document.addEventListener("intel.xdk.device.hardware.back", backButtonClicked, false);    
	try{
	
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
	}
	catch(e){
		//alert("Exception: " + e);
	}

	
	spawnIcons(); //may be a testing try catch in here
	
	try{
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
	
	deviceHeight = $(".select_your_app").height()+60;
	deviceWidth = $(".select_your_app").width();
	//var title = ["app 1 yo","app 2 yo","app 3 yo","app 4 yo","app 5 yo","666666666","seven","nom nom nom nom"];
	//var icon = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"];
	}
	catch(e){
		//alert("Exception in the 2nd block: " + e);
	}



	

}


 function getFileSystem(fileURL, fileName, folderName) {
               // alert('downloadFile'); 
			   testFunction();
				try {
						//console.log("About to attempt file download");
						window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
						
						function(fileSystem){onRequestFileSystemSuccess(fileSystem, fileURL, fileName, folderName)}						
						,fail);
				}
				catch(e){
					//alert("Exception: " + e);
				}
                
 }
 
  function onRequestFileSystemSuccess(fileSystem, fileURL, fileName, folderName) {
				
			//alert('onRequestFileSystemSuccess');
			testFunction();
			
			var entry=fileSystem.root;
			entry.getDirectory(folderName, {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
			
			
			fileSystem.root.getFile(
			'dummy.html',
			{create: true, exclusive: false},
			function(fileEntry){onGetFileSuccess(fileEntry, fileName, fileURL, folderName, fileSystem)},
			fail
			);
			
				
  }
  function onGetDirectorySuccess(dir) { 
     // alert("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
     //alert("Error creating directory "+error.code); 
} 
 
	//console.log(appFileSystem.root.fullPath);
function testFunction(){
	;
}

            
function onGetFileSuccess(fileEntry, fileName, fileURL, folderName, fileSystem) {
	testFunction();
	//alert('onGetFileSuccess !!');
	try{var path = fileEntry.toURL().replace('dummy.html', '');} catch(e){console.log("Exception1: "+e);}
	try{filePath=path; localStorage["filePath"]=path;} catch(e){console.log("Exception2: "+e);}
	try{var fileTransfer = new FileTransfer();} catch(e){console.log("Exceptin3: "+e);}
	try{fileEntry.remove();}catch(e){console.log("Exception4: "+e);}
	
	//console.log("will attempt to download: "+ path+folderName+"/"+String(fileName));
	fileTransfer.download(
		fileURL,
		path+folderName+"/"+String(fileName),
		function(file) {
			//alert('download complete: ' + file.toURL());
			if(fileName=="gameScript.js"){
				//jj
				fileSystem.root.getFile( // TRY FILE PATH INSTEAD SO THAT THE FILE GETS PUT IN THE GAME FOLDER + make a check for "if game exists" for spawn 
				'fileForNoMedia.nomedia',
				{create: true, exclusive: false},
				success,fail);
				
				var script = document.createElement('script');
				script.src= filePath+currentGame+"/"+"gameScript.js";							
							
				
				script.onload = function() {
						//optional callback
				};
							
			
				
				document.body.appendChild(script);		
				
			
				
			//showLink(file.toURL());
			}
			else{
				downloadedItems++;
			}
		},
		function(error) {
			console.log('download error source ' + error.source);
			console.log('download error target ' + error.target);
			console.log('upload error code: ' + error.code);
		}
	);
	
}


function showLink(url) {
	console.log(url);

	window.resolveLocalFileSystemURL(url,onSuccess, onFailure);
	var divEl = document.getElementsByClassName("main_body")[0];
	var aElem = document.createElement('a');
	aElem.setAttribute('target', '_blank');
	aElem.setAttribute('href', url);
	aElem.appendChild(document.createTextNode('Ready! Click To Open.'))
	document.body.appendChild(aElem);
}
function onSuccess(fileEntry) {
    console.log(fileEntry);
}

function onFailure(fileEntry) {
    console.log("Failure of resolve local file system url function");
}


function fail(evt) {
	//alert(evt.target.error.code);
}
function success(){
	
}
function removefile(){
	//alert("remove file");
	window.requestFileSystem(LocalFileSystem.PERSISTENT,0,removefile2,fail);
}
function removefile2(fileSystem){
	
	try{
	//	 fileSystem.root.getFile("/theFile.png", {create: false, exclusive: false}, gotRemoveFileEntry, removeFail);
		// fileSystem.root.getFile("/downloads/theFile.png", {create: false, exclusive: false}, gotRemoveFileEntry, removeFail);
		
	
		fileSystem.root.getDirectory(
			localStorage["filePath"]+heldButtonGameId,
			// "yours/dir/ect/ory",
			{create : true, exclusive : false},
			function(entry) {
			entry.removeRecursively(function() {
				//alert("Remove Recursively Succeeded");
			}, fail);
		}, fail);
        
		
		
	}
	catch(e){
		//alert(e);
	}
  
		console.log("2");

}

function gotRemoveFileEntry(fileEntry){
   
    fileEntry.remove(removeSuccess, removeFail);
}

function removeSuccess(entry) {
    console.log("Removal succeeded");
}

function removeFail(error) {
    console.log("Error removing file: " + error.code);
}
// function supports_html5_storage() {
// 	try {
// 		return 'localStorage' in window && window['localStorage'] !== null;
// 	} catch (e) {
// 		return false;
// 	}
// }

function getFileIntoLocalStorage(gameId, variable, dataType, url){
	//alert("GFILS: 1");
	// Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
	var rhinoStorage = localStorage.getItem(gameId+"."+variable);
	//alert("GFILS: 2");
	if(dataType=="0"){
		rhino = new Image();//document.getElementById("rhino");
	}else if(dataType=="js"){
		rhino= document.createElement('script');
		//alert("GFILS: 3");
	}

	if (rhinoStorage) {
		// Reuse existing Data URL from localStorage
	//alert("GFILS: 4");
		if(dataType=="0"){
			rhino.setAttribute("src", rhinoStorage);
			//alert("GFILS: 4.5");
		}else if(dataType=="js"){
			rhino.setAttribute("src", rhinoStorage);
			//alert("GFILS: 5");
		}
		console.log("Already exists: "+gameId+"."+variable);
		if(dataType=="js"){
			//alert("js");
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
		//alert("GFILS: 6");
		// Create XHR, Blob and FileReader objects
		var xhr = new XMLHttpRequest(), blob, fileReader = new FileReader();

		xhr.open("GET", url, true);
		// Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
		xhr.responseType = "arraybuffer";

		xhr.addEventListener("load", function () {
		//	alert("GFILS: 7");
			if (xhr.status === 200) {
				// Create a blob from the response
				
				console.log("dataType= "+dataType);
				
				if(dataType=="0"){
					console.log("0: image/text");
					//blob = new Blob([xhr.response], {type: "image/png"});
					try {
						blob = new Blob([xhr.response], {type: "image/png"});
					}
					catch(e){
						// TypeError old chrome and FF
						window.BlobBuilder = window.BlobBuilder || 
											 window.WebKitBlobBuilder || 
											 window.MozBlobBuilder || 
											 window.MSBlobBuilder;
						if(e.name == 'TypeError' && window.BlobBuilder){
							//alert("1");
							var bb = new BlobBuilder();
							bb.append(xhr.response);
							//var jpeg 
							blob = bb.getBlob("image/png");
							//alert("2");
						}
						else if(e.name == "InvalidStateError"){
							// InvalidStateError (tested on FF13 WinXP)
						//	alert("3");
							blob = new Blob( [array.buffer], {type : "image/png"});
						}
						else{
						//	alert("4");
							// We're screwed, blob constructor unsupported entirely   
						}
					}					
					/*catch(e) {
						console.log("catch e: " + e);
						if (window.BlobBuilder){
							console.log("inside if..");
							blob = new BlobBuilder();
							blob.append(xhr.response);
							blob = blob.getBlob();
						} else 
							console.log("inside else..");
							throw "No Blob or BlobBuilder constructor.";
						}
					}*/
				}else if(dataType=="js"){
				//	blob = new Blob([xhr.response], {type: "text/javascript"});
					try {
						//alert("GFILS: 8");
						blob = new Blob([xhr.response], {type: "text/javascript"});
					} 
				/*	catch(e) {
						console.log("catch e: " + e);
						 window.BlobBuilder = window.BlobBuilder || 
                         window.WebKitBlobBuilder || 
                         window.MozBlobBuilder || 
                         window.MSBlobBuilder;
						 console.log("before if");
						if (window.BlobBuilder){
							console.log("inside if..");
							bb = new BlobBuilder();
							bb.append(xhr.response);
							blob = bb.getBlob();
							console.log("inside if 2..");
						} else {
							console.log("inside else..");
							throw "No Blob or BlobBuilder constructor.";
						}
					}*/
					catch(e){
						//alert("GFILS:9 ");
						// TypeError old chrome and FF
						window.BlobBuilder = window.BlobBuilder || 
											 window.WebKitBlobBuilder || 
											 window.MozBlobBuilder || 
											 window.MSBlobBuilder;
						if(e.name == 'TypeError' && window.BlobBuilder){
							//alert(" e1");
							var bb = new BlobBuilder();
							bb.append(xhr.response);
							//var jpeg 
							blob = bb.getBlob("text/javascript");
							console.log("2");
						}
						else if(e.name == "InvalidStateError"){
							// InvalidStateError (tested on FF13 WinXP)
						//	alert(" e 3");
							blob = new Blob( [array.buffer], {type : "text/javascript"});
						}
						else{
						//	alert(" e 4");
							// We're screwed, blob constructor unsupported entirely   
						}
					}
				}

				// onload needed since Google Chrome doesn't support addEventListener for FileReader
				fileReader.onload = function (evt) {
					//alert("GFILS:10 ");
					// Read out file contents as a Data URL
					var result = evt.target.result;
					// Set image src to Data URL
					rhino.setAttribute("src", result);
					// Store Data URL in localStorage
					try {
						localStorage.setItem(gameId+"."+variable, result);


						//alert("Saved to: "+gameId+"."+variable);
						if(dataType=="js"){
							//alert("GFILS:11 ");
							console.log("append");
							var script = document.createElement('script');
							var script2 = document.createElement('script');
							script2.src= filePath+currentGame+"/"+"gameScript.js";
							//"js/quizGame.js";
							//alert("script src: "+ localStorage[localStorage["currentGameId"]+".script"] );
							//alert("script2 src: "+ localStorage[localStorage["currentGameId"]+".script"] );
							
							script.src = localStorage[localStorage["currentGameId"]+".script"];//'data:text/javascript,' + encodeURI(localStorage[Number(localStorage["currentGameId"])+".script"]);
							script.onload = function() {
								//optional callback
								//alert("GFILS:12 ");
							};
							//document.body.appendChild(canvas);
							try{
								//document.appendChild(testImage);
								//canvasVar.appendChild(testImage);
								//document.body.appendChild(testImage);
								//document.body.appendChild(script);
								document.body.appendChild(script2);
							}
							catch(e){
								//alert("exception: "+e);
							}
							
							console.log("------------------");
							console.log(localStorage["currentGameId"]+".script");
							console.log(localStorage[localStorage["currentGameId"]+".script"]);
							console.log(output.game_script);
							//alert("GFILS:13 ");
						}
					}catch (e) {
						//alert("Storage failed: " + e);
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
	//alert("button clicked");
	console.log("submit pressed");
	
	var code = "code=" + $(".code_input").val();
	
	$.ajax({
		type: "POST",
		url: "http://myappforyou.co.uk/getcode",

		data: code, // serializes the form's elements.
		success: function(data){
			//alert("Ajax Success");
			console.log(data);
			if (data == "No code was received"){
				// console.log("Incorrect Code");
			}else if(data=="bad code"){
				if(code="code=da"){
						//$(".input_area").append("<div class='error_message'>Deleting all..</div>");
					//setTimeout(function() {
					//	$(".error_message").remove();
				//	}, 4000);
						deleteAll();
				}
				else{
						$(".input_area").append("<div class='error_message'>The code entered was incorrect.</div>");
					setTimeout(function() {
						$(".error_message").remove();
					}, 4000);
				}
				
			}else{
				//alert("good code");
				$(".main_body").append(canvasVar);
					//alert("canvas var appended");
				firstTimeRun=true;
				var codeAlreadyUsed=false;
				for(var i=0; i<Number(localStorage["numberOfGamesOwned"]); i++){
					if(localStorage[""+i+".gameCode"]==code){
						codeAlreadyUsed=true;
						//alert("code already used");
					}
				}
				if(codeAlreadyUsed){
					//No need to add another game, should already exist
					//console.log("Code used previously");
				}else{
					//add another game

					if(localStorage["numberOfGamesOwned"]){
						localStorage["numberOfGamesOwned"]=Number(localStorage["numberOfGamesOwned"])+1;    
					}else{
						localStorage["numberOfGamesOwned"] = "1"; 
					} 

					localStorage[""+Number(localStorage["numberOfGamesOwned"])-1+".gameCode"]=code;
					//console.log("New Game added!: code: " + localStorage[""+Number(localStorage["numberOfGamesOwned"])-1+".gameCode"]);
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
				//alert("current game id: "+currentGame);
				
				//getFileIntoLocalStorage(localStorage["currentGameId"],"script","js",output.game_script);
				getFileSystem(output.game_script, "gameScript.js", currentGame);

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
				//alert("end of ajax on success");
		}
	});
}
function getGameFromMemory(gameId){          
	//console.log(localStorage["numberOfGamesOwned"]);
	// console.log("gameid: "+gameId);
	console.log("gameid: "+gameId);
	if(localStorage[gameId+".gameCode"]){
		// console.log("got from storage");
	//	$( "div.select_your_app" ).remove();
	//	$( ".input_area" ).remove();
	//	$( ".add_app" ).remove();
	$( "div.select_your_app" ).addClass("hidden");
				$( ".input_area" ).addClass("hidden");
				$( ".add_app" ).addClass("hidden");
		currentGame=gameId;

		var script = document.createElement('script');
		script.src = localStorage["filePath"]+gameId+"/"+"gameScript.js";	
		
		script.onload = function() {
			// console.log("onload");
		};

		console.log("Attempt to load game:" +gameId+"/");
		//console.log(gameId+".script");
		//console.log(localStorage[gameId+".script"]);

		$(".main_body").append(canvasVar); 
		document.body.appendChild(script);
		
	}else{
		console.log("No game found");
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
	//console.log(currentGameType);
	if(currentGameType!=0){
		gameScreen=0;
		if(currentGameType==1){
			drawDifficultyChoiceScreen();
		}
		else if(currentGameType==2){
			drawMenuPage();
		}
		//console.log(currentGameType);
	}
}

function drawTouch() {

    var pressEnd = function(e) {

       
    };
   
    var pressStart = function(e) {
		var touch = e.touches[0];
		x = touch.pageX;
		y = touch.pageY;
        
    };
 
   document.addEventListener("touchstart", pressStart, false);
   document.addEventListener("touchend", pressEnd, false);

}; 


