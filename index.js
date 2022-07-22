/**
 * ZypZap media server
 * @author Yousuf Kalim
 */
require('dotenv').config();
const express = require('express');
const app = require('express')();
const port = process.env.PORT || 5000;

// Middleware
require('./middleware/common')(app);

// Media Routes
app.use('/uploads', require('./routes'));
app.use('/uploads', express.static('uploads', { maxAge: '31536000' })); // Static path to serve uploaded images with cache policy

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
