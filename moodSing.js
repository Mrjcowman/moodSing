// get request for [encrypted] spotify api secret
// ====================================================================
// tag for call to spotify playlist request

// location api
// ====================================================================
// current location variable = long/lat (from navigator)
function browserSupportsGeolocation {
    if (navigator.geolocation) {
        console.log("Supports Geo"); 
    } else {
        // Latitude and longitude of UW Campus
        console.log("Does not support geo");
        console.log(47.655548,-122.303200);
    }

}



// weather api
// ====================================================================
// get request with location variable for current weather
// will need lat/long from weather api



// background/theme change 
// ====================================================================
// switch statement to apply backrground/theme change
// switch(expression) {
//     case sunny:
//       (content)=sunnyWeatherTheme
//       break;
//     case cloudy:
//       (content)=cloudyWeatherTheme
//       break;
//     default:
//       (content)=defaultAppTheme
//   }

// render page
// ====================================================================
// initial render
// prompts-weather
//        -genre
//        -mood
// render playlists


// event.listener to pull input from user
// ====================================================================


// mood
// ====================================================================
// take user input to match with a preset mood
// pull spotify perameters for preset mood from mood.js


// mood.js
// ====================================================================
// object relating moods to spotify perameters







// spotify api 
// ====================================================================
// take in request from user on search
// returns widget data from spotify search