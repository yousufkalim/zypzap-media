/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require('express').Router();

// Parent Routes
router.use('/photos', require('./photos')); // All the photo routes

// Export
module.exports = router;
