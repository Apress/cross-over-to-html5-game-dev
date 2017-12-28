//global vars
  //need to store the ratio
    var ratio;
  //need easy access to the width
    var newWidth;
//function that gets called when game starts
$(window).load(function () {  
    //need to grab an instance of our screen
    var div = $(window); 
    //we can now work out the ratio
    ratio = (div.width() / 1024); 
    //while we are here we can grab the width for future use
   newWidth = div.width();
     
    //lets apply the ratio to our elements
    main_call_setupContent();
});