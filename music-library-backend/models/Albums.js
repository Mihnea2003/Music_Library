const Song = require('./Songs');

class Album {
    constructor(id,title, songs, description) {
        this.id = id;
        this.title = title;
        this.songs = songs.map(song => new Song(song.title, song.length));
        this.description = description;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        this.id=id;
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