/* Moods matched to Spotify Parameters:

    Valence     value type =    float
                description =   A measure from 0.0 to 1.0 describing the musical 
                                positiveness conveyed by a track. Tracks with high 
                                valence sound more positive (e.g. happy, cheerful, 
                                euphoric), while tracks with low valence sound more 
                                negative (e.g. sad, depressed, angry)

    Energy      value type =    float
                description =   Energy is a measure from 0.0 to 1.0 and represents 
                                a perceptual measure of intensity and activity. Typically, 
                                energetic tracks feel fast, loud, and noisy. For example, 
                                death metal has high energy, while a Bach prelude scores 
                                low on the scale. Perceptual features contributing to this 
                                attribute include dynamic range, perceived loudness, timbre, 
                                onset rate, and general entropy.

    Tempo       value type =    float
                description =   The overall estimated tempo of a track in beats per minute (BPM). 
                                In musical terminology, tempo is the speed or pace of a given 
                                piece and derives directly from the average beat duration.

    Loudness    value type =    float
                description =   The overall loudness of a track in decibels (dB). Loudness 
                                values are averaged across the entire track and are useful for 
                                comparing relative loudness of tracks. Loudness is the quality 
                                of a sound that is the primary psychological correlate of physical 
                                strength (amplitude). Values typical range between -60 and 0 db.

    Danceability value type =   float
                 description =  Danceability describes how suitable a track is for dancing based on 
                                a combination of musical elements including tempo, rhythm stability, 
                                beat strength, and overall regularity. A value of 0.0 is least 
                                danceable and 1.0 is most danceable.
*/

const mood = [
    {
        moodType : "Happy",
        valence : .9,
        energy : .5,
        tempo :  150,
        Loudness : 85,
        Danceability : .7
    },
    {
        moodType : "Sad",
        valence : .2,
        energy : .3,
        tempo :  100,
        Loudness : 90,
        Danceability : .3
    }
]