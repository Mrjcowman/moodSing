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
D
    Loudness    value type =    float
                description =   The overall loudness of a track in decibels (dB). Loudness 
                                values are averaged across the entire track and are useful for 
                                comparing relative loudness of tracks. Loudness is the quality 
                                of a sound that is the primary psychological correlate of physical 
                                strength (amplitude). Values typical range between 0 and 60 db.

    Danceability value type =   float
                 description =  Danceability describes how suitable a track is for dancing based on 
                                a combination of musical elements including tempo, rhythm stability, 
                                beat strength, and overall regularity. A value of 0.0 is least 
                                danceable and 1.0 is most danceable.
*/

cconst mood = [
    {
        moodType: "adventurous",
        valence: 0.75,
        energy: 0.95,
        tempo: 201.50,
        loudness: 28.71,
        danceability: 0.90
    },
    {
        moodType: "afraid",
        valence: 0.45,
        energy: 0.90,
        tempo: 193.00,
        loudness: 15.04,
        danceability: 0.70
    },
    {
        moodType: "alarmed",
        valence: 0.45,
        energy: 0.95,
        tempo: 201.50,
        loudness: 15.04,
        danceability: 0.73
    },
    {
        moodType: "ambitious",
        valence: 0.70,
        energy: 0.85,
        tempo: 184.50,
        loudness: 25.81,
        danceability: 0.68
    },
    {
        moodType: "amorous",
        valence: 0.90,
        energy: 0.40,
        tempo: 108.00,
        loudness: 39.44,
        danceability: 0.45
    },
    {
        moodType: "amused",
        valence: 0.75,
        energy: 0.60,
        tempo: 142.00,
        loudness: 28.71,
        danceability: 0.55
    },
    {
        moodType: "angry",
        valence: 0.30,
        energy: 0.90,
        tempo: 193.00,
        loudness: 10.78,
        danceability: 0.70
    },
    {
        moodType: "annoyed",
        valence: 0.30,
        energy: 0.80,
        tempo: 176.00,
        loudness: 10.78,
        danceability: 0.65
    },
    {
        moodType: "anxious",
        valence: 0.15,
        energy: 0.10,
        tempo: 57.00,
        loudness: 7.66,
        danceability: 0.30
    },
    {
        moodType: "apathetic",
        valence: 0.40,
        energy: 0.45,
        tempo: 116.50,
        loudness: 13.47,
        danceability: 0.48
    },
    {
        moodType: "aroused",
        valence: 0.70,
        energy: 0.95,
        tempo: 201.50,
        loudness: 25.81,
        danceability: 0.73
    },
    {
        moodType: "ashamed",
        valence: 0.30,
        energy: 0.25,
        tempo: 82.50,
        loudness: 10.78,
        danceability: 0.38
    },
    {
        moodType: "astonished",
        valence: 0.70,
        energy: 0.95,
        tempo: 201.50,
        loudness: 25.81,
        danceability: 0.73
    },
    {
        moodType: "at ease",
        valence: 0.90,
        energy: 0.20,
        tempo: 74.00,
        loudness: 39.44,
        danceability: 0.35
    },
    {
        moodType: "attentive",
        valence: 0.75,
        energy: 0.25,
        tempo: 82.50,
        loudness: 28.71,
        danceability: 0.38
    },
    {
        moodType: "bellicose",
        valence: 0.45,
        energy: 1.00,
        tempo: 210.00,
        loudness: 15.04,
        danceability: 0.75
    },
    {
        moodType: "bitter",
        valence: 0.10,
        energy: 0.65,
        tempo: 150.50,
        loudness: 6.81,
        danceability: 0.58
    },
    {
        moodType: "bored",
        valence: 0.35,
        energy: 0.10,
        tempo: 57.00,
        loudness: 12.06,
        danceability: 0.30
    },
    {
        moodType: "calm",
        valence: 0.85,
        energy: 0.15,
        tempo: 65.50,
        loudness: 35.49,
        danceability: 0.33
    },
    {
        moodType: "compassionate",
        valence: 0.70,
        energy: 0.05,
        tempo: 48.50,
        loudness: 25.81,
        danceability: 0.28
    },
    {
        moodType: "conceited",
        valence: 0.60,
        energy: 0.85,
        tempo: 184.50,
        loudness: 20.83,
        danceability: 0.68
    },
    {
        moodType: "confident",
        valence: 0.75,
        energy: 0.40,
        tempo: 108.00,
        loudness: 28.71,
        danceability: 0.45
    },
    {
        moodType: "conscientious",
        valence: 0.65,
        energy: 0.10,
        tempo: 57.00,
        loudness: 23.19,
        danceability: 0.30
    },
    {
        moodType: "contemplative",
        valence: 0.80,
        energy: 0.20,
        tempo: 74.00,
        loudness: 31.93,
        danceability: 0.35
    },
    {
        moodType: "contemptuous",
        valence: 0.20,
        energy: 0.80,
        tempo: 176.00,
        loudness: 8.59,
        danceability: 0.65
    },
    {
        moodType: "content",
        valence: 0.90,
        energy: 0.20,
        tempo: 74.00,
        loudness: 39.44,
        danceability: 0.35
    },
    {
        moodType: "convinced",
        valence: 0.70,
        energy: 0.70,
        tempo: 159.00,
        loudness: 25.81,
        danceability: 0.60
    },
    {
        moodType: "courageous",
        valence: 0.90,
        energy: 0.75,
        tempo: 167.50,
        loudness: 39.44,
        danceability: 0.63
    },
    {
        moodType: "defient",
        valence: 0.20,
        energy: 0.85,
        tempo: 184.50,
        loudness: 8.59,
        danceability: 0.68
    },
    {
        moodType: "dejected",
        valence: 0.25,
        energy: 0.05,
        tempo: 48.50,
        loudness: 9.63,
        danceability: 0.28
    },
    {
        moodType: "delighted",
        valence: 0.95,
        energy: 0.70,
        tempo: 159.00,
        loudness: 43.82,
        danceability: 0.60
    },
    {
        moodType: "depressed",
        valence: 0.10,
        energy: 0.25,
        tempo: 82.50,
        loudness: 6.81,
        danceability: 0.38
    },
    {
        moodType: "desperate",
        valence: 0.10,
        energy: 0.25,
        tempo: 82.50,
        loudness: 6.81,
        danceability: 0.38
    },
    {
        moodType: "despondent",
        valence: 0.20,
        energy: 0.30,
        tempo: 91.00,
        loudness: 8.59,
        danceability: 0.40
    },
    {
        moodType: "determined",
        valence: 0.85,
        energy: 0.65,
        tempo: 150.50,
        loudness: 35.49,
        danceability: 0.58
    },
    {
        moodType: "disappointed",
        valence: 0.10,
        energy: 0.50,
        tempo: 125.00,
        loudness: 6.81,
        danceability: 0.50
    },
    {
        moodType: "disgusted",
        valence: 0.15,
        energy: 0.75,
        tempo: 167.50,
        loudness: 7.66,
        danceability: 0.63
    },
    {
        moodType: "discontented",
        valence: 0.15,
        energy: 0.65,
        tempo: 150.50,
        loudness: 7.66,
        danceability: 0.58
    },
    {
        moodType: "dissatisfied",
        valence: 0.20,
        energy: 0.40,
        tempo: 108.00,
        loudness: 8.59,
        danceability: 0.45
    },
    {
        moodType: "distressed",
        valence: 0.15,
        energy: 0.80,
        tempo: 176.00,
        loudness: 7.66,
        danceability: 0.65
    },
    {
        moodType: "distrustful",
        valence: 0.25,
        energy: 0.55,
        tempo: 133.50,
        loudness: 9.63,
        danceability: 0.53
    },
    {
        moodType: "doubtful",
        valence: 0.35,
        energy: 0.00,
        tempo: 40.00,
        loudness: 12.06,
        danceability: 0.25
    },
    {
        moodType: "droopy",
        valence: 0.35,
        energy: 0.05,
        tempo: 48.50,
        loudness: 12.06,
        danceability: 0.28
    },
    {
        moodType: "embarrassed",
        valence: 0.35,
        energy: 0.20,
        tempo: 74.00,
        loudness: 12.06,
        danceability: 0.35
    },
    {
        moodType: "enraged",
        valence: 0.40,
        energy: 0.85,
        tempo: 184.50,
        loudness: 13.47,
        danceability: 0.68
    },
    {
        moodType: "enthusiastic",
        valence: 0.75,
        energy: 0.65,
        tempo: 150.50,
        loudness: 28.71,
        danceability: 0.58
    },
    {
        moodType: "envious",
        valence: 0.35,
        energy: 0.90,
        tempo: 193.00,
        loudness: 12.06,
        danceability: 0.70
    },
    {
        moodType: "excited",
        valence: 0.85,
        energy: 0.85,
        tempo: 184.50,
        loudness: 35.49,
        danceability: 0.68
    },
    {
        moodType: "expectant",
        valence: 0.65,
        energy: 0.55,
        tempo: 133.50,
        loudness: 23.19,
        danceability: 0.53
    },
    {
        moodType: "feel well",
        valence: 0.95,
        energy: 0.45,
        tempo: 116.50,
        loudness: 43.82,
        danceability: 0.48
    },
    {
        moodType: "friendly",
        valence: 0.90,
        energy: 0.20,
        tempo: 74.00,
        loudness: 39.44,
        danceability: 0.35
    },
    {
        moodType: "glad",
        valence: 1.00,
        energy: 0.40,
        tempo: 108.00,
        loudness: 48.67,
        danceability: 0.45
    },
    {
        moodType: "gloomy",
        valence: 0.05,
        energy: 0.25,
        tempo: 82.50,
        loudness: 6.05,
        danceability: 0.38
    },
    {
        moodType: "guilty",
        valence: 0.30,
        energy: 0.30,
        tempo: 91.00,
        loudness: 10.78,
        danceability: 0.40
    },
    {
        moodType: "happy",
        valence: 0.95,
        energy: 0.60,
        tempo: 142.00,
        loudness: 43.82,
        danceability: 0.55
    },
    {
        moodType: "hateful",
        valence: 0.20,
        energy: 0.95,
        tempo: 201.50,
        loudness: 8.59,
        danceability: 0.73
    },
    {
        moodType: "hesitant",
        valence: 0.35,
        energy: 0.15,
        tempo: 65.50,
        loudness: 12.06,
        danceability: 0.33
    },
    {
        moodType: "hopeful",
        valence: 0.80,
        energy: 0.35,
        tempo: 99.50,
        loudness: 31.93,
        danceability: 0.43
    },
    {
        moodType: "hostile",
        valence: 0.35,
        energy: 0.95,
        tempo: 201.50,
        loudness: 12.06,
        danceability: 0.73
    },
    {
        moodType: "impatient",
        valence: 0.50,
        energy: 0.65,
        tempo: 150.50,
        loudness: 16.77,
        danceability: 0.58
    },
    {
        moodType: "impressed",
        valence: 0.70,
        energy: 0.45,
        tempo: 116.50,
        loudness: 25.81,
        danceability: 0.48
    },
    {
        moodType: "indignant",
        valence: 0.40,
        energy: 0.75,
        tempo: 167.50,
        loudness: 13.47,
        danceability: 0.63
    },
    {
        moodType: "insulted",
        valence: 0.15,
        energy: 0.60,
        tempo: 142.00,
        loudness: 7.66,
        danceability: 0.55
    },
    {
        moodType: "interested",
        valence: 0.80,
        energy: 0.50,
        tempo: 125.00,
        loudness: 31.93,
        danceability: 0.50
    },
    {
        moodType: "jealous",
        valence: 0.45,
        energy: 0.80,
        tempo: 176.00,
        loudness: 15.04,
        danceability: 0.65
    },
    {
        moodType: "joyous",
        valence: 1.00,
        energy: 0.55,
        tempo: 133.50,
        loudness: 48.67,
        danceability: 0.53
    },
    {
        moodType: "languid",
        valence: 0.40,
        energy: 0.25,
        tempo: 82.50,
        loudness: 13.47,
        danceability: 0.38
    },
    {
        moodType: "light hearted",
        valence: 0.70,
        energy: 0.65,
        tempo: 150.50,
        loudness: 25.81,
        danceability: 0.58
    },
    {
        moodType: "loathing",
        valence: 0.10,
        energy: 0.70,
        tempo: 159.00,
        loudness: 6.81,
        danceability: 0.60
    },
    {
        moodType: "longing",
        valence: 0.60,
        energy: 0.30,
        tempo: 91.00,
        loudness: 20.83,
        danceability: 0.40
    },
    {
        moodType: "lusting",
        valence: 0.60,
        energy: 0.90,
        tempo: 193.00,
        loudness: 20.83,
        danceability: 0.70
    },
    {
        moodType: "melancholic",
        valence: 0.45,
        energy: 0.15,
        tempo: 65.50,
        loudness: 15.04,
        danceability: 0.33
    },
    {
        moodType: "miserable",
        valence: 0.05,
        energy: 0.45,
        tempo: 116.50,
        loudness: 6.05,
        danceability: 0.48
    },
    {
        moodType: "passionate",
        valence: 0.65,
        energy: 0.55,
        tempo: 133.50,
        loudness: 23.19,
        danceability: 0.53
    },
    {
        moodType: "peaceful",
        valence: 0.75,
        energy: 0.10,
        tempo: 57.00,
        loudness: 28.71,
        danceability: 0.30
    },
    {
        moodType: "pensive",
        valence: 0.50,
        energy: 0.20,
        tempo: 74.00,
        loudness: 16.77,
        danceability: 0.35
    },
    {
        moodType: "pleased",
        valence: 0.95,
        energy: 0.45,
        tempo: 116.50,
        loudness: 43.82,
        danceability: 0.48
    },
    {
        moodType: "polite",
        valence: 0.70,
        energy: 0.15,
        tempo: 65.50,
        loudness: 25.81,
        danceability: 0.33
    },
    {
        moodType: "relaxed",
        valence: 0.85,
        energy: 0.15,
        tempo: 65.50,
        loudness: 35.49,
        danceability: 0.33
    },
    {
        moodType: "reverent",
        valence: 0.60,
        energy: 0.00,
        tempo: 40.00,
        loudness: 20.83,
        danceability: 0.25
    },
    {
        moodType: "sad",
        valence: 0.10,
        energy: 0.30,
        tempo: 91.00,
        loudness: 6.81,
        danceability: 0.40
    },
    {
        moodType: "satisfied",
        valence: 0.90,
        energy: 0.15,
        tempo: 65.50,
        loudness: 39.44,
        danceability: 0.33
    },
    {
        moodType: "self confident",
        valence: 0.90,
        energy: 0.80,
        tempo: 176.00,
        loudness: 39.44,
        danceability: 0.65
    },
    {
        moodType: "serene",
        valence: 0.90,
        energy: 0.25,
        tempo: 82.50,
        loudness: 39.44,
        danceability: 0.38
    },
    {
        moodType: "serious",
        valence: 0.60,
        energy: 0.15,
        tempo: 65.50,
        loudness: 20.83,
        danceability: 0.33
    },
    {
        moodType: "sleepy",
        valence: 0.50,
        energy: 0.00,
        tempo: 40.00,
        loudness: 16.77,
        danceability: 0.25
    },
    {
        moodType: "solemn",
        valence: 0.90,
        energy: 0.25,
        tempo: 82.50,
        loudness: 39.44,
        danceability: 0.38
    },
    {
        moodType: "startled",
        valence: 0.05,
        energy: 0.50,
        tempo: 125.00,
        loudness: 6.05,
        danceability: 0.50
    },
    {
        moodType: "superior",
        valence: 0.60,
        energy: 0.75,
        tempo: 167.50,
        loudness: 20.83,
        danceability: 0.63
    },
    {
        moodType: "suspicious",
        valence: 0.35,
        energy: 0.65,
        tempo: 150.50,
        loudness: 12.06,
        danceability: 0.58
    },
    {
        moodType: "taken back",
        valence: 0.30,
        energy: 0.40,
        tempo: 108.00,
        loudness: 10.78,
        danceability: 0.45
    },
    {
        moodType: "tense",
        valence: 0.50,
        energy: 0.95,
        tempo: 201.50,
        loudness: 16.77,
        danceability: 0.73
    },
    {
        moodType: "tired",
        valence: 0.50,
        energy: 0.00,
        tempo: 40.00,
        loudness: 16.77,
        danceability: 0.25
    },
    {
        moodType: "triumphant",
        valence: 0.90,
        energy: 0.85,
        tempo: 184.50,
        loudness: 39.44,
        danceability: 0.68
    },
    {
        moodType: "uncomfortable",
        valence: 0.15,
        energy: 0.30,
        tempo: 91.00,
        loudness: 7.66,
        danceability: 0.40
    },
    {
        moodType: "wavering",
        valence: 0.20,
        energy: 0.15,
        tempo: 65.50,
        loudness: 8.59,
        danceability: 0.33
    },
    {
        moodType: "worried",
        valence: 0.45,
        energy: 0.35,
        tempo: 99.50,
        loudness: 15.04,
        danceability: 0.43
    }
];

