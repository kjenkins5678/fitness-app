var activityList = [
   // bicycling 
   {
      "activity":"Bicycling - mountain",
      "category":"Bicycling",
      "met":"14"
   },
   {
      "activity":"Bicycling - competitive",
      "category":"Bicycling",
      "met":"16"
   },
   {
      "activity":"Bicycling - general",
      "category":"Bicycling",
      "met":"7.5"
   },
   {
      "activity":"Bicycling - leisurely",
      "category":"Bicycling",
      "met":"3.5"
   },
   {
      "activity":"Unicycling",
      "category":"Bicycling",
      "met":"5"
   },
   {
      "activity":"Stationary Bike - vigorous",
      "category":"Bicycling",
      "met":"8.8"
   },
   {
      "activity":"Stationary Bike - general",
      "category":"Bicycling",
      "met":"7"
   },
   {
      "activity":"Unicycling",
      "category":"Bicycling",
      "met":"5"
   },
   // conditioning
   {
      "activity":"Calisthenics - general",
      "category":"Conditioning",
      "met":"8"
   },
   {
      "activity":"Circuit Training",
      "category":"Conditioning",
      "met":"4.3"
   },
   {
      "activity":"Elliptical Trainer",
      "category":"Conditioning",
      "met":"5"
   },
   {
      "activity":"Rowing",
      "category":"Conditioning",
      "met":"4.8"
   },
   {
      "activity":"Weight Training",
      "category":"Conditioning",
      "met":"5"
   },
   {
      "activity":"Pilates",
      "category":"Conditioning",
      "met":"3"
   },
   {
      "activity":"Water Aerobics",
      "category":"Conditioning",
      "met":"5.3"
   },
   {
      "activity":"Yoga",
      "category":"Conditioning",
      "met":"3"
   },
   // running 
   {
      "activity":"Jogging",
      "category":"Running",
      "met":"7"
   },
   {
      "activity":"Running - moderate",
      "category":"Running",
      "met":"11.8"
   },
   {
      "activity":"Running - vigorous",
      "category":"Running",
      "met":"19"
   },
   // sports
   {
      "activity":"Basketball",
      "category":"Sports",
      "met":"8"
   },
   {
      "activity":"Bowling",
      "category":"Sports",
      "met":"3.8"
   },
   {
      "activity":"Boxing",
      "category":"Sports",
      "met":"12.8"
   },
   {
      "activity":"Football - recreational",
      "category":"Sports",
      "met":"8"
   },
   {
      "activity":"Golf",
      "category":"Sports",
      "met":"4.8"
   },
   {
      "activity":"Hockey",
      "category":"Sports",
      "met":"8"
   },
   {
      "activity":"Rock Climbing",
      "category":"Sports",
      "met":"5.8"
   },
   {
      "activity":"Soccer",
      "category":"Sports",
      "met":"7"
   },
   {
      "activity":"Tennis",
      "category":"Sports",
      "met":"7"
   },
   // water activities
   {
      "activity":"Canoeing",
      "category":"Water Activities",
      "met":"5.8"
   },
   {
      "activity":"Surfing",
      "category":"Water Activities",
      "met":"3"
   },
   {
      "activity":"Swimming - vigorous",
      "category":"Water Activities",
      "met":"9.8"
   },
   // winter activities 
   {
      "activity":"Ice Skating",
      "category":"Winter Activities",
      "met":"7"
   },
   {
      "activity":"Cross Country Skiing",
      "category":"Winter Activities",
      "met":"9"
   },
   {
      "activity":"Downhill Skiing",
      "category":"Winter Activities",
      "met":"5.3"
   },
   // walking 
   {
      "activity":"Backpacking",
      "category":"Walking",
      "met":"7"
   },
   {
      "activity":"Hiking",
      "category":"Walking",
      "met":"5.3"
   },
   {
      "activity":"Race Walking",
      "category":"Walking",
      "met":"6.5"
   },
   {
      "activity":"Walking - leisurely",
      "category":"Walking",
      "met":"4"
   },
   {
      "activity":"Walking - vigorous",
      "category":"Walking",
      "met":"5"
   }
]; 

// **********************************************
// **********************************************

function getActivityCategories () {

   var catList = []; 
   for (i=0; i<activityList.length; i++){
      if (catList.indexOf (activityList[i].category) == -1){
         catList.push (activityList[i].category); 
      }
   }
   return catList; 
}

// **********************************************
// **********************************************

function getActivities (category){
   var catActivityList = []; 
   for (i=0; i<activityList.length; i++){
      if (activityList[i].category == category && catActivityList.indexOf (activityList[i].activity) == -1){
         catActivityList.push (activityList[i].activity); 
      }
   }
   return catActivityList;
}

// **********************************************
// convert hh:mm or :mm string to number of minutes 
// **********************************************

function getNumHours (durationStr){

   var colonPos = durationStr.indexOf(":");
   if (colonPos==null || colonPos < 0){
      return -1; 
   }
   // no hour entered, return 0
   if (colonPos == 0) {
      return 0; 
   }

   var numHours = durationStr.slice(0,colonPos);
   return numHours; 

}

function getNumMinutes (durationStr){

   var colonPos = durationStr.indexOf(":");
   if (colonPos==null || colonPos < 0){
      return -1; 
   }
   var numMinutes = durationStr.slice (colonPos + 1); 
   return numMinutes; 
}

// **********************************************
// convert number of minutes to hh:mm or :mm string 
// **********************************************

function convertMinutesToDuration (totalMinutes){

   var durationStr = "";  

   var numHours = parseInt (totalMinutes / 60);
   var numMinutes = parseInt(totalMinutes % 60);

   //alert ('h ' + numHours + ' m ' + numMinutes); 

   if (numHours == 0){
      durationStr = ':' + numMinutes;
   }
   else {
      durationStr = numHours + ":" + numMinutes;   
   }
   return durationStr; 
} // convertMinutesToDuration

// **********************************************
// convert hh:mm or :mm string to number of minutes 
// **********************************************

function convertDurationToMinutes (durationStr){

   var totalMinutes = 0; 

   var numHours = getNumHours(durationStr);
   var numMinutes = getNumMinutes(durationStr); 
   //alert ('h ' + numHours + ' m ' + numMinutes); 

   totalMinutes = parseInt ((numHours * 60)) + parseInt (numMinutes); 
   return totalMinutes; 
} // convertDurationToMinutes

/*

   {
      "activity":"",
      "category":"",
      "met":""
   },

   {
      "activity":"",
      "category":"",
      "met":""
   }

*/ 