const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../firebase');
const Album = require('../models/Albums');
const Song = require('../models/Songs');

// Map Firestore document data to Album object
function mapToAlbum(data) {
  return new Album(data.title, data.songs, data.description);
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
    const newAlbum = new Album(title, songs, description);
    res.status(201).json(newAlbum);
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ message: error.message });
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
  const { album_title } = req.params;
  try {
    const albumRef = doc(db, 'album', album_title);
    await deleteDoc(albumRef);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all albums
exports.getAllAlbums = async (_req, res) => {
  try {
    const albumsRef = collection(db, 'album');
    const querySnapshot = await getDocs(albumsRef);
    const albums = querySnapshot.docs.map(doc => mapToAlbum(doc.data()));
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: error.message });
  }
};
