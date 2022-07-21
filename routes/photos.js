/**
 * Photo CRUD routes
 * @author Yousuf Kalim
 */
const router = require('express').Router();
const { upload } = require('../middleware/multer');
const { uploadPhotos } = require('../controllers/photos');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post
 * @method delete
 */

// Upload
router.post('/:dir', upload.array('photos'), uploadPhotos);

// Export
module.exports = router;
