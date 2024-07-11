const express = require('express');
const router = express.Router();
const artistController = require('../controllers/Artists_controller');

router.post('/', artistController.createArtist);
router.get('/', artistController.getAllArtists);
router.get('/:artist_id', artistController.getArtistById);
router.put('/:artist_id', artistController.updateArtist);
router.delete('/:artist_id', artistController.deleteArtist);

module.exports = router;
