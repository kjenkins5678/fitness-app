// **********************************************
// globals
// **********************************************
var catList; 

var calculateBtnElem = $("#calculateButton"); 

var nameInputElem = $("#nameInput"); 
var ageInputElem = $("#ageInput");
var heightInputElem = $("#heightInput");
var weightInputElem = $("#weightInput");
var genderButtonElem = $("#genderButton"); 
var genderInputElem = $("#genderInput");
var activityLevelInputElem = $("#activityLevelInput");
var goalInputElem = $("#goalInput");

var heightCM = 0; 
var weightKG = 0; 
var calsPerDay = 0; 
var tdee = 0; 
var fatPerDay = 0;
var carbsPerDay = 0; 
var proteinPerDay = 0;
var actualFat = 0;
var actualCarbs = 0;
var actualProtein = 0;
var actualCalories = 0;

var targetFatGPDElem = $("#target-fat-gpd"); 
var targetCarbsGPDElem = $("#target-carbs-gpd"); 
var targetProteinGPDElem = $("#target-protein-gpd"); 
var targetCaloriesGPDElem = $("#target-calories-gpd"); 

var errorText = $("#myModalErrorText"); 

var errorModalCloseElem = $(".error-modal-close"); 
var addActivityButtonElem = $("#addActivityButton"); 
var addActivityModalCloseElem = $(".activity-modal-close"); 
var activityCategoryInputElem = $("#activityCategoryInput"); 
var activityInputElem = $("#activityInput"); 
var durationInputElem = $("#durationInput");
var viewWeatherButtonElem = $("#viewWeatherButton"); 
var getAttributesButtonElem = $("#getAttributesButton"); 

var apiQueryStr = "for breakfast i ate 2 eggs, bacon, and french toast"

var exerciseBoxElem = $("#exerciseBox"); 

var lat; 
var lon; 

var forecast = {
   description:"",
   temp:"", 
   temp_min:"", 
   temp_max:"", 
   deg:"", 
   direction:"",
   speed:"", 
   cloud_cover_pct:""
}; 
var weaxCurrTempElem = $("#weaxCurrTemp"); 
var weaxMinTempElem = $("#weaxMinTemp"); 
var weaxMaxTempElem = $("#weaxMaxTemp"); 
var weaxDescriptionElem = $("#weaxDescription"); 
var weaxWindSpeedElem = $("#weaxWindSpeed");
var weaxWindDirectionElem = $("#weaxWindDirection");
var weaxCloudCoverPctElem = $("#weaxCloudCoverPct");
var weaxIconElem = $("#weaxIcon"); 

// **********************************************
// functions
// **********************************************

// **********************************************
// editActivityInputs
// **********************************************

