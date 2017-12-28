  //we will need a new ratio var
   var ratio_use = ratio;

//main function  
  function main_call_setupContent() {  
   //need to resize all elements
   //first we set their normal sizes in CSS

//Main Div 
    $('#SZ_maincontent').css('width', 600 * ratio);
    $('#SZ_maincontent').css('height', 400 * ratio);
    //make sure it is half way
    $('#SZ_maincontent').css('left', ($(window).width()/2)-((600 * ratio)/2));
    $('#SZ_maincontent').css('top', ($(window).height()/2)-((400 * ratio)/2));

//box1
    $('#box1').css('width', 631 * ratio);
    $('#box1').css('height', 457 * ratio);
    //make sure it is half way
    $('#box1').css('left', ($(window).width()/2)-((637 * ratio)/2));
    $('#box1').css('top', ($(window).height()/2)-((457 * ratio)/2));

//logo
    $('#logo').css('width', 400 * ratio);
    $('#logo').css('height', 146 * ratio);
    //make sure it is half way
    $('#logo').css('left', 0);
    $('#logo').css('top', 0);

   //Gun  
    $('#SZ0_1').css('width', 150 * ratio);
    $('#SZ0_1').css('height', 150 * ratio);

   //Reload Button  
    $('#SZ0_2').css('width', 200 * ratio);
    $('#SZ0_2').css('height', 90 * ratio);

   //Score 
    $('#SZ0_3').css('width', 235 * ratio);
    $('#SZ0_3').css('height', 100 * ratio);

   //Intro and Gameover 
   if($(window).height()<$(window).width()){
     //work out a ratio based on height
     ratio_use =  $(window).height()/800;
    }//end if
    //apply this new ratio to our intro/gameover
    $('#SZ0_4').css('width', 458 * ratio);
    $('#SZ0_4').css('height', 370 * ratio);
    $('#SZ0_4').css('left', 71 * ratio); 
    // $('#SZ0_4').css('left', ($(window).width()/2)-((600 * ratio_use)/2));
    //make sure it is half way
    //$('#SZ0_4').css('top', ($(window).height()/2)-((400 * ratio_use)/2));
    
     $('#textx').css('width', '100%');
     $('#textx').css('height', '50%');
   
    //Any sprite sheets?
      //Our Gun
        setup_gun_SS();

   //Create all our 6 zombies
    for (i = 1; i < 7; i++) {
     //this will get called 6 times
     SZ_createZombie(i);
    }

   //call the intro
    start_end_game(0);
}
 
var gameEnded=0;
//Intro or GameOver of game
  function start_end_game(whichOne) {   
	   //hide the elements
	   for (i = 1; i < 4; i++) {
            //this will get called 3 times 
	    $('#SZ0_'+i).css({opacity:0});
	   }//for  

	   //hide the zombies
	   for (i = 1; i < 7; i++) { 
	   //we need to stop this zombies animations 
    	    $('#zombie_'+i).stop();
	    $('#zombie_'+i).css({opacity:0});
	    $('#bubble_zombie_'+i).css({opacity:0});
 	  //set the zindex for the zombie
  	    $("#zombie"+i).css("z-index", i+100); 
	   }//for  

	if(whichOne==0){
	 //START OF GAME
	//change the background image
	  $('#SZ0_4').css('background-image', 'url(images/splash_intro.png)'); 
	} else {
	 //GAME OVER 
	//show the score
	  $('#SZ0_3').css({opacity:1});
	//change the background image
	  $('#SZ0_4').css('background-image', 'url(images/splash_gameover.png)');  
	}

        //make sure it is half way
            $('#SZ0_4').css('top', 0);
	   //finally show the intro or gameover image
	    $('#SZ0_4').css({opacity:1});
		
	//stop the user from firing
	 gameEnded= 1;


}//end of function

//need to store the current score
var current_score=0;

//we can call this function to update the score
function updateScore(){
 $("#textx").text(current_score);
}

//start the game
  function start_game() {  

	//reset the score
	 current_score=0;
	 updateScore();

	//reset the zindex 	
	 zindex_current=0;

	//reload the gun
	 current_shots=0;
	
	//allow user to fire
	 gameEnded= 0;

	   //hide the intro or gameover image
	    $('#SZ0_4').css({opacity:0}); 
    	  //make sure it is out of the way
             $('#SZ0_4').css('top', ($(window).height())); 
 
	   //show the elements
	   for (i = 1; i < 4; i++) {
            //this will get called 3 times 
	    $('#SZ0_'+i).css({opacity:1});
	   }//for  
	  //hide the reload button!
	  $('#SZ0_2').css({opacity:0});

	   //show the zombies
	   for (i = 0; i < 7; i++) { 
 	    //reset the Zombie 
            SZ_resetZombie(i,0);  
	   }//for  
	  //ensure the score board is half opacity
	  $('#SZ0_3').css({opacity:0.5});
 
}//end of function