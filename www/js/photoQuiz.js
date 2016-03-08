var canvas = document.getElementById('myCanvas'),
          ctx = canvas.getContext('2d');
          ctx.canvas.width  = window.innerWidth;
          ctx.canvas.height = window.innerHeight;

          ctx.shadowColor = "rgba( 0, 0, 0, 0.3 )";
          ctx.shadowBlur = 3;

          drawTouch();
         
          var screenWidth=384;
          var screenHeight=640;
          
          var imageHeight=screenHeight/1.5;
          var imageWidth=imageHeight*2.5/3.5;
var globalLock=false;
var timeBarStatus=100;
          var gameScreen=0;
          var score=0;
          var myVar;
          var myScheduleVar;
          var numberOfButtons=4;
          var numberOfImages=3;
var numberOfQuestions=3;
var currentQuestion=0;
          var buttonArray = new Array(); 
          var endButtonArray = new Array(); 
           

          var metrics;
          var textWidth;
 

          var buttonImage=new Image();
          var textBG=new Image();
var buttonPressedImage=new Image();
          var displayPicture = new Image();          
          var pictureImage= new Image();
          var hiddenPictureImage= new Image();
          var menuBG= new Image();
          var quizPageBG= new Image();
          var endBG= new Image();
          var pictureBorder= new Image();
          textBG.src="C:/Users/MDMD/Desktop/img/BlueTextBG.png";
          menuBG.src=  "http://upload.wikimedia.org/wikipedia/commons/d/dc/Col_Nudo.jpg";//*"images/penguin.png";*/"C:/Users/MDMD/Desktop/img/colorBG.png";
          quizPageBG.src="C:/Users/MDMD/Desktop/img/triangleBG.png";
          endBG.src= "http://upload.wikimedia.org/wikipedia/commons/d/dc/Col_Nudo.jpg";// /*"images/penguin.png";*/ "C:/Users/MDMD/Desktop/img/largeTrianglesBG.jpg";
          pictureBorder.src="C:/Users/MDMD/Desktop/img/borderBlackSolid.png";

          buttonImage.src="C:/Users/MDMD/Desktop/img/buttonBlueSquare.png";
          buttonPressedImage.src="C:/Users/MDMD/Desktop/img/buttonBlueSquare2.png";
          pictureImage.src= "http://upload.wikimedia.org/wikipedia/commons/d/dc/Col_Nudo.jpg";//"http://www.stuffbydavid.com/mcnbs_stuff/button.png";
          hiddenPictureImage.src="http://img3.wikia.nocookie.net/__cb20130829010655/umineko/images/thumb/0/06/Question-mark.jpg/480px-Question-mark.jpg";

  var cardFrame = new Image();
              cardFrame.src = "http://www.scrapbookscrapbook.com/Digital/Frames/silver-scrollwork-rectangle.png";
          
          displayPicture.src = pictureImage.src;

//buttons
          startButton = new Button(buttonImage, screenWidth/3, screenHeight*0.6, screenWidth/3,screenHeight*0.08,1);

          buttonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.58, screenWidth/3,screenHeight*0.08,0));
          buttonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.66, screenWidth/3,screenHeight*0.08,1));
          buttonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.74, screenWidth/3,screenHeight*0.08,2));
          buttonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.82, screenWidth/3,screenHeight*0.08,3));


          endButtonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.5, screenWidth/3,screenHeight*0.08,"Replay"));
          endButtonArray.push(new Button(buttonImage, screenWidth/3, screenHeight*0.58, screenWidth/3,screenHeight*0.08,"Exit"));

