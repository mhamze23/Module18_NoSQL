// Import the required dependencies and initialize an Express router
const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// Set up the router to handle requests for all users
// - GET: Retrieve all users
// - POST: Create a new user
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up the router to handle requests for a single user by userId
// - GET: Retrieve a specific user
// - PUT: Update a specific user's data
// - DELETE: Remove a specific user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Set up the router to handle requests for managing friends of a user
// - POST: Add a friend to a user's friend list
// - DELETE: Remove a friend from a user's friend list
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// Export the router for use in other parts of the application
module.exports = router;
