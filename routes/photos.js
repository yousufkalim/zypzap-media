/**
 * Photo CRUD routes
 * @author Yousuf Kalim
 */
const router = require('express').Router();
const { photoUpload } = require('../middleware/multer');
const { uploadPhotos, deletePhoto } = require('../controllers/photos');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post
 * @method delete
 */

// Upload
router.post('/:dir', photoUpload.array('photos'), uploadPhotos);

// Delete
router.delete('/', deletePhoto);

// Export
module.exports = router;
