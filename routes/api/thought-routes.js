// Import the required dependencies
const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

// Set up the routes for handling all thoughts
router.route('/')
    .get(getAllThoughts) // Retrieve all thoughts
    .post(createThought); // Create a new thought

// Set up the routes for handling a single thought by its ID
router.route('/:thoughtId')
    .get(getSingleThought) // Retrieve a single thought
    .put(updateThought) // Update a thought
    .delete(deleteThought); // Delete a thought

// Set up the routes for handling reactions within a thought
router.route('/:thoughtId/reactions')
    .post(addReaction); // Add a reaction to a thought

// Set up the routes for handling a single reaction within a thought
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction); // Remove a reaction from a thought

// Export the router for use in the application
module.exports = router;
