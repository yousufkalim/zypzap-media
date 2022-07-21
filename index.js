/**
 * ZypZap media server
 * @author Yousuf Kalim
 */
require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 5000;

// Middleware
require('./middleware/common')(app);

// Media Routes
app.use('/media', require('./routes'));

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
