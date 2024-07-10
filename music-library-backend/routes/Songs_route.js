const express = require('express');
const router = express.Router();
const songController = require('../controllers/Songs_controller');

router.post('/', songController.createSong);
router.get('/', songController.getAllSongs);
router.get('/:song_id', songController.getSongById);
router.put('/:song_id', songController.updateSong);
router.delete('/:song_id', songController.deleteSong);

module.exports = router;