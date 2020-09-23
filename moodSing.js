// get request for [encrypted] spotify api secret
// ====================================================================
// tag for call to spotify playlist request

// location api
// ====================================================================
// current location variable = long/lat (from navigator)



// weather api
// ====================================================================
// get request with location variable for current weather
// will need lat/long from weather api
// test location gridLocater(37.6752, -120.9465)
function gridLocater(lat, lon) {
  $.get(`https://api.weather.gov/points/${lat},${lon}`, function (grid) {
    localForecast(grid);
  });
}
function localForecast(grid) {
  $.get(`https://api.weather.gov/gridpoints/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`, function (forecast) {
    console.log(forecast.properties.periods[0].shortForecast);
    return forecast.properties.periods[0].shortForecast
  });
}




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