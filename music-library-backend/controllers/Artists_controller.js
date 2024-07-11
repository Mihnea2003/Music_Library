const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../firebase');
const Album = require('../models/Albums');
const Artist = require('../models/Artists');

// Map Firestore document data to Artist object
function mapToArtist(data) {
  return new Artist(
    data.name,
    data.albums.map(album => new Album(album.title, album.songs, album.description))
  );
}

// Create a new artist
exports.createArtist = async (req, res) => {
  const { name, albums } = req.body;
  try {
    const artistsRef = collection(db, 'artist');
    const newArtistRef = await addDoc(artistsRef, {
      name,
      albums,
    });
    const newArtist = new Artist(name, albums);
    res.status(201).json(newArtist);
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single artist by ID
exports.getArtistById = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const artistRef = doc(db, 'artist', artist_id);
    const docSnapshot = await getDoc(artistRef);
    if (!docSnapshot.exists()) {
      res.status(404).json({ message: 'Artist not found' });
    } else {
      const artistData = docSnapshot.data();
      const artist = mapToArtist(artistData);
      res.status(200).json(artist);
    }
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing artist
exports.updateArtist = async (req, res) => {
  const { artist_id } = req.params;
  const { name, albums } = req.body;
  try {
    const artistRef = doc(db, 'artist', artist_id);
    await updateDoc(artistRef, {
      name,
      albums,
    });
    const updatedArtist = new Artist(name, albums);
    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an artist
exports.deleteArtist = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const artistRef = doc(db, 'artist', artist_id);
    await deleteDoc(artistRef);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all artists
exports.getAllArtists = async (_req, res) => {
  try {
    const artistsRef = collection(db, 'artist');
    const querySnapshot = await getDocs(artistsRef);
    const artists = querySnapshot.docs.map(doc => mapToArtist(doc.data()));
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: error.message });
  }
};
