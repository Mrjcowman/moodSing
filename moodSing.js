let GLOBAL_DEV_MODE = true; // TODO: On Deploy, change this to false
let GLOBAL_SPOTIFY_ENABLED = true;

let userForecast,
    userMood,
    userGenre;

// Closure for the Access Token to keep it from being directly accessed by user
function makeAccessToken(accessToken) {
    let aT = accessToken;

    const getAccessToken = () => {
        return aT;
    }
    return getAccessToken;
}


let getAccessToken = () => { return null };

// Get the Access Token from Spotify to use for the rest of the Spotify calls
// TODO: Move this to the MoodSingCure API
const requestSpotifyAccessToken = (appId) => {
    fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + appId
        },
        body: "grant_type=client_credentials"
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log("Access Token Retrieved!");
        getAccessToken = makeAccessToken(data.access_token);
    }).catch(error => {
        GLOBAL_DEV_MODE = true;
        GLOBAL_SPOTIFY_ENABLED = false;
    })
}

// Get the authorization from moodSingCure, then send it to Spotify with requestSpotifyAccessToken
const getSpotifyAuthorization = (devMode = false) => {
    console.log("Getting appId!");
    // Fetch the encoded authorization token from moodSingCure, or localhost if devMode is true
    fetch(
            devMode ? "http://localhost:5000/appid" :
            "https://mood-sing-cure.herokuapp.com/appid", { mode: ("cors") })
        .then(response => {
            return response.json()
        }).then(data => {
            if (!data.appId) throw new Error("No Spotify Token found!");

            console.log(data);

            if (data.appId != "null" && data.appId != null) {
                console.log("appId successfully retrieved!");

                requestSpotifyAccessToken(data.appId);

            } else {
                throw new Error("Could not access Spotify Token! Null Token found");
            }
        }).catch(error => {
            GLOBAL_DEV_MODE = true;
            GLOBAL_SPOTIFY_ENABLED = false;
            console.log("Null token found!")
        })
}

getSpotifyAuthorization(GLOBAL_DEV_MODE);


// Function to initialize page
function init() {
    startHide()
    browserSupportsGeolocation()
}

// Calling the init() function to load page
init()


// location api
// ====================================================================
// current location variable = long/lat (from navigator)

function browserSupportsGeolocation() {
    if (navigator.geolocation) {
        $("#weather-approval").toggle();
    } else {
        // Latitude and longitude of UW Campus
        hidePrompt($("#weather-approval"));
        console.log("Does not support geo");
        console.log(47.655548, -122.303200);
    }
}

function weatherForecast() {
    progressBar($("#weather-approval"))
    let positionStart,
        geoSuccess = function(position) {
            $("#weather-approval").toggle();
            positionStart = position;
            let lat = positionStart.coords.latitude,
                lon = positionStart.coords.longitude;
            console.log(lat, lon);
            gridLocater(lat, lon);
        },
        geoError = function(error) {
            $("#weather-approval").toggle();
            switch (error.code) {
                case error.TIMEOUT:
                    console.log("Timed Out Reload");
                    locationPrompt();
                    break;
                case error.PERMISSION_DENIED:
                    console.log("USER SAID NO");
                    console.log(47.655548, -122.303200);
                    gridLocater(47.655548, -122.303200);
                    M.toast({ html: "Sorry you don't want to share your location. We will set it to UW Campus!" })
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Unable to grab users location");
                    console.log(47.655548, -122.303200);
                    gridLocater(47.655548, -122.303200);
                    M.toast({ html: "We can't find your location so we are setting your location to UW Campus!" })
            }
        },
        geoOptions = {
            maximumAge: 0,
            timeout: 50000,
            enableHighAccuracy: true
        };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}



// weather api
// ====================================================================
// get request with location variable for current weather
// will need lat/long from weather api
// test location gridLocater(37.6752, -120.9465)
function gridLocater(lat, lon) {
    $.get(`https://api.weather.gov/points/${lat},${lon}`, function(grid) {
        localForecast(grid);
    });
}

