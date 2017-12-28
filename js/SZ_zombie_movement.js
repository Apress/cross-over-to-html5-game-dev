//lets create a zombie
function SZ_createZombie(whichOne){

 //create a new div to hold the zombie SS
   var div = document.createElement('div');
 //and another for the bubble zombie SS
   var div2 = document.createElement('div');
 //and another for the special effect SS
   var div3 = document.createElement('div');

 //we need to hard code the CSS styles we want
   div.setAttribute('style','position: fixed; top:0; left:0; opacity:0; position: absolute; display: inherit;');
 //and the same for our bubble zombie
   div2.setAttribute('style','position: fixed; top:0; left:0; position: absolute;');
 //and the same for our special effect SS
   div3.setAttribute('style','position: fixed; top:0; left:0; position: absolute;');

 //we want to position our zombie exactly at the tip of the planet
   var top_position= $('#SZ0_0').height() * 0.435;

 //Xpos can be anywhere on our x axis
   var left_position = Math.floor(Math.random() * ($('#SZ0_0').width())-(ratio*50)) + (ratio*50); 

 //record this left position
   leftx_zombie[whichOne-1]=left_position;

 //let's position our zombie
   div.style.left = left_position+'px'; div.style.top = top_position+'px';
 //and the same for our bubble zombie
   div2.style.left = left_position+'px'; div2.style.top = top_position+'px';
 //and the same for our special effect SS
   div3.style.left = left_position+'px'; div3.style.top = top_position+'px'; 
  
 //give it an id
   div.id = 'zombie'+whichOne;
 //also for our bubble zombie
   div2.id = 'bubble_zombie'+whichOne;
 //also for our special effect SS
   div3.id = 'zombie_effect'+whichOne;
 

 //finally let's add our zombie to the screen
   //document.body.appendChild(div);  
     $('#SZ_maincontent').append(div); 
 //finally add in our bubble zombie to the screen too
   //document.body.appendChild(div2);
     $('#SZ_maincontent').append(div2); 
 //finally add in our special effect SS to the screen too
   document.body.appendChild(div3); 

 //put this new zombie through our SS function 
  setup_zombie_SS(whichOne);

 //put this new zombie through our animate function 
  // SZ_animateZombie(whichOne);
 
 //hide the bubble zombies at the start
   $("#bubble_zombie"+whichOne).css('transform','scale('+0+')');

//ensure no hits are registered on the special effects
$("#zombie_effect"+whichOne).css( 'pointer-events', 'none' );

 //set the zindex for the zombie
  $("#zombie"+whichOne).css("z-index", whichOne+100); 
 //set the zindex for the bubble zombie
  $("#bubble_zombie"+whichOne).css("z-index", whichOne);
 //set the zindex for the special effect SS
  $("#zombie_effect"+whichOne).css("z-index", whichOne+150);
 //ensure the zindex for the gun is the highest
  $("#SZ0_1").css("z-index", 200);
 //also ensure the zindex for the intro/gameover is the highest
  $("#SZ0_4").css("z-index", 201);   

 //bind the users mouse click to this zombie
 $("#zombie"+whichOne).bind('mousedown touchstart', function (e) { 
   //make sure the reload button is showing
    if($("#SZ0_2").css('opacity') != 1) {
	//first we want to fire the gun
         fireGun(event);
	//acknowledge the hit
if($("#zombie"+whichOne).css('opacity') != 0){
	 var offset = $(this).offset(); 
	  zombieHit(whichOne-1, e.pageX, e.pageY); 
}
      }
    });

//bind the users mouse click to the bubble zombie
 $("#bubble_zombie"+whichOne).bind('mousedown touchstart', function (e) { 
   //make sure the reload button is showing
    if($("#SZ0_2").css('opacity') != 1) {
	//first we want to fire the gun
         fireGun(event);
	 
      }
    });

 

}
 
//we need to keep track of the current scale values
 var scalex_zombie =  [0,0,0,0,0,0];
//we also need to keep track of the left position 
 var leftx_zombie =  [0,0,0,0,0,0]; 

