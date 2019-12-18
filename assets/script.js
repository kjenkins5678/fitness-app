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

var targetFatGPDElem = $("#target-fat-gpd"); 
var targetCarbsGPDElem = $("#target-carbs-gpd"); 
var targetProteinGPDElem = $("#target-protein-gpd"); 
var targetCaloriesGPDElem = $("#target-calories-gpd"); 

// **********************************************
// functions
// **********************************************

// **********************************************
// edit inputs 
// **********************************************

function editInputs (){

   if (ageInputElem.val() == "" || ageInputElem.val() == null) {
      alert("You must enter an age. Please retry"); 
      return false; 
   }
   if (ageInputElem.val() <18 || ageInputElem.val() > 105) {
      alert("Age invalid. Please retry"); 
      return false; 
   }

   if (heightInputElem.val() == "" || heightInputElem.val() == null) {
      alert("You must enter a height. Please retry"); 
      return false; 
   }
   if (heightInputElem.val() <48 || heightInputElem.val() > 96) {
      alert("Height invalid. Please retry"); 
      return false; 
   }

   if (weightInputElem.val() == "" || weightInputElem.val() == null) {
      alert("You must enter a weight. Please retry"); 
      return false; 
   }
   if (weightInputElem.val() <80 || weightInputElem.val() > 600) {
      alert("Weight invalid. Please retry"); 
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

   alert ("age " + ageInputElem.val() 
      + " height " + heightInputElem.val()
      + " weight " + weightInputElem.val()
      + " gender " + genderInputElem.val()
      + " act level " + activityLevelInputElem.val()
      + " goal " + goalInputElem.val()
      + " cpd " + calsPerDay
      + " tdee " + tdee); 

} // calculateMacros

// **********************************************
// init 
// **********************************************

function init () {

   var catList = getActivityCategories();
   console.log (catList); 
   
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

