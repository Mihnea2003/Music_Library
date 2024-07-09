const express = require('express');
const router = express.Router();
const db = require('../firebase'); // Adjust path as per your setup

const AlbumController = require('../controllers/Albums_controller');

// Create a new album
router.post('/', async (req, res) => {
    const { title, songs, description } = req.body;
    const albumController = new AlbumController(db); 
    const createdAlbumId = await albumController.create({ title, songs, description });
    if (createdAlbumId) {
        res.status(201).json({ albumId: createdAlbumId });
    } else {
        res.status(500).json({ error: 'Failed to create album' });
    }
});

// Get an album by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const albumController = new AlbumController(db); // Pass db instance here
    const album = await albumController.getById(id);
    if (album) {
        res.json({ album });
    } else {
        res.status(404).json({ error: 'Album not found' });
    }
});

// Update an album by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, songs, description } = req.body;
    const albumController = new AlbumController(db); // Pass db instance here
    const updated = await albumController.update({ albumId: id, title, songs, description });
    if (updated) {
        res.json({ message: 'Album updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to update album' });
    }
});

// Delete an album by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const albumController = new AlbumController(db); // Pass db instance here
    const deleted = await albumController.delete(id);
    if (deleted) {
        res.json({ message: 'Album deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete album' });
    }
});

module.exports = router;
