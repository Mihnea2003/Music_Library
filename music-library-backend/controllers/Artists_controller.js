const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../firebase');
const Album = require('../models/Albums');
const Artist = require('../models/Artists');
const { createAlbumForArtists,deleteAlbumForArtist } = require('./Albums_controller');


// Create a new artist
exports.createArtist = async (req, res) => {
  const { name, albums } = req.body;
  try {
    const artistsRef = collection(db, 'artist');
    const newArtistRef = await addDoc(artistsRef, {
      name,
      albums: [] // Initialize with an empty array for storing album data
    });

    const newArtist = new Artist(newArtistRef.id, name, []);

    // Add albums to Firebase and collect their data
    const albumData = albums.map(async (albumData) => {
      try {
        const { title, songs, description } = albumData;
        const newAlbumRef = await createAlbumForArtists(title, songs, description);

        // Collect album data to store in artist document
        const albumDoc = {
          title,
          songs,
          description,
          albumId: newAlbumRef.id 
        };

        newArtist.albums.push(albumDoc);
      } catch (error) {
        console.error('Error creating album:', error);
        throw new Error(error.message); // Propagate error up the chain
      }
    });

    // Wait for all album creation promises to resolve
    await Promise.all(albumData);

    // Update the artist document with album data
    await updateDoc(doc(db, 'artist', newArtistRef.id), { albums: newArtist.albums });

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
      return res.status(404).json({ message: 'Artist not found' });
    }

    const artistData = docSnapshot.data(); 

    
    const artist = {
      id: docSnapshot.id,
      name: artistData.name,
      albums: artistData.albums 
    };

    res.status(200).json(artist); 
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: error.message });
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

    // Get the artist document to access the albums
    const artistSnapshot = await getDoc(artistRef);
    if (!artistSnapshot.exists()) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const artistData = artistSnapshot.data();
    const albums = artistData.albums;

    // Delete each album associated with the artist using deleteAlbum function
    const deleteAlbumPromises = albums.map(async (album) => {
      try {
        await deleteAlbumForArtist(album.albumId);
      } catch (error) {
        console.error('Error deleting album:', error);
        throw new Error(error.message); // Propagate error up the chain
      }
    });

    // Wait for all album deletion promises to resolve
    await Promise.all(deleteAlbumPromises);

    // Now delete the artist document
    await deleteDoc(artistRef);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting artist and associated albums:', error);
    res.status(500).json({ message: error.message });
  }
};

function mapToArtist(doc) {
  const data = doc.data();
  return new Artist(
    doc.id,
    data.name,
    data.albums.map(album => new Album(album.albumId, album.title, album.songs, album.description))
  );
}
// Get all artists
exports.getAllArtists = async (req, res) => {
  try {
    const artistsRef = collection(db, 'artist');
    const artistsSnapshot = await getDocs(artistsRef);

    const artists = artistsSnapshot.docs.map((doc) => {
      const artistData = doc.data();
      return {
        id: doc.id,
        name: artistData.name,
        albums: artistData.albums
      };
    });

    res.status(200).json(artists);
  } catch (error) {
    console.error('Error retrieving artists:', error);
    res.status(500).json({ error: error.message });
  }
};
