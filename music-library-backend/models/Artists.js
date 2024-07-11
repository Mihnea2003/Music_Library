const Album = require('./Albums');

class Artist {
    constructor(name, albums) {
        this.name = name;
        this.albums = albums.map(album => new Album(album.title, album.songs, album.description));
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getAlbums() {
        return this.albums;
    }

    setAlbums(albums) {
        this.albums = albums.map(album => new Album(album.title, album.songs, album.description));
    }
}

module.exports = Artist;