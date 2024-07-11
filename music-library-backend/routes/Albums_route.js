const express = require('express');
const router = express.Router();
const albumController = require('../controllers/Albums_controller');

router.post('/', albumController.createAlbum);
router.get('/', albumController.getAllAlbums);
router.get('/:album_id', albumController.getAlbumById);
router.put('/:album_id', albumController.updateAlbum);
router.delete('/:album_id', albumController.deleteAlbum);

module.exports = router;
