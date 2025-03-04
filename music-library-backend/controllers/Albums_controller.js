const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../firebase');
const Album = require('../models/Albums');
const Song = require('../models/Songs');

// Map Firestore document data to Album object
function mapToAlbum(doc) {
  return new Album(doc.id, doc.data().title, doc.data().songs, doc.data().description);
}

// Create a new album
exports.createAlbum = async (req, res) => {
  const { title, songs, description } = req.body;
  try {
    const albumsRef = collection(db, 'album');
    const newAlbumRef = await addDoc(albumsRef, {
      title,
      songs,
      description,
    });
    const newAlbum = new Album(newAlbumRef.id,title, songs, description);
    return newAlbum;
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createAlbumForArtists = async (title, songs, description) => {
  try {
    const albumsRef = collection(db, 'album');
    const newAlbumRef = await addDoc(albumsRef, {
      title,
      songs,
      description,
    });
    const newAlbum = new Album(newAlbumRef.id, title, songs, description);
    return newAlbum;
  } catch (error) {
    console.error('Error creating album:', error);
    throw error;
  }
};

// Get a single album by ID
exports.getAlbumById = async (req, res) => {
  const { album_title } = req.params;
  try {
    const albumRef = doc(db, 'album', album_title);
    const docSnapshot = await getDoc(albumRef);
    if (!docSnapshot.exists()) {
      res.status(404).json({ message: 'Album not found' });
    } else {
      const albumData = docSnapshot.data();
      const album = new Album(albumData.title, albumData.songs, albumData.description);
      res.status(200).json(album);
    }
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing album
exports.updateAlbum = async (req, res) => {
  const { album_id } = req.params;
  const { title, songs, description } = req.body;
  try {
    const albumRef = doc(db, 'album', album_id);
    await updateDoc(albumRef, {
      title,
      songs,
      description,
    });
    const updatedAlbum = new Album(title, songs, description);
    res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an album
exports.deleteAlbum = async (req, res) => {
  const { album_id } = req.params;
  try {
    const albumRef = doc(db, 'album', album_id);
    await deleteDoc(albumRef);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAlbumForArtist = async (album_id) => {
  try {
    const albumRef = doc(db, 'album', album_id);
    await deleteDoc(albumRef);
  } catch (error) {
    console.error('Error deleting album:', error);
    throw new Error(error.message); // Propagate error up the chain
  }
};

// Get all albums
exports.getAllAlbums = async (_req, res) => {
  try {
    const albumsRef = collection(db, 'album');
    const querySnapshot = await getDocs(albumsRef);
    const albums = querySnapshot.docs.map(doc => mapToAlbum(doc));
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: error.message });
  }
};
