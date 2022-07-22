/**
 * Common middleware that we have to use by default every time
 * @author Yousuf Kalim
 */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { videoStream } = require('../controllers/videos');

// Common Middleware
module.exports = (app) => {
  app.use(cors({ origin: true })); // CORS (Cross Origin Policy) to restrict unknown requests
  app.use(logger('dev')); // Morgan - to log every request in console
  app.use(express.urlencoded({ extended: true })); // to get url encoded data from requests
  app.use(express.json()); // to send json data in response (It's mandatory in rest api's)
  app.use('/uploads/videos/:dir/:video', videoStream); //  path to serve uploaded videos
  app.use('/uploads', express.static('uploads', { maxAge: '31536000' })); // Static path to serve uploaded images with cache policy
};
