class ArtistController {
    constructor(db) {
        this.db = db;
    }

    async create(artistData) {
        try {
            const artistRef = await this.db.collection('artists').add(artistData);
            return artistRef.id;
        } catch (error) {
            console.error('Error creating artist:', error);
            return null;
        }
    }

    async getById(artistId) {
        try {
            const artistRef = await this.db.collection('artists').doc(artistId).get();
            if (artistRef.exists) {
                const artistData = artistRef.data();
                return new Artist(artistData.name, artistData.albums);
            } else {
                console.log('Artist not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching artist:', error);
            return null;
        }
    }

    async update(artist) {
        try {
            await this.db.collection('artists').doc(artist.artistId).update({
                name: artist.name,
                albums: artist.albums
            });
            console.log('Artist updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating artist:', error);
            return false;
        }
    }

    async delete(artistId) {
        try {
            await this.db.collection('artists').doc(artistId).delete();
            console.log('Artist deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting artist:', error);
            return false;
        }
    }
}

module.exports = ArtistController;