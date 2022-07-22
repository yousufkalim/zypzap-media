const fs = require('fs');
const path = require('path').resolve(__dirname, '..');
const mime = require('mime-types');
const host = process.env.BASE_URL;

exports.uploadVideos = (req, res) => {
  let files = req.files.map((file) => host + file.path);

  if (files.length > 1) {
    return res.json({ success: true, message: 'Videos uploaded successfully', urls: files });
  } else {
    return res.json({ success: true, message: 'Video uploaded successfully', url: files[0] });
  }
};

exports.videoStream = (req, res) => {
  // Create path from the parameters we got from the request
  let { dir, video } = req.params;
  const videoPath = `uploads/videos/${dir}/${video}`;

  //   If requested format is not supported, return error
  if (!video.match(/\.(mp4|mpeg|mov)$/)) {
    return res.status(400).json({ success: false, message: 'Video video format is not supported' });
  }
  //   If requested video is not found, return error
  else if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }

  // Ensure there is a range given for the video
  const range = req.headers.range;

  // get video stats (about 61MB)
  const videoSize = fs.statSync(videoPath).size;
  const mimeType = mime.lookup(videoPath);

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': mimeType,
    'cache-control': 'public, max-age=31536000',
  };

  if (!range) {
    res.writeHead(200, { 'Content-Length': contentLength, 'Content-Type': mimeType });
    return fs.createReadStream(path).pipe(res);
  }

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};

exports.deleteVideo = (req, res) => {
  const file = req.body.file;
  const filePath = path + file.replace(host, '/');
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    return res.json({ success: true, message: 'Video deleted successfully' });
  });
};
