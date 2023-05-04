// Import the required dependencies
const router = require('express').Router();
const apiRoutes = require('./api');

// Register the API routes
router.use('/api', apiRoutes);

// Handle requests to unknown routes
router.use((req, res) => res.status(404).send('Error: The requested route does not exist.'));

// Export the router module
module.exports = router;
