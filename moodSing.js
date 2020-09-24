// Closure for the Access Token to keep it from being directly accessed by user
function makeAccessToken(accessToken){
  let aT = accessToken;
  
  const getAccessToken = ()=>{
    return aT;
  }
  return getAccessToken;
}

let getAccessToken = ()=>{return null};

// Get the Access Token from Spotify to use for the rest of the Spotify calls
const requestSpotifyAccessToken = (appId)=>{
  fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic "+appId
    },
    body: "grant_type=client_credentials"
  }).then(response=>{
    return response.json();
  }).then(data=>{
    console.log("Access Token Retrieved!");
    getAccessToken = makeAccessToken(data.access_token);
  })
}

// Get the authorization from moodSingCure, then send it to Spotify with requestSpotifyAccessToken
const getSpotifyAuthorization = (devMode=false) => {
  console.log("Getting appId!");
  // Fetch the encoded authorization token from moodSingCure, or localhost if devMode is true
  fetch(
    devMode?"http://localhost:5000/appid":
      "https://mood-sing-cure.herokuapp.com/appid",
    {mode: ("cors")})
    .then(response=>{
      return response.json()
    }).then(data=>{
      if(!data.appId) throw new Error("No Spotify Token found!");

      console.log(data);

      if(data.appId!="null"){
        console.log("appId successfully retrieved!");

        requestSpotifyAccessToken(data.appId);

      }else{
        throw new Error("Could not access Spotify Token! Null Token found");
      }
    }).catch(error=>{
      
    })
}

getSpotifyAuthorization(true);  // TODO: On Deploy, change this to false





// location api
// ====================================================================
// current location variable = long/lat (from navigator)
function browserSupportsGeolocation() {
    if (navigator.geolocation) {
        showPrompt = function(){$("#location-prompt").attr("style","block")}; 
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
function genSpot(){
  let spotify = $("<div>").html (`<iframe src="https://open.spotify.com/embed/track/6cd1yCz5aapoeauiLH9dcU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
  $("#spotify").append(spotify)
  }


// event.listener to pull input from user
// ====================================================================


// mood
// ====================================================================
// take user input to match with a preset mood
// pull spotify perameters for preset mood from mood.js

function moodMatcher(userMood) {
  const moodMatch = mood.find(moodObject => moodObject.moodType = userMood.toLowerCase());
  console.log(moodMatch);
  let valence = moodMatch.valence,
      energy =  moodMatch.energy,
      tempo = moodMatch.tempo,
      loudness = moodMatch.loudness,
      danceability = moodMatch.danceability;
  console.log(valence, energy, tempo, loudness,danceability);
  return (valence, energy, tempo, loudness,danceability)
}

// mood.js
// ====================================================================
// object relating moods to spotify perameters







// spotify api 
// ====================================================================
// take in request from user on search
// returns widget data from spotify search