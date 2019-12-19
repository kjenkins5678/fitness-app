// **********************************************
// globals
// **********************************************
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

var targetFatGPDElem = $("#target-fat-gpd"); 
var targetCarbsGPDElem = $("#target-carbs-gpd"); 
var targetProteinGPDElem = $("#target-protein-gpd"); 
var targetCaloriesGPDElem = $("#target-calories-gpd"); 

var errorText = $("#myModalErrorText"); 

// **********************************************
// functions
// **********************************************

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

   var catList = getActivityCategories();
   console.log (catList); 
   
	//$("#myModal").modal('show');

}; // init 

// **********************************************
// listeners
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
// main
// **********************************************

$(document).ready(function() {
   init ();
});

