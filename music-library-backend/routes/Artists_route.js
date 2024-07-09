const express = require('express');
const router = express.Router();
const db = require('../firebase'); // Adjust path as per your setup

const ArtistController = require('../controllers/Artists_controller');

// Create a new artist
router.post('/', async (req, res) => {
    const { name, albums } = req.body;
    const artistController = new ArtistController(db); 
    const createdArtistId = await artistController.create({ name, albums });
    if (createdArtistId) {
        res.status(201).json({ artistId: createdArtistId });
    } else {
        res.status(500).json({ error: 'Failed to create artist' });
    }
});

// Get an artist by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const artistController = new ArtistController(db); // Pass db instance here
    const artist = await artistController.getById(id);
    if (artist) {
        res.json({ artist });
    } else {
        res.status(404).json({ error: 'Artist not found' });
    }
});

// Update an artist by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, albums } = req.body;
    const artistController = new ArtistController(db); // Pass db instance here
    const updated = await artistController.update({ artistId: id, name, albums });
    if (updated) {
        res.json({ message: 'Artist updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to update artist' });
    }
});

// Delete an artist by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const artistController = new ArtistController(db); // Pass db instance here
    const deleted = await artistController.delete(id);
    if (deleted) {
        res.json({ message: 'Artist deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete artist' });
    }
});

module.exports = router;
