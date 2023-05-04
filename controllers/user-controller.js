const { Users, Thoughts } = require('../models');

module.exports = {
    // Retrieve all users from the database
    async getAllUsers(req, res) {
        try {
            const users = await Users.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Retrieve a single user by their _id, including associated thoughts and friends
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
                .populate({
                    path: 'thoughts',
                    select: '-__v',
                })
                .populate({
                    path: 'friends',
                    select: '-__v',
                });

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user was found with that ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new user using data from the request body
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user's information by their _id using data from the request body
    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user was found with that ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user by their _id and remove all associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await Users.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user was found with that ID' });
            }

            res.json({ message: 'User has been deleted' });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a new friend to a user's friend list using friend's _id
    async addFriend(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user was found with that ID' });
            }
            res.json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user's friend list using friend's _id
    async deleteFriend(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user was found with that ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};    
