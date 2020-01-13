// **********************************************
// geolocation
// **********************************************

// **********************************************
// globals
// **********************************************

var latitude;
var longitude;

// **********************************************
// **********************************************

function getLatitude () {
   return latitude;
}; // getLatitude

// **********************************************
// **********************************************

function getLongitude () {
   return longitude;
}; // getLongitude

// **********************************************
// **********************************************

function getLocation() {

  // Make sure browser supports this feature
  if (navigator.geolocation) {
  
    // Provide our loadPosition() function to getCurrentPosition
    navigator.geolocation.getCurrentPosition (loadPosition);
  }
  else {
    alert ("Geolocation is not supported by this browser.");
  }
} // getLocation

// **********************************************
// This will get called after getCurrentPosition()
// **********************************************

function loadPosition (position) {

  // Grab coordinates from the given object
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log ("Your coordinates are Latitude: " + latitude + " Longitude " + longitude);

  locationFound (); 

} // loadPosition

