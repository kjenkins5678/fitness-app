// **********************************************
// keys for localStorage
// **********************************************
var fa_act = "fitness-app-activities";
var fa_activityList = "fa-activities-";
var fa_attributes = "fa-attributes-";
var openWeatherKey = "642722fdfe11197400af4a85e9c528a0"; 

var activityHistory = [];        // all history, used to storing 
var activityHistoryView = [];    // today only, optionally. This will be what the user sees

// **********************************************
// user attribute structure 
// **********************************************

var userAttributes; 

/*
userAttributes = {
   "age":"",
   "height":"",
   "weight":"",
   "gender":"",
   "activity_level":"",
   "goal":""
}

// **********************************************
// activity structure 
// **********************************************
/* = [
   // bicycling 
   {
      "date_added":"",
      "datetime_added":"", 
      "activity":"",
      "duration":"", 
      "duration_entry","",
      "met",
      "calories_per_hour":"",
      "calories_per_activity":""}];

*/

// **********************************************
// activity "DB"
// **********************************************
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

function getActivityMET (activity) {

console.log ("getActivityMET " + activity); 

   for (i=0; i<activityList.length; i++){

      if (activityList[i].activity == activity) {
         return activityList[i].met; 
      }

   }
} // getActivityMET

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
} // getActivityCategories

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
} // getActivities

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

} // getNumHours

function getNumMinutes (durationStr){

   var colonPos = durationStr.indexOf(":");
   if (colonPos==null || colonPos < 0){
      return -1; 
   }
   var numMinutes = durationStr.slice (colonPos + 1); 
   return numMinutes; 
} // getNumMinutes

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
}; // convertMinutesToDuration

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

// **********************************************
// load activity history, pass 'today' or 'all' 
// **********************************************

function loadActivityHistory (todayOrAll, activityDay, uName) {

   var activityStr = localStorage.getItem (fa_activityList + uName);
   if (activityStr == null || activityStr == "") {
      return;
   }

   activityHistory.length = 0;
   activityHistory = JSON.parse(activityStr); 

   if (todayOrAll == 'today'){

      for (i=0; i<activityHistory.length; i++){
  
         //alert ("data " + activityHistoryTmp[i].date_added + " argument " + activityDay); 

         activityHistoryView.length=0; 
         if (activityHistory[i].date_added == activityDay){
            activityHistoryView.push (activityHistory[i]);  
         }
      }
   }
   else {
      activityHistoryView = activityHistory; 
   }
}; // loadActivityHistory 

// **********************************************
// this is related to the openWeather data
// **********************************************

function getCardinalDirection (deg){
   if (deg >= 000 && deg <= 020){
      return 'North';
   }
   else if (deg >= 021 && deg <= 070){
      return 'NorthEast';
   }
   else if (deg >= 071 && deg <= 115){
      return 'East';
   }
   else if (deg >= 116 && deg <= 150){
      return 'SouthEast';
   }
   else if (deg >= 151 && deg <= 200){
      return 'South';
   }
   else if (deg >= 201 && deg <= 250){
      return 'SouthWest';
   }
   else if (deg >= 251 && deg <= 290){
      return 'West';
   }
   else if (deg >= 291 && deg <= 340){
      return 'NorthWest';
   }
   else if (deg >= 341 && deg <= 360){
      return 'North';
   }
}

// **********************************************
// **********************************************

/*
var dayStr = moment().format ('MM/DD/YYYY');

var myActivityObj = {
   "date_added":"1/4/2020",
   "datetime_added":"1/4/2020 14:00",
   "activity":"Weight Training",
   "duration":"90", 
   "met":"5",
   "calories_per_hour":"455",
   "calories_per_activity":"682.5" 
};
activityHistory.push (myActivityObj);

var myActivityObj = {
   "date_added":"1/4/2020",
   "datetime_added":"1/4/2020 10:45",
   "activity":"Rowing",
   "duration":"45", 
   "met":"4.8",
   "calories_per_hour":"436.8",
   "calories_per_activity":"327.6" 
};
activityHistory.push (myActivityObj);

var myActivityObj = {
   "date_added":"1/4/2020",
   "datetime_added":"1/4/2020 18:00",
   "activity":"Bowling",
   "duration":"120", 
   "met":"3.8",
   "calories_per_hour":"345.8",
   "calories_per_activity":"691.6" 
};
activityHistory.push (myActivityObj);

var activityStr = JSON.stringify(activityHistory); 
console.log (activityStr); 
localStorage.setItem(fa_act, activityStr); 

*/ 

