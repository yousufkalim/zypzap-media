/**
 * ZypZap media server
 * @author Yousuf Kalim
 */
require('dotenv').config();
const express = require('express');
const app = require('express')();
const https = require('https');
const fs = require('fs');
const node_env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;

// Middleware
require('./middleware/common')(app);

// Media Routes
app.get('/', (req, res) => res.send('ZypZap media server'));
app.use('/uploads', require('./routes'));
app.use('/uploads', express.static('uploads', { maxAge: '31536000' })); // Static path to serve uploaded images with cache policy

// Server
if (node_env === 'production') {
  // set up a route to redirect http to https
  app.get('*', function (req, res) {
    res.redirect('https://' + req.headers.host + req.url);
  });

  app.listen(80, () => console.log(`HTTP server listening on port 80`));

  const credentials = {
    key: fs.readFileSync('./ssl/private.key', 'utf8'),
    cert: fs.readFileSync('./ssl/certificate.crt', 'utf8'),
  };
  const server = https.createServer(credentials, app);
  server.listen(443, () => console.log(`ZypZap media server listening on port 443 in ${node_env} mode`));
} else {
  app.listen(port, () => {
    console.log(`Server is running at port ${port} :)`);
  });
}
