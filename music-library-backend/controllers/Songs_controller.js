const express = require('express');
const router = express.Router();
const db = require('../firebase'); // Adjust path as per your setup

const SongController = require('../controllers/Songs_controller');

// Create a new song
router.post('/', async (req, res) => {
    const { title, length } = req.body;
    const songController = new SongController(db); 
    const createdSongId = await songController.create({ title, length });
    if (createdSongId) {
        res.status(201).json({ songId: createdSongId });
    } else {
        res.status(500).json({ error: 'Failed to create song' });
    }
});

// Get a song by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const songController = new SongController(db); // Pass db instance here
    const song = await songController.getById(id);
    if (song) {
        res.json({ song });
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});

// Update a song by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, length } = req.body;
    const songController = new SongController(db); // Pass db instance here
    const updated = await songController.update({ songId: id, title, length });
    if (updated) {
        res.json({ message: 'Song updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to update song' });
    }
});

// Delete a song by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const songController = new SongController(db); // Pass db instance here
    const deleted = await songController.delete(id);
    if (deleted) {
        res.json({ message: 'Song deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete song' });
    }
});

module.exports = router;
