
function rotateGun(e) {

//using the e value we can deduce the X co-ords
var xPos = e.clientX;

//We need to work out where the mouse cursor is as a percentage of the width of the screen

//We will work this out by dividing the current X position by the overall screen width which if you remember we put in newWidth
var currentXPositionPercentage = xPos/newWidth;

//We now want to apply this to the maximum amount of rotation which is 50 however the starting rotation is -15 not 0
var amountToRotate = -15 + (currentXPositionPercentage * 50);

//Lets rotate the gun!
  $("#SZ0_1").css('transform', 'rotate('+amountToRotate+'deg)');
                    
}

//movement for our bubble zombie
function bubbleZombie_flyAway(whichOne){

	//update the score
	 current_score++;
	updateScore();

 //assign a user friendly name for our div
    var $zombiex = $("#bubble_zombie"+whichOne);
 
     //first it should animate upwards with a bounce
       $zombiex.animate({ 
                 //bring our zombie up the screen 
                   top:   "-="+50*ratio+ "px",   
          },{ easing:"easeOutElastic",  duration: 400,

             complete: function () {  
		//now the final animation where the bubble zombie disappears into space
 		 $(this).delay(150).animate({ 
                  //slowly turn the alpha down
                   opacity:   "-="+1,     
          	  },{ easing:"easeOutQuint",  duration: 1000,

                     step: function(now, fx){ 
		       //at each step we can adjust the scale to make it look smaller
                if (fx.prop == "opacity" && fx.pos>=0.1) { 
		    //work out the amount to scale 
                    var xx = 0.5/(fx.pos);  
		    //apply the scale   
                    $(this).css('transform','scale('+xx+')');    	 
                 } 
                }, complete: function () { 
		 //finally lets make the zombie come towards the screen again  
                  SZ_animateZombie(whichOne);  
                 }//end of second complete function
		});//end of second animation
	     }//end of first complete function
	}); //end of first animation 
}