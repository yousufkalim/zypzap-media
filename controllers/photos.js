exports.uploadPhotos = (req, res) => {
  let files = req.files.map((file) => process.env.BASE_URL + file.path);

  if (files.length > 1) {
    return res.json({ success: true, message: 'Photos uploaded successfully', urls: files });
  } else {
    return res.json({ success: true, message: 'Photo uploaded successfully', url: files[0] });
  }
};
