/**
 * Multer strategy to upload images
 * @author Yousuf Kalim
 */
const multer = require('multer');
const fs = require('fs');

// Multer strategy for local uploading. (Read multer's documentation for more details)
exports.photoUpload = multer({
  // to store images
  storage: multer.diskStorage({
    // Defining the path where we have to store the image
    destination: function (req, file, cb) {
      const dest = `uploads/photos/${req.params.dir}`;
      let stat = null;
      try {
        stat = fs.statSync(dest);
      } catch (err) {
        fs.mkdirSync(dest);
      }
      if (stat && !stat.isDirectory()) {
        throw new Error(`Directory cannot be created because an inode of a different type exists at "${dest}"`);
      }
      cb(null, dest); // Callback
    },
    // Creating a unique filename to avoid duplication error
    filename: function (req, file, cb) {
      // making file name to url friendly
      cb(null, Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-')); // Callback
    },
  }),
  // File size limit upto 5 mb
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(jpeg|png|jpg|gif|webp)$/)) {
      return cb(new Error('File types must be jpeg, jpg, png, gif or webp'));
    }
    cb(undefined, true);
  },
});

// Multer strategy for local uploading. (Read multer's documentation for more details)
exports.videoUpload = multer({
  // to store images
  storage: multer.diskStorage({
    // Defining the path where we have to store the image
    destination: function (req, file, cb) {
      const dest = `uploads/videos/${req.params.dir}`;
      let stat = null;
      try {
        stat = fs.statSync(dest);
      } catch (err) {
        fs.mkdirSync(dest);
      }
      if (stat && !stat.isDirectory()) {
        throw new Error(`Directory cannot be created because an inode of a different type exists at "${dest}"`);
      }
      cb(null, dest); // Callback
    },
    // Creating a unique filename to avoid duplication error
    filename: function (req, file, cb) {
      // making file name to url friendly
      cb(null, Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-')); // Callback
    },
  }),
  // File size limit upto 5 mb
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|mpeg|mov)$/)) {
      return cb(new Error('File types must be mp4, mpeg or mov'));
    }
    cb(undefined, true);
  },
});
