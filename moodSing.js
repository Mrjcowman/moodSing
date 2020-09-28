// GLOBAL VARIABLES
// ==================================================================================
let GLOBAL_DEV_MODE = false; // TODO: On Deploy, change this to false
let GLOBAL_SPOTIFY_ENABLED = true;

// Client fields
let userForecast,
userMood,
userGenre;

let songsLeftToLoad = 0;

// Closure for the Access Token to keep it from being directly accessed by user
function makeAccessToken(accessToken) {
    let aT = accessToken;
    
    const getAccessToken = () => {
        return aT;
    }
    return getAccessToken;
}

let getAccessToken = () => { return null };

// Spotify API
// ==================================================================================
// Get the authorization token from moodSingCure for this session
const getSpotifyAuthorization = (devMode = false) => {
    console.log("Getting authorization!");
    // Fetch the encoded authorization token from moodSingCure, or localhost if devMode is true
    fetch(
            devMode ? "http://localhost:5000/accessToken" :
            "https://mood-sing-cure.herokuapp.com/accessToken", { mode: ("cors") })
        .then(response => {
            console.log("Response retrieved!");
            return response.json()
        }).then(data => {
            if (!data.accessToken) throw new Error("No Spotify Token found!");

            console.log(data);

            if (data.accessToken != "null" && data.accessToken != null) {
                console.log("Access Token successfully retrieved!");

                getAccessToken = makeAccessToken(data.accessToken);

            } else {
                throw new Error("Could not access Spotify Token! Null Token found");
            }
        }).catch(error => {
            GLOBAL_DEV_MODE = true;
            GLOBAL_SPOTIFY_ENABLED = false;
            console.error("Null token found!")
        })
}

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
    return new Promise(async(resolve, reject) => {
        let finalWeatherSong = "";
        await getSong(genre, trimmedWeather).then(weatherSong => {
            finalWeatherSong = weatherSong;
        }).catch(async error => {
            await getSong(genre, "").then(genreSong => {
                finalWeatherSong = genreSong;
            }).catch(error => {
                finalWeatherSong = "03UrZgTINDqvnUMbbIMhql"; // Don't Stop Believin'
            })
        })

        await getSong(genre, mood).then(moodSong => {
            resolve([finalWeatherSong, moodSong]);
        }).catch(async error => {
            await getSong(genre, "").then(genreSong => {
                resolve[finalWeatherSong, "4bHsxqR3GMrXTxEPLuK5ue"]; // Gangnam Style
            })
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
            `&seed_genres=${genre}` +
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

// Mood Mapping
// ==================================================================================
// Gets the spotify parameters tied to a given mood
function moodMatcher(userMood) {
    const moodMatch = mood.find(moodObject => moodObject.moodType = userMood.toLowerCase());
    console.log(moodMatch);
    let valence = moodMatch.valence,
        energy = moodMatch.energy,
        tempo = moodMatch.tempo,
        loudness = moodMatch.loudness,
        danceability = moodMatch.danceability;
    return {
        valence: valence,
        energy: energy,
        tempo: tempo,
        loudness: loudness,
        danceability: danceability
    };
}

// Weather and Geolocation APIs
// ==================================================================================
// location api
function browserSupportsGeolocation() {
    if (navigator.geolocation) {
        $("#weather-approval").show();
    } else {
        // Latitude and longitude of UW Campus
        $("#weather-approval").hide();
        console.log("Does not support geo");
        console.log(47.655548, -122.303200);
    }
}

function weatherForecast() {
    $("#loadingbar").show();
    let positionStart,
        geoSuccess = function(position) {
            $("#weather-approval").hide();
            positionStart = position;
            let lat = positionStart.coords.latitude,
                lon = positionStart.coords.longitude;
            console.log(lat, lon);
            gridLocater(lat, lon);
        },
        geoError = function(error) {
            $("#weather-approval").hide();
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
// get request with location variable for current weather
function gridLocater(lat, lon) {
    $.get(`https://api.weather.gov/points/${lat},${lon}`, function(grid) {
        localForecast(grid);
    });
}

function localForecast(grid) {
    $.get(`https://api.weather.gov/gridpoints/${grid.properties.gridId}/${grid.properties.gridX},${grid.properties.gridY}/forecast`, function(forecast) {
        console.log(forecast.properties.periods[0].shortForecast);
        $("#loadingbar").hide();
        $("#mood-prompt").show()
        userForecast = forecast.properties.periods[0].shortForecast
        renderWeatherTheme(forecast.properties.periods[0].icon)
    });
}

// DOM Manipulation
// ==================================================================================
// Function to initialize page
function init() {
    startHide()
    browserSupportsGeolocation()
}

// Background/Theme change
// Adds the given theme class to all theme-enabled elements, then removes all others
function applyTheme(theme = "default") {
    $(".default").addClass(theme)
    $(".fewClouds").addClass(theme)
    $(".sunny").addClass(theme)
    $(".rain").addClass(theme)
    $(".partlyCloudy").addClass(theme)
    $(".thunderstorm").addClass(theme)
    $(".mist").addClass(theme)
    $(".snow").addClass(theme)
    removeThemes(theme)
}

// Removes all theme classes except the one given in the parameter
function removeThemes(exception = "") {
    let classString = "default fewClouds sunny rain partlyCloudy thunderstorm mist snow";
    let splitClassString = classString.split(exception)
    if (splitClassString.length > 1) {
        classString = splitClassString[0] + splitClassString[1]
    } else {
        classString = splitClassString[0]
    }

    splitClassString = classString.split(/ +/);

    $("*").removeClass(splitClassString)
}

// Applies the theme appropriate to the weather given in the forecast
function renderWeatherTheme(imageUrl) {

    if (imageUrl == null) {
        applyTheme("default")
        return;
    }

    // Extract the image file name from the forecast for easy weather/theme mapping
    let splitUrl = imageUrl.split("?")[0].split("/");
    let imageFileName = splitUrl[splitUrl.length - 1].split(",")[0];

    console.log(imageFileName);

    switch (imageFileName) {
        case "few":
        case "nfew":
        case "sct":
        case "nsct":
        case "wind_few":
        case "nwind_few":
        case "wind_sct":
        case "nwind_sct":
            applyTheme("fewClouds");
            break;
        case "skc":
        case "nskc":
        case "wind_skc":
        case "nwind_skc":
        case "hot":
            applyTheme("sunny");
            break;
        case "rain_sleet":
        case "rain_fzra":
        case "sleet":
        case "rain":
        case "rain_showers":
        case "rain_showers_hi":
        case "shra":
        case "nshra":
        case "hi_shwrs":
        case "hi_nshwrs":
        case "ra":
        case "nra":
        case "minus_ra":
        case "nra":
        case "raip":
        case "nraip":
        case "fzra":
        case "nfzra":
        case "ra_fzra":
        case "nra_fzra":
            applyTheme("rain");
            break;
        case "bkn":
        case "nbkn":
        case "ovc":
        case "novc":
        case "wind_bkn":
        case "nwind_bkn":
        case "wind_ovc":
        case "nwind_ovc":
            applyTheme("partlyCloudy");
            break;
        case "tsra":
        case "tsra_sct":
        case "tsra_hi":
        case "tornado":
        case "hurricane":
        case "tropical_storm":
        case "ntsra":
        case "scttsra":
        case "nscttsra":
        case "hi_tsra":
        case "hi_ntsra":
        case "fc":
        case "nfc":
        case "tor":
        case "ntor":
        case "hur_warn":
        case "hur_watch":
        case "ts_warn":
        case "ts_watch":
        case "ts_nowarn":
            applyTheme("thunderstorm");
            break;
        case "du":
        case "dust":
        case "smoke":
        case "haze":
        case "fog":
        case "ndu":
        case "fu":
        case "nfu":
        case "hz":
            applyTheme("mist");
            break;
        case "snow":
        case "cold":
        case "rain_snow":
        case "snow_sleet":
        case "snow_fzra":
        case "ra_sn":
        case "nra_sn":
        case "fzra_sn":
        case "nfzra_sn":
        case "ip":
        case "nip":
        case "snip":
        case "nsnip":
        case "cold":
        case "ncold":
        case "blizzard":
        case "nblizzard":
        case "fg":
        case "nfg":
            applyTheme("snow");
            break;
        default:
            applyTheme("default");
    }
}

// Hides all the elements not needed at the initialization of the page
function startHide() {
    $("#loadingbar").hide()
    $("#weather-approval").hide()
    $("#mood-prompt").hide()
    $("#genre-prompt").hide()
    $("#playListLoading").hide()
    $("#playList").hide()
    $("#userForecast").hide()
}

// Generates the spotify widgets given an array of track IDs
function genSpot(trackArray) {
    $("#playListLoading").show();
    songsLeftToLoad = trackArray.length;
    console.log("trackArray: " + trackArray)
    trackArray.forEach(track => {
        console.log(track);
        let spotify = $("<div>").addClass("col m6 s12").html(`<iframe src="https://open.spotify.com/embed/track/${track}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
        $("#playList").append(spotify)
        spotify.find("iframe").on("load", event=>{
            songsLeftToLoad --;
            if(songsLeftToLoad==0){
                $("#playListLoading").hide();
                $("#playList").show();
            }
        })
    });
    
}

// Events
// ==================================================================================
$("#accept-weather-btn").on("click", function(event) {
    event.preventDefault();
    weatherForecast();
})

$("#mood-form").on("submit", function(event) {
    event.preventDefault();
    if (mood.some(function(el) { return el.moodType === $("#mood-input").val().toLowerCase() })) {
        userMood = $("#mood-input").val()
        $("#mood-prompt").hide()
        console.log(userMood);
        $("#genre-prompt").show()
    } else {
        M.toast({ html: "Please enter a mood we have mapped" })
        return
    }
})

$("#genre-form").on("submit", async function(event) {
    event.preventDefault();

    if (genreList.some(function(el) { return el.genreType === $("#genre-input").val().toLowerCase() })) {
        userGenre = $("#genre-input").val()
        $("#genre-prompt").hide()
        console.log(userGenre);
        getMoodSingRecommendations(userGenre, userForecast, userMood).then(recs => genSpot(recs));
    } else {
        M.toast({ html: "Please enter a genre we have mapped" })
        return
    }
})

$("#smile-btn").on("click", function (event) {
    event.preventDefault();
    if(userForecast == null){
        M.toast({ html: "Please click accept!" })
        return
    } else {
        startHide()
        $("#mood-prompt").show()
    }
})

// Main Script Execution
// ==================================================================================
getSpotifyAuthorization(GLOBAL_DEV_MODE);
init();