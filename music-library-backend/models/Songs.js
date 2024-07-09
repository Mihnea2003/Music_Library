class Song {
    constructor(title, length) {
        this.title = title;
        this.length = length;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getLength() {
        return this.length;
    }

    setLength(length) {
        this.length = length;
    }
}

module.exports = Song;