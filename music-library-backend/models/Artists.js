const Album = require('./Albums');

class Artist {
    constructor(id,name, albums) {
        this.id = id;
        this.name = name;
        this.albums = albums.map(album => new Album(album.title, album.songs, album.description));
    }
    getid(){
        return this.id;
    }
    setId(id){
        this.id=id;
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