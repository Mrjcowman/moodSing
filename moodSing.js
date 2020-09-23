// get request for [encrypted] spotify api secret
// ====================================================================
// tag for call to spotify playlist request

// location api
// ====================================================================
// current location variable = long/lat (from navigator)
function browserSupportsGeolocation {
    if (navigator.geolocation) {
        showPrompt = function(){$("#location-prompt").attr("style","block")}, 
    } else {
        // Latitude and longitude of UW Campus
        console.log("Does not support geo");
        console.log(47.655548,-122.303200);
    }

}
$("#buttonLocate").on("click", function (event) {
    event.preventDefault();
    let positionStart,
        showPrompt = function(){$("#location-prompt").attr("style","block")},
        hidePrompt = function(){$("#location-prompt").attr("style","none")},
        promptTimeOut = setTimeout(showPrompt, 6000),
        geoSuccess = function(position){
          hidePrompt
          clearTimeout(promptTimeOut);
          positionStart = position;
          let lat = positionStart.coords.latitude;
          let lon = positionStart.coords.longitude;
          console.log(lat,lon);
        },
        geoError = function(error){
          switch (error.code) {
            case error.TIMEOUT:
              showPrompt
              break;
          }
        };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  })



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