//lets animate our zombie towards us
function SZ_animateZombie(whichOne){
 
    //assign the speed for each of our zombies
    var timex =  [13000,8000,16000,14000,10000,18000];

    //assign a user friendly name for our div
    var $zombiex = $("#zombie"+whichOne);

    //reset the zombies scale value
     $zombiex.css('transform','scale('+0+')'); 

    //reset the zombies opacity
     $zombiex.css({opacity:1});

    //work out the amount the zombie has to come towards us
     var amty =  ($(window).height()*0.7);// -($zombiex.height()*2));//topx);  
 
    //each type of zombie will have their own walking style
     var ZS_ease = ['easeInSine','easeOutQuart','easeInOutQuad','easeInSine','easeOutQuart','easeInOutQuad'];
 
     //finally we are ready to animate
       $zombiex.delay(timex[whichOne-1]/3).animate({ 
                 //first bring our zombie slowly down the screen 
                   left:   "+="+0.001+ "px",   
          },{ easing:ZS_ease[whichOne-1],  duration: timex[whichOne-1],

              step: function(now, fx){  
		//at each step we can manipulate the scale of our zombie
                if (fx.prop == "left") {
		    //work out the amount to scale 
                    var xx = (fx.pos)*16; 
			if(gameEnded==1){
				xx=999;
			}
   		//do a check to see if we should end this animation
			if(xx>15){
			  //stop all animation
			  $(this).stop();
			  //call a function to reset this zombie
			  //SZ_resetZombie(whichOne,0);
		          //gameOver   
                          $(this).css({opacity:0}); 
                          $(this).stop(true, true);
                          $(this).finish(); 
			 if(gameEnded==0 && xx!=999){ 
		          start_end_game(1);
			  }
		        } else {
		          //apply the scale    
                          $(this).css('transform','scale('+xx+')');  
			  //record this new scale value
			   scalex_zombie[whichOne-1]=xx; 

			  //check the depth levels
			    var i = 0;
			    while (i < 6) {
  			      //check to see if the scale is bigger 
				if(scalex_zombie[whichOne-1]>scalex_zombie[i] && ($(this).zIndex() < $("#zombie"+(i+1)).zIndex()) && scalex_zombie[i]!=0){ 
				var i_index = $("#zombie"+(i+1)).zIndex();
				//chg the i one first
				$("#zombie"+(i+1)).css("z-index", $(this).css( "z-index" )); 
				//now change this one
				$(this).css("z-index", i_index); 
				} //end of if
   			       i++;
			    }//end of while loop	
			} 
                 } 
              }, complete: function () {  
                }
            });   
}

//need to keep track of the current zindex for zombies
var zindex_current=0;

//a function to completely reset our zombie
function SZ_resetZombie(whichOne, zombieBubble_generate){
 
    //reset this zombies hit counter
     zombieHits_counter[whichOne-1]=0; 
 
    //assign a user friendly name for our div
     var $zombiex = $("#zombie"+whichOne); 

    //we need to stop this zombies animations
     $zombiex.stop();

    //we want to position our zombie exactly at the tip of the planet
     var top_position= $('#SZ0_0').height() * 0.435;

    //should we generate a bubble zombie?
     if(zombieBubble_generate==1){
	//assign a user friendly name for our bubble zombie div
         var $bubble_zombiex = $("#bubble_zombie"+whichOne);
        //let's re-position our bubble zombie to our stored value 
         $bubble_zombiex.css({top: top_position+'px',left: $zombiex.css("left"), opacity:1}); 
 
	//apply the scale    
         $bubble_zombiex.css('transform','scale('+scalex_zombie[whichOne-1]+')');
	//call our bubble zombie animation function
         bubbleZombie_flyAway(whichOne);
     }
    
    //Xpos can be anywhere on our x axis
     var left_position = Math.floor(Math.random() * ($('#SZ0_0').width())-(ratio*50)) + (ratio*50); 

    //record this left position
     leftx_zombie[whichOne-1]=left_position;

    //let's re-position our zombie
     $zombiex.css({top: top_position+'px', left: left_position+'px', opacity:0});

 //set the zindex for the zombie
zindex_current++; 
  $("#zombie"+whichOne).css("z-index", zindex_current); 

     //finally lets make the zombie come towards the screen again  
       if(zombieBubble_generate==0){ 
        SZ_animateZombie(whichOne);
	}

}
 