function editActivityInputs (){

   var found; 
   
   found = false; 
   for (i=0;i<activityList.length; i++){

      if (activityList[i].activity == activityInputElem.val()){
         found = true; 
         break; 
      } 
   }
   if (found == false) {
      errorText.text("Activity is invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   var durationStr = durationInputElem.val().trim (); 

   if (durationStr =="" || durationStr == null){
      errorText.text("You must enter a duration. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   if (durationStr.indexOf(":")==-1){
      errorText.text("Duration must be in hh:mm or :mm format. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   var numHours = getNumHours(durationStr);
   if (isNaN(numHours) || numHours > 24){
      errorText.text("Duration hours is invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   var numMinutes = getNumMinutes(durationStr);
   if (isNaN(numMinutes) || numMinutes <0 || numMinutes > 59){
      errorText.text("Duration minutes is invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

} // editActivityInputs 

// **********************************************
// editInputs
// **********************************************

function editInputs (){

   if (ageInputElem.val() == "" || ageInputElem.val() == null) {
      errorText.text("You must enter an age. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   if (ageInputElem.val() <18 || ageInputElem.val() > 105) {
      errorText.text("Age invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   if (heightInputElem.val() == "" || heightInputElem.val() == null) {
      errorText.text("You must enter a height. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }
   if (heightInputElem.val() <48 || heightInputElem.val() > 96) {
      errorText.text("Height invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   if (weightInputElem.val() == "" || weightInputElem.val() == null) {
      errorText.text("You must enter a weight. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

   if (weightInputElem.val() <80 || weightInputElem.val() > 600) {
      errorText.text("Weight invalid. Please retry"); 
      $("#myModal").modal('show');
      return false;
   }

} // editInputs

// **********************************************
// calculateCalsPerDay
// **********************************************

function calculateCalsPerDay() {

   heightCM = heightInputElem.val() * 2.54; 
   weightKG = weightInputElem.val () * 2.205; 

   calsPerDay = Math.round ((10 * weightKG) + (6.25 * heightCM) - (5 * ageInputElem.val())); 
   if (genderInputElem.val () == 'Male'){
        calsPerDay += 5;
   }
   else if (genderInputElem.val() == 'Female') {
      calsPerDay -= 161; 
   }

   targetCaloriesGPDElem.text(calsPerDay); 

} // calculateCalsPerDay

// **********************************************
// calculateMacros
// **********************************************

function calculateMacros (){

   calculateCalsPerDay(); 

   switch(activityLevelInputElem.val()){
   case 'Sedentary':
      tdee = calsPerDay * 1.01; 
      break; 
   case 'Moderate':
      tdee = calsPerDay * 1.05;  
      break; 
   case 'Vigorous':
      tdee = calsPerDay * 1.1; 
      break; 
   default: 
      tdee = calsPerDay * 1.01; 
      break; 
   };
   tdee = Math.round(tdee); 

   switch(goalInputElem.val()){
   case "Lose Weight":
      fatPerDay = tdee * .13;
      carbsPerDay = tdee * .12;
      proteinPerDay = tdee * .14;
      break;
   case "Gain":
      fatPerDay = tdee * .3;
      carbsPerDay = tdee * .23;
      proteinPerDay = tdee * .18;
      break;
   case "Recomp":
      fatPerDay = tdee * .15;
      carbsPerDay = tdee * .14;
      proteinPerDay = tdee * .14;
      break;
   }
   fatPerDay = Math.round (fatPerDay / 4); 
   carbsPerDay = Math.round (carbsPerDay / 4); 
   proteinPerDay = Math.round (proteinPerDay / 4);

   targetCarbsGPDElem.text(carbsPerDay);  
   targetProteinGPDElem.text(proteinPerDay);  
   targetFatGPDElem.text(fatPerDay); 

} // calculateMacros

// **********************************************
// loadActivityHistoryView
// **********************************************

function loadActivityHistoryView () {

   //exerciseBoxElem.empty(); 

   if (JSON.stringify(activityHistoryView) == null || JSON.stringify(activityHistoryView) == "") {
      return; 
   }

   $(".activityRow").remove();
   if (activityHistoryView.length > 0){

      for (i=0; i<activityHistoryView.length; i++){

         var myRow = $('<div class="row-fluid activityRow">'); 

         var myCol = $('<div class="col-lg-6">'); 
         myCol.text (activityHistoryView[i].activity); 
         myRow.append(myCol); 

         var myCol = $('<div class="col-lg-3">'); 
         myCol.text (activityHistoryView[i].duration_entry); 
         myRow.append(myCol); 

         var myCol = $('<div class="col-lg-3">'); 
         myCol.text (activityHistoryView[i].calories_per_activity); 
         myRow.append(myCol); 

         exerciseBoxElem.append(myRow); 

      }
   }
} // loadActivityHistoryView

// **********************************************
// **********************************************

function getCurrentWeather (){

   var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="
      + lat + "&lon=" + lon + "&units=imperial&appid=" + openWeatherKey;

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response) {

      forecast.description = response.weather[0].description; 
      forecast.temp = Math.round (response.main.temp);  
      forecast.temp_min = Math.round (response.main.temp_min); 
      forecast.temp_max = Math.round (response.main.temp_max); 
      forecast.deg = response.wind.deg;  
      forecast.direction = getCardinalDirection(response.wind.deg); 
      forecast.speed = Math.round (response.wind.speed);  
      forecast.cloud_cover_pct = response.clouds.all; 

      //console.log (forecast); 

      weaxDescriptionElem.text(forecast.description); 
      weaxCurrTempElem.text(forecast.temp + '\xB0'); 
      weaxMinTempElem.text(forecast.temp_min + '\xB0'); 
      weaxMaxTempElem.text(forecast.temp_max + '\xB0'); 

      weaxWindSpeedElem.text(forecast.speed + 'mph');
      weaxWindDirectionElem.text(forecast.direction);
      weaxCloudCoverPctElem.text(forecast.cloud_cover_pct + '%');

      weaxIconElem.attr("src",  "https://openweathermap.org/img/wn/"
            + response.weather[0].icon 
            + "@2x.png");

   }); 
}; // getCurrentWeather

// **********************************************
// gotta have it. called by getLocation in location.js. (Theres got to be a better way to do this)
// **********************************************

function locationFound () {

   lat = getLatitude ();
   lon = getLongitude (); 
   getCurrentWeather();

}      

// **********************************************
// init 
// **********************************************

function init () {

   getLocation(); 
   catList = getActivityCategories();

}; // init 

// **********************************************
// Update Actuals with Nutrition Information
// **********************************************

function UpdateActualsNutrition () {
   $("#actual-fat").text(Math.round(actualFat));
   $("#actual-carbs").text(Math.round(actualCarbs));
   $("#actual-protein").text(Math.round(actualProtein));
   $("#actual-calories").text(Math.round(actualCalories));
};

// **********************************************
// Call Nutritionix
// **********************************************

function CallNutritionix () {
   var settings = {
      "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "x-app-id": "045860e3",
        "x-app-key": "c32b88786979d5b33948d3010f469a5a",
        "x-remote-user-id": "0",
        "content-type": "application/json"
      },
      "data": JSON.stringify({"query":apiQueryStr}),
    };
    
    $.ajax(settings).done(function (response) {

      for (i = 0; i<response.foods.length; i++){

         // console.log(response.foods[i].food_name);

         //Get the calories, add to actualCalories
         actualCalories += response.foods[i].nf_calories;
         // console.log("calories: " + response.foods[i].nf_calories);

         //Get the fat, add to actualFat
         actualFat = actualFat + response.foods[i].nf_total_fat;
         // console.log("fat: " + response.foods[i].nf_total_fat);

         //Get the carbs, add to actualCarbs
         actualCarbs += response.foods[i].nf_total_carbohydrate;
         // console.log("carbs: " + response.foods[i].nf_total_carbohydrate);

         //Get the protein, add to actualCarbs
         actualProtein += response.foods[i].nf_protein;
         // console.log("protein: " + response.foods[i].nf_protein);
      };

      // console.log("totals: cal - " + actualCalories + " fat - " + actualFat +  " carbs - " + actualCarbs + " fat - " + actualFat);
      
      UpdateActualsNutrition();

    });
};

// **********************************************
// Update Actuals with Exercise Information
// **********************************************

function UpdateActualsExercise () {
   var stored = JSON.parse(localStorage.getItem("fitness-app-activities"));
   if (stored !== null){ // do only if storage is not null
   
      var dt = new Date(); //get the current date
      
      for (i=0; i<stored.length; i++){ //iterate through the local storage list
         
         if (stored[i].date_added == (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear()){ //find entries that match todays date
            console.log(parseInt(stored[i].calories_per_activity));
            actualCalories += (parseInt(stored[i].calories_per_activity)) * -1;
         };
      };
   };
   
}; // UpdateActualsExercise

// **********************************************
// listeners
// **********************************************

// **********************************************
// get stats button  
// **********************************************

getAttributesButtonElem.on("click", function () {

   if (nameInputElem.val().trim() == null || nameInputElem.val().trim() == ""){
      return;
   }
   var lsKey = fa_attributes + nameInputElem.val().trim().toLowerCase(); 

   ageInputElem.val("");
   heightInputElem.val("");
   weightInputElem.val("");
   genderInputElem.val("Female");
   activityLevelInputElem.val("Sedentary");
   goalInputElem.val("Lose Weight");
   $(".activityRow").remove();

   var str = localStorage.getItem (lsKey);
   if (str == null || str == ""){
      return;
   }
   userAttributes = JSON.parse(str);

   ageInputElem.val(userAttributes.age);
   heightInputElem.val(userAttributes.height);
   weightInputElem.val(userAttributes.weight);
   genderInputElem.val(userAttributes.gender);
   activityLevelInputElem.val(userAttributes.activity_level);
   goalInputElem.val(userAttributes.goal);

   // does this user have any activity history?
   var dayStr = moment().format ('MM/DD/YYYY');
   loadActivityHistory ('today', dayStr, nameInputElem.val().trim().toLowerCase()); 
   console.log (activityHistory); 
   loadActivityHistoryView (); 

}); // getAttributesButtonElem.on("click"

// **********************************************
// calculate button  
// **********************************************

calculateBtnElem.on("click", function () {

   var validInput = editInputs(); 
   if (validInput == false){
      return;
   }

   // wwrite user data 
   userAttributes = {
      age:ageInputElem.val().trim(),  
      height:heightInputElem.val().trim(),
      weight:weightInputElem.val().trim(),
      gender:genderInputElem.val(),
      activity_level:activityLevelInputElem.val(),
      goal:goalInputElem.val()
   }; 

   var lsKey = fa_attributes + nameInputElem.val().trim().toLowerCase();

   var str = JSON.stringify(userAttributes); 
   localStorage.setItem(lsKey, str); 

   calculateMacros();

}); // calculateBtnElem.on("click"

// **********************************************
// experiment with closing a modal 
// **********************************************

errorModalCloseElem.on("click", function () {

   //alert ("errorModalCloseElem"); 

}); 

// **********************************************
// open activity add modal  
// **********************************************

addActivityButtonElem.on("click", function () {

   activityCategoryInputElem.empty(); 
   durationInputElem.empty();
   activityInputElem.empty(); 

   $("#myActivityModal").modal('show');

   for (i=0;i<catList.length;i++){
      var newOption = $("<option>")
      newOption.text(catList[i]); 
      activityCategoryInputElem.append(newOption); 

   }
}); 

// **********************************************
// open weather modal  
// **********************************************

viewWeatherButtonElem.on("click", function () {

   $("#myWeatherModal").modal('show');

});

// **********************************************
// close the activity modal. edit them, add the new one if edits pass   
// **********************************************

addActivityModalCloseElem.on("click", function () {

   var rc = editActivityInputs(); 
   if (rc==false){
      return; 
   }

   // convert duration input string to minutes 
   var durationMin = convertDurationToMinutes(durationInputElem.val().trim()); 

   // load the object 
   var dayStr = moment().format ('MM/DD/YYYY');
   var myActivityObj = {};
   myActivityObj.date_added = dayStr; 
   myActivityObj.datetime_added = moment().format ('MM/DD/YYYY HH:mm:ss'); 
   myActivityObj.activity = activityInputElem.val(); 
   myActivityObj.duration = durationMin; 
   myActivityObj.duration_entry = durationInputElem.val().trim(); 
   myActivityObj.met = getActivityMET (myActivityObj.activity); 

   var calTmp = myActivityObj.met * weightKG;
   myActivityObj.calories_per_hour = Math.round (calTmp);  
   myActivityObj.calories_per_activity = Math.round (calTmp * (durationMin / 60));  

   // add it to the viewing structure
   activityHistoryView.unshift (myActivityObj); 
   loadActivityHistoryView(); 

   for (i=0;i<activityHistoryView.length;i++){
      //console.log ('ahv\n' + activityHistoryView[i].activity); 
   }

   // add it to local storage 
   activityHistory.unshift (myActivityObj); 
   var activityStr = JSON.stringify (activityHistory); 
   localStorage.setItem (fa_activityList + nameInputElem.val().trim().toLowerCase(), activityStr); 

}); // addActivityModalCloseElem.on("click"

// **********************************************
// **********************************************

activityCategoryInputElem.on("change", function (){

   activityInputElem.empty(); 

   var catActivityList = getActivities(activityCategoryInputElem.val()); 
   console.log (catActivityList); 

   for (i=0;i<catActivityList.length;i++){
      var newOption = $("<option>")
      newOption.text(catActivityList[i]); 
      activityInputElem.append(newOption); 

   }
});
 
// **********************************************
// main
// **********************************************

$(document).ready(function() {
   init ();
   // CallNutritionix();
   UpdateActualsExercise();

   $("#addNutritionButton").on("click", function() {

      event.preventDefault();
    
      text_test = $("#textBox").val();
      console.log(text_test);

   })

});

