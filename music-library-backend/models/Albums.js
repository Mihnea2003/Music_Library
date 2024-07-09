const Song = require('./Song');

class Album {
    constructor(title, songs, description) {
        this.title = title;
        this.songs = songs.map(song => new Song(song.title, song.length));
        this.description = description;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getSongs() {
        return this.songs;
    }

    setSongs(songs) {
        this.songs = songs.map(song => new Song(song.title, song.length));
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }
}

module.exports = Album;