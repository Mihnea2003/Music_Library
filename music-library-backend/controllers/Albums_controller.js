class AlbumController {
    constructor(db) {
        this.db = db;
    }

    async create(albumData) {
        try {
            const albumRef = await this.db.collection('albums').add(albumData);
            return albumRef.id;
        } catch (error) {
            console.error('Error creating album:', error);
            return null;
        }
    }

    async getById(albumId) {
        try {
            const albumRef = await this.db.collection('albums').doc(albumId).get();
            if (albumRef.exists) {
                const albumData = albumRef.data();
                return new Album(albumData.title, albumData.songs, albumData.description);
            } else {
                console.log('Album not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching album:', error);
            return null;
        }
    }

    async update(album) {
        try {
            await this.db.collection('albums').doc(album.albumId).update({
                title: album.title,
                songs: album.songs,
                description: album.description
            });
            console.log('Album updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating album:', error);
            return false;
        }
    }

    async delete(albumId) {
        try {
            await this.db.collection('albums').doc(albumId).delete();
            console.log('Album deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting album:', error);
            return false;
        }
    }
}

module.exports = AlbumController;