//buttons end
          var imageArray = new Array();

            for(i=0; i<numberOfImages; i++){
                imageArray.push(new Image());
                imageArray[i].src="http://channel.nationalgeographic.com/exposure/content/photo/photo/1233920_african-penguins_wo5gfn47jbjrbb22d5rbgtfesn75b4q7rjyjjrgtt5hpvulms43q_950x633.jpg";
            }
          var questionArray=new Array();
          questionArray.push(new Question(imageArray[0],"Woo, question. Try to recall how many penguins were there in the picture?","5","6","7", null,2,2500));
          questionArray.push(new Question(imageArray[1],"How Many rocks were there in the picture?","0","1",null,null,0,1000));
          questionArray.push(new Question(imageArray[2],"How Many birds were there in the picture?","Batman","6","7","One night on a stormy sea",2,500));
          
        
          drawMenuPage();
        //drawQuizPage();

function hideImage(){
    //displayPicture=hiddenPictureImage;
    //drawQuizPage();
}
function Question(questionImage, questionText, answerOneText, answerTwoText, answerThreeText, answerFourText, correctAnswer, timeToLook){
  
    this.questionImage=questionImage;
    this.questionText=questionText;
    this.answerArray= new Array();
    this.answerArray.push(answerOneText);
    this.answerArray.push(answerTwoText);
    if(answerThreeText!==null){this.answerArray.push(answerThreeText);}
    if(answerFourText!==null){this.answerArray.push(answerFourText);}
    this.correctAnswer=correctAnswer;
    this.timeToLook=timeToLook;
}
function Button (buttonImage, x,y,width,height, value) {
              this.buttonImage=buttonImage;
              this.x=x;
              this.y=y;
              this.width=width;
              this.height=height;
              this.value=value;
          }
          Button.prototype.checkHitBox = function(x,y,push) {
            if(x>=this.x && x<=this.x+this.width && y>=this.y && y<=this.y+this.height){
                if(push!=1)alert(this.value);
                if(gameScreen===0){
                    if(push==1){
                        this.buttonImage=buttonPressedImage;
                        drawMenuPage();
                    }
                    //alert("Clicked");
                    else if(this.value==1){
                        //alert("Menu");
                        gameScreen=1;
                        drawQuizPage();
                        
                    }
                }
                else if(gameScreen==1){
                    if(push==1){
                        this.buttonImage=buttonPressedImage;
                        drawQuizPageHidden();
                    }
                    else{
                        if(this.value==questionArray[currentQuestion].correctAnswer){
                            score++;
                            alert("CORRECT");
                        }
                        if(currentQuestion==numberOfQuestions-1){

                            alert("Final Score: "+score);
                            gameScreen=2;
                            drawEndPage();
                        }else{
                           currentQuestion++;
                           drawQuizPage();
                        }
                    }

                        
                    }
                
                else if(gameScreen==2){
                  //alert(this.value);
                    if(push==1){
                        this.buttonImage=buttonPressedImage;
                        drawEndPage();
                    }
                    else if(this.value=="Replay"){
                        gameScreen=1;
                        score=0;
                        currentQuestion=0;
                        drawQuizPage();
                    }    
                }
                    
                }
              
                
            
          };
function decreaseTimeBar(){
    timeBarStatus-=50;
    drawQuizPage(1);
}
function drawQuizPage(excludeTimers){
    if(excludeTimers!=1){
        alert();
              timeBarStatus= questionArray[currentQuestion].timeToLook;
              myVar = setTimeout(drawQuizPageHidden, questionArray[currentQuestion].timeToLook);
              myScheduleVar = setInterval(decreaseTimeBar, 50);
    }
    globalLock=true;
              ctx.fillStyle = "black";
              ctx.drawImage(quizPageBG, 0, 0, screenWidth,screenHeight);  
              ctx.drawImage(questionArray[currentQuestion].questionImage, (screenWidth-imageWidth)/2, screenHeight*0.05, imageWidth, imageHeight);
              ctx.drawImage(pictureBorder, (screenWidth-imageWidth)/2, screenHeight*0.05, imageWidth, imageHeight); 
    
    //time bar
              ctx.fillStyle = "rgba(0,255,0,0.40)";
              ctx.fillRect((screenWidth-imageWidth)/2,screenHeight*0.05+imageHeight,imageWidth,screenHeight*0.05);
              ctx.fillStyle = "rgba(0,255,0,0.55)";
              ctx.fillRect((screenWidth-imageWidth)/2,screenHeight*0.05+imageHeight,imageWidth*timeBarStatus/questionArray[currentQuestion].timeToLook,screenHeight*0.05);  
    
    //
              ctx.fillStyle = "black";
              ctx.font = "bold 16px Arial";
              ctx.textAlign = 'center';
              //ctx.fillText(questionArray[currentQuestion].questionText, screenWidth/4, screenHeight*0.1 + screenHeight/2);

              /*for(i=0; i<questionArray[currentQuestion].answerArray.length; i++){
                ctx.drawImage(buttonArray[i].buttonImage, buttonArray[i].x, buttonArray[i].y, buttonArray[i].width,buttonArray[i].height);
                   ctx.fillText(questionArray[currentQuestion].answerArray[i], buttonArray[i].x+buttonArray[i].width/2, buttonArray[i].y+buttonArray[i].height/2);
              }*/
          }

