const songs = [
    {"id": "01", "title": "Thank you for the music", "artist": "ABBA", "rating": 3},
    {"id": "02", "title": "California Girls", "artist": "Beach Boys", "rating": 2},
    {"id": "03", "title": "How Deep Is Your Love", "artist": "Bee Gees", "rating": 1},
    {"id": "04", "title": "Sweet Sixteen", "artist": "Chuck Berry", "rating": 0},
    {"id": "05", "title": "Roll Over Beethoven", "artist": "Electric Light Orchestra", "rating": 0},
    {"id": "06", "title": "Booze and Blues", "artist": "Ma Rainey", "rating": 0},
    {"id": "07", "title": "Beds Are Burning", "artist": "Diesel and Dust", "rating": 0}
];


function compareSongs(s1, s2) {
    return s2.rating - s1.rating;
}

function songsSorted(){
    return [...songs].sort(compareSongs);
}

function findSong(id) {
    return songs.find(song => parseInt(id) === parseInt(song.id));
}

function rateSong(songId, delta) {
    let song = findSong(songId);

    if(song) {
        song.rating += delta;
        return true;
    }
    return false;
}