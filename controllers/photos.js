const fs = require('fs');
const path = require('path').resolve(__dirname, '..');
const host = process.env.BASE_URL;

exports.uploadPhotos = (req, res) => {
  let files = req.files.map((file) => host + file.path);

  if (files.length > 1) {
    return res.json({ success: true, message: 'Photos uploaded successfully', urls: files });
  } else {
    return res.json({ success: true, message: 'Photo uploaded successfully', url: files[0] });
  }
};

exports.deletePhoto = (req, res) => {
  const file = req.body.file;
  const filePath = path + file.replace(host, '/');
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }
    return res.json({ success: true, message: 'Photo deleted successfully' });
  });
};
