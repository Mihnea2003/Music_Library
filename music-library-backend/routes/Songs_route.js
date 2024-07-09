const express = require('express');
const router = express.Router();
const SongController = require('../controllers/Songs_controller');

// Create a new song
router.post('/', async (req, res) => {
    const { title, length } = req.body;
    const song = new SongController(title, length);
    const createdSong = await song.create();
    if (createdSong) {
        res.status(201).json({ song: createdSong });
    } else {
        res.status(500).json({ error: 'Failed to create song' });
    }
});

// Get a song by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const song = await SongController.getById(id);
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
    const song = new SongController(title, length, id);
    const updated = await song.update();
    if (updated) {
        res.json({ message: 'Song updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to update song' });
    }
});

// Delete a song by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await SongController.deleteById(id);
    if (deleted) {
        res.json({ message: 'Song deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete song' });
    }
});

module.exports = router;
