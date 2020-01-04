// **********************************************
// globals
// **********************************************
var catList; 

var calculateBtnElem = $("#calculateButton"); 

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

var apiQueryStr = "for breakfast i ate 2 eggs, bacon, and french toast"

var exerciseBoxElem = $("#exerciseBox"); 

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

      //alert ('ip ' + activityInputElem.val() + " list " + activityList[i].activity);   
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

   //alert (durationInputElem.val()); 
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
   weightKG = weightInputElem.val () * 0.453592; 

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
      tdee = calsPerDay * 1.2; 
      break; 
   case 'Moderate':
      tdee = calsPerDay * 1.55 
      break; 
   case 'Vigorous':
      tdee = calsPerDay * 1.725; 
      break; 
   default: 
      tdee = calsPerDay * 1.2; 
      break; 
   };
   tdee = Math.round(tdee); 

   switch(goalInputElem.val()){
   case "Lose Weight":
      fatPerDay = tdee * .3;
      carbsPerDay = tdee * .35;
      proteinPerDay = carbsPerDay;
      break;
   case "Gain":
      fatPerDay = tdee * .2;
      carbsPerDay = tdee * .5;
      proteinPerDay = tdee * .3;
      break;
   case "Recomp":
      fatPerDay = tdee * .33;
      carbsPerDay = tdee * .33;
      proteinPerDay = tdee * .34;
      break;
   }
   fatPerDay = Math.round (fatPerDay / 4); 
   carbsPerDay = Math.round (carbsPerDay / 4); 
   proteinPerDay = Math.round (proteinPerDay / 4);

   /*alert ("age " + ageInputElem.val() 
      + " height " + heightInputElem.val()
      + " weight " + weightInputElem.val()
      + " gender " + genderInputElem.val()
      + " act level " + activityLevelInputElem.val()
      + " goal " + goalInputElem.val()
      + " cpd " + calsPerDay
      + " tdee " + tdee
      + " fpd " + fatPerDay
      + " ppd " + proteinPerDay
      + " cpd " + carbsPerDay
      ); 
   */
  
   targetCarbsGPDElem.text(carbsPerDay);  
   targetProteinGPDElem.text(proteinPerDay);  
   targetFatGPDElem.text(fatPerDay); 

} // calculateMacros

// **********************************************
// init 
// **********************************************

function init () {

   catList = getActivityCategories();
   //console.log (catList); 
   
   var dayStr = moment().format ('MM/DD/YYYY');
   loadActivityHistory (0, dayStr); 
   console.log (activityHistory); 

   if (activityHistory.length > 0){

      for (i=0; i<activityHistory.length; i++){

         var myRow = $('<div class="row">'); 

         var myCol = $('<div class="col-lg-4">'); 
         myCol.text (activityHistory[i].activity); 
         myRow.append(myCol); 

         var myCol = $('<div class="col-lg-4">'); 
         myCol.text (activityHistory[i].duration); 
         myRow.append(myCol); 

         var myCol = $('<div class="col-lg-4">'); 
         myCol.text (activityHistory[i].calories_per_activity); 
         myRow.append(myCol); 

         exerciseBoxElem.append(myRow); 

      }

   }

	//$("#myModal").modal('show');

}; // init 

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

         console.log(response.foods[i].food_name);

         //Get the calories, add to actualCalories
         actualCalories += response.foods[i].nf_calories;
         console.log("calories: " + response.foods[i].nf_calories);

         //Get the fat, add to actualFat
         actualFat += response.foods[i].nf_total_fat;
         console.log("fat: " + response.foods[i].nf_total_fat);

         //Get the carbs, add to actualCarbs
         actualCarbs += response.foods[i].nf_total_carbohydrate;
         console.log("carbs: " + response.foods[i].nf_total_carbohydrate);

         //Get the protein, add to actualCarbs
         actualProtein += response.foods[i].nf_protein;
         console.log("protein: " + response.foods[i].nf_protein);
      };

      console.log("totals: cal - " + actualCalories + " fat - " + actualFat +  " carbs - " + actualCarbs + " fat - " + actualFat);
   
    });
};

// **********************************************
// listeners
// **********************************************

// **********************************************
// calculate button  
// **********************************************

calculateBtnElem.on("click", function () {

   //alert ("here"); 
   var validInput = editInputs(); 
   if (validInput == false){
      return;
   }
   calculateMacros();

}); 

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

   //alert ("add activity"); 
   $("#myActivityModal").modal('show');

   for (i=0;i<catList.length;i++){
      var newOption = $("<option>")
      newOption.text(catList[i]); 
      //console.log(newOption); 
      activityCategoryInputElem.append(newOption); 

   }

}); 

// **********************************************
// experiment with closing a modal 
// **********************************************

addActivityModalCloseElem.on("click", function () {

   console.log ("user hit OK on activity modal");
   editActivityInputs(); 

   // convert duration input string to minutes 
   var durationMin = convertDurationToMinutes(durationInputElem.val().trim()); 
   alert (durationMin); 

}); 

activityCategoryInputElem.on("change", function (){

   activityInputElem.empty(); 

   //alert ("ok, category selected " + activityCategoryInputElem.val()); 
   var catActivityList = getActivities(activityCategoryInputElem.val()); 
   console.log (catActivityList); 

   for (i=0;i<catActivityList.length;i++){
      var newOption = $("<option>")
      newOption.text(catActivityList[i]); 
      //console.log(newOption); 
      activityInputElem.append(newOption); 

   }
});

// **********************************************
// main
// **********************************************

$(document).ready(function() {
   init ();
   //alert (convertMinutesToDuration(255)); 
   CallNutritionix();
});

