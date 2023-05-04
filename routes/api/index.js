// Import the required dependencies
const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// Set up routes for thoughts and users by prefixing them with their respective paths
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