function drawQuizPageHidden(){
    clearInterval(myScheduleVar);
    timeBarStatus=100;
              globalLock=false;
              ctx.fillStyle = "black";
              ctx.drawImage(quizPageBG, 0, 0, screenWidth,screenHeight);  
              //ctx.drawImage(questionArray[currentQuestion].questionImage, (screenWidth-imageWidth)/2, screenHeight*0.05, imageWidth, imageHeight); 

              ctx.fillStyle = "white";
              ctx.font = "bold 16px Arial";
              ctx.textAlign = 'center';
    
                  ctx.fillStyle="#2980b9";
    //ctx.fillRect(screenWidth*0.1, screenHeight*0.3, screenWidth*0.8,screenHeight*0.2);
    ctx.fillStyle = "white";
    ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 2;
              ctx.drawImage(textBG, 0, screenHeight*0.3, screenWidth,screenHeight*0.2);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
   
    wrapText(ctx, questionArray[currentQuestion].questionText, screenWidth/2, screenHeight*0.4, screenWidth*0.8,16);
             // ctx.fillText(questionArray[currentQuestion].questionText, screenWidth/2, screenHeight*0.4);
              //ctx.fillText(questionArray[currentQuestion].questionText, screenWidth/2, screenHeight*0.4+16);

    
    
              for(i=0; i<questionArray[currentQuestion].answerArray.length; i++){
                  
                  ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 2;
                  
                ctx.drawImage(buttonArray[i].buttonImage, buttonArray[i].x, buttonArray[i].y, buttonArray[i].width,buttonArray[i].height);
                   ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 0;
                   ctx.fillText(questionArray[currentQuestion].answerArray[i], buttonArray[i].x+buttonArray[i].width/2, buttonArray[i].y+buttonArray[i].height/2+4);
              }
    
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
function wrapText(context, text, x, y, maxWidth, lineHeight) {
				var words = text.split(' ');
				var line = '';

				for(var n = 0; n < words.length; n++) {
				  var testLine = line + words[n] + ' ';
				  var metrics = context.measureText(testLine);
				  var testWidth = metrics.width;
				  if (testWidth > maxWidth && n > 0) {
					context.fillText(line, x, y);
					line = words[n] + ' ';
					y += lineHeight;
				  }
				  else {
					line = testLine;
				  }
				}
				context.fillText(line, x, y);
		  }
function drawMenuPage(){
    ctx.fillStyle = "black";
               //ctx.fillRect(0,0,screenWidth,screenHeight);
                ctx.drawImage(menuBG, 0, 0, screenWidth,screenHeight);
                  ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 2;
                ctx.drawImage(startButton.buttonImage, startButton.x, startButton.y, startButton.width,startButton.height);
                  ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 0;
    
    
              ctx.fillStyle = 'white';
			  ctx.font = "bold 36px Open Sans";
			  ctx.fillText(output.title, screenWidth/2, screenHeight*0.1);
			  ctx.font = "bold 26px Open Sans";
			  wrapText(ctx, output.message, screenWidth/2, screenHeight*0.25, screenWidth*0.8,32);
			  ctx.font = "bold 16px Open Sans";

}
function drawEndPage(){
    ctx.fillStyle = "black";
             ctx.drawImage(endBG, 0, 0, screenWidth,screenHeight);  
                for(i=0; i<endButtonArray.length; i++){
                    ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 2;
                   ctx.drawImage(endButtonArray[i].buttonImage, endButtonArray[i].x, endButtonArray[i].y, endButtonArray[i].width,endButtonArray[i].height);
                    ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 0;
                   ctx.fillText(endButtonArray[i].value,endButtonArray[i].x+endButtonArray[i].width/2, endButtonArray[i].y+endButtonArray[i].height/2+4);
              }
    
    
                           ctx.fillStyle = "white";
              ctx.font = "bold 36px Arial";
              ctx.textAlign = 'center';
     ctx.shadowOffsetX = 0;
     ctx.shadowOffsetY = 2;
            ctx.drawImage(textBG, 0, (screenHeight*0.15)-8, screenWidth,screenHeight*0.2);
     ctx.shadowOffsetX = 0;
     ctx.shadowOffsetY = 0;
            ctx.fillText("Final Score: "+score, screenWidth/2, screenHeight*0.25);
                        ctx.font = "bold 16px Arial";
              
}



function drawTouch() {
            var start = function(e) {
                for(i=0; i<questionArray[currentQuestion].answerArray.length; i++){
                    buttonArray[i].buttonImage=buttonImage;
                }   
                startButton.buttonImage=buttonImage;
                for(i=0; i<endButtonArray.length; i++){
                        endButtonArray[i].buttonImage=buttonImage;
                    }
                
                if(gameScreen==1 && globalLock===false){
                      x = e.pageX;
                    y = e.pageY;
                    drawQuizPageHidden();
                    // select button
                    for(i=0; i<questionArray[currentQuestion].answerArray.length; i++){
                        buttonArray[i].checkHitBox(x,y);
                    }                    
                }
                else if(gameScreen===0){
                    x = e.pageX;
                    y = e.pageY;
                    drawMenuPage();
                    // select button
                    
                    startButton.checkHitBox(x,y);
                    
                }
                else if(gameScreen==2){
                    alert("woo");
                    x = e.pageX;
                    y = e.pageY;
                    drawEndPage();
                    // select button
                    for(i=0; i<endButtonArray.length; i++){
                        endButtonArray[i].checkHitBox(x,y);
                    }
                }
                
               
                
            };
            var move = function(e) {
               //alert("move")
            };
            var buttonDown = function(e) {
                if(gameScreen==1 && globalLock===false){
                      x = e.pageX;
                    y = e.pageY;
                    // select button
                    for(i=0; i<questionArray[currentQuestion].answerArray.length; i++){
                        buttonArray[i].checkHitBox(x,y,1);
                    }                    
                }
                else if(gameScreen===0){
                    x = e.pageX;
                    y = e.pageY;
                    // select button
                    
                    startButton.checkHitBox(x,y,1);
                    
                }
                else if(gameScreen==2){
                    x = e.pageX;
                    y = e.pageY;
                    // select button
                    for(i=0; i<endButtonArray.length; i++){
                        endButtonArray[i].checkHitBox(x,y,1);
                    }
                }
                
            };
           //document.getElementById("myCanvas").addEventListener("touchstart", start, false);
           //document.getElementById("myCanvas").addEventListener("touchmove", move, false);
           document.getElementById("myCanvas").addEventListener("mousedown", buttonDown, false);
           document.getElementById("myCanvas").addEventListener("mouseup", start, false);
	       document.getElementById("myCanvas").addEventListener("mousemove", move, false);
          // document.getElementById("myCanvas").addEventListener("MSPointerDown", start, false);
	       //document.getElementById("myCanvas").addEventListener("MSPointerMove", move, false);
        }; 
          