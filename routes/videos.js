/**
 * Video CRUD routes
 * @author Yousuf Kalim
 */
const router = require('express').Router();
const { videoUpload } = require('../middleware/multer');
const { uploadVideos, videoStream, deleteVideo } = require('../controllers/videos');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post
 * @method delete
 */

// Upload
router.post('/:dir', videoUpload.array('videos'), uploadVideos);

// Stream
router.get('/:dir/:video', videoStream);

// Delete
router.delete('/', deleteVideo);

// Export
module.exports = router;
