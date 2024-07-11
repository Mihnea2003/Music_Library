
const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../firebase');
const Song = require('../models/Songs');

// Map Firestore document data to Song object
function mapToSong(data) {
  return new Song(data.title, data.length);
}

// Create a new song
exports.createSong = async (req, res) => {
  const { title, length } = req.body;
  try {
    const songsRef = collection(db, 'song');
    const newSongRef = await addDoc(songsRef, {
      title,
      length,
    });
    const newSong = new Song(title, length);
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single song by ID
exports.getSongById = async (req, res) => {
  const { song_id } = req.params;
  try {
    const songRef = doc(db, 'song', song_id);
    const docSnapshot = await getDoc(songRef);
    if (!docSnapshot.exists()) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      const songData = docSnapshot.data();
      const song = new Song(songData.title, songData.length);
      res.status(200).json(song);
    }
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing song
exports.updateSong = async (req, res) => {
  const { song_id } = req.params;
  const { title, length } = req.body;
  try {
    const songRef = doc(db, 'song', song_id);
    await updateDoc(songRef, {
      title,
      length,
    });
    const updatedSong = new Song(title, length);
    res.status(200).json(updatedSong);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a song
exports.deleteSong = async (req, res) => {
  const { song_id } = req.params;
  try {
    const songRef = doc(db, 'song', song_id);
    await deleteDoc(songRef);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all songs
exports.getAllSongs = async (_req, res) => {
  try {
    const songsRef = collection(db, 'song');
    const querySnapshot = await getDocs(songsRef);
    const songs = querySnapshot.docs.map(doc => mapToSong(doc.data()));
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: error.message });
  }
};