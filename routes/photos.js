/**
 * Photo CRUD routes
 * @author Yousuf Kalim
 */
const router = require('express').Router();
const { upload } = require('../middleware/multer');
const { uploadPhotos, deletePhoto } = require('../controllers/photos');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post
 * @method delete
 */

// Upload
router.post('/:dir', upload.array('photos'), uploadPhotos);

// Delete
router.delete('/', deletePhoto);

// Export
module.exports = router;