function localForecast(grid) {
    $.get(`https://api.weather.gov/gridpoints/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`, function(forecast) {
        console.log(forecast.properties.periods[0].shortForecast);
        $("#mood-prompt").toggle()
        userForecast = forecast.properties.periods[0].shortForecast
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
function startHide() {
    $("#weather-approval").hide()
    $("#mood-prompt").hide()
    $("#genre-prompt").hide()
    $("#playList").hide()
    $("#userForecast").hide()
}

function progressBar(elementID) {
    let indeterminate = $("<div>").addClass("indeterminate"),
        progress = $("<div>").addClass("progress");
    progress.append(indeterminate);
    elementID.append(progress);
}

function genSpot(trackArray) {
    $("#playList").toggle()
    console.log("trackArray: " + trackArray)
    trackArray.forEach(track => {
        console.log(track);
        let spotify = $("<div>").addClass("col m6 s12").html(`<iframe src="https://open.spotify.com/embed/track/${track}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
        $("#playList").append(spotify)
    });
}



// mood
// ====================================================================
// take user input to match with a preset mood
// pull spotify perameters for preset mood from mood.js

function moodMatcher(userMood) {
    const moodMatch = mood.find(moodObject => moodObject.moodType = userMood.toLowerCase());
    console.log(moodMatch);
    let valence = moodMatch.valence,
        energy = moodMatch.energy,
        tempo = moodMatch.tempo,
        loudness = moodMatch.loudness,
        danceability = moodMatch.danceability;
    console.log(valence, energy, tempo, loudness, danceability);
    return {
        valence: valence,
        energy: energy,
        tempo: tempo,
        loudness: loudness,
        danceability: danceability
    };
}

// mood.js
// ====================================================================
// object relating moods to spotify perameters







// spotify api stuff
// ====================================================================

// Returns the track id of a song that matches the passed genre and keyword
const getSong = (genre, keyword) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.spotify.com/v1/search?q=${keyword} genre: ${genre}&type=track&market=US&limit=1`, {
                headers: { "Authorization": "Bearer " + getAccessToken() }
            })
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)
                if (data.tracks.items[0]) {
                    let id = data.tracks.items[0].id;
                    console.log("SONG GET: GENRE - " + genre + " KEYWORD - " + keyword + " ID - " + id)
                    resolve(id);
                } else {
                    reject("No Song Found");
                }
            })
    });
}

// Generates seed songs for the recommendations based on chosen genre, weather, and mood
const getSeedMusic = (genre, weather, mood) => {
    trimmedWeather = weather.split(" ")[0];
    return new Promise((resolve, reject) => {
        getSong(genre, trimmedWeather).then(weatherSong => {
            getSong(genre, mood).then(moodSong => {
                resolve([weatherSong, moodSong]);
            }).catch(error => {
                resolve([weatherSong]);
            })
        }).catch(error => {
            reject("No songs found!");
        })
    })
}

// Gets the list of recommended songs based on the passed-in seed music and mood params
const getMoodSingRecommendations = (genre, weather, mood) => {
    const backupIDs = ["6Z34YgqCJkdrliDmbcaJgy", "6kyiWsforDWCq1VBCm4BNZ", "2Cu5ExXidcoE4vF5hIYict", "2VBYFWgwIlJjyzidPTHQqp", "6cd1yCz5aapoeauiLH9dcU", "4c2W3VKsOFoIg2SFaO6DY5", "1nmeX39rjGxyaoSkPxSHwr", "38iCfXPXqyeEHsNtlxjtSG", "50PU05RTGva8laKDwxED9Y", "63w0QA1wiV7QhF9jeiHETF"];
    let trackIDs = [];
    let recPromise = new Promise(async(resolve, reject) => {
        // Use default track listing if Spotify API is disabled
        if (!GLOBAL_SPOTIFY_ENABLED) resolve(backupIDs);

        // Get the seed music and moof parameters to build the query
        let seedMusic = null;
        await getSeedMusic(genre, weather, mood)
            .then(seed => {
                if (seed.length == 1)
                    seedMusic = [seed[0], "03UrZgTINDqvnUMbbIMhql"]
                else
                    seedMusic = seed
            })
            .catch(error => {
                seedMusic = ["03UrZgTINDqvnUMbbIMhql", "4bHsxqR3GMrXTxEPLuK5ue"]
            });
        let moodParams = moodMatcher(mood);

        let query = `seed_tracks=${seedMusic[0]},${seedMusic[1]}` +
            `&target_valence=${moodParams.valence}` +
            `&target_energy=${moodParams.energy}` +
            `&target_tempo=${moodParams.tempo}` +
            `&target_loudness=${moodParams.loudness}` +
            `&target_danceability=${moodParams.danceability}`;

        let authorization = "Bearer " + getAccessToken();

        // Get the recommendations, then pass their IDs in the resolution
        fetch(`https://api.spotify.com/v1/recommendations?${query}`, {
                headers: { "Authorization": authorization }
            })
            .then(response => {
                console.log(authorization);
                return response.json();
            }).then(data => {
                console.log(data);
                data.tracks.forEach(track => {
                    trackIDs.push(track.id);
                })
                resolve(trackIDs);
            }).catch(error => {
                reject(error);
            });
    });


    return recPromise;
}

// event.listeners to pull input from user
// ====================================================================
$("#accept-weather-btn").on("click", function(event) {
    event.preventDefault();
    weatherForecast();
})

$("#mood-form").on("submit", function(event) {
    event.preventDefault();
    if (mood.some(function(el) { return el.moodType === $("#mood-input").val().toLowerCase() })) {
        userMood = $("#mood-input").val()
        $("#mood-prompt").toggle()
        console.log(userMood);
        $("#genre-prompt").toggle()
    } else {
        M.toast({ html: "Please enter a mood we have mapped" })
        return
    }
})

$("#genre-form").on("submit", async function(event) {
    event.preventDefault();

    if (genreList.some(function(el) { return el.genreType === $("#genre-input").val().toLowerCase() })) {
        userGenre = $("#genre-input").val()
        $("#genre-prompt").toggle()
        console.log(userGenre);
        getMoodSingRecommendations(userGenre, userForecast, userMood).then(recs => genSpot(recs));
    } else {
        M.toast({ html: "Please enter a genre we have mapped" })
        return
    }
})