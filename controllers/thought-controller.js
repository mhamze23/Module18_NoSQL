const { Users, Thoughts } = require('../models');

module.exports = {
    // Fetch all thoughts from the database
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Fetch a single thought from the database using its _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .populate({
                    path: 'reactions',
                    select: '-__v',
                });

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought was found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought and associate it with a user
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body)
                .then(({ _id }) => {
                    return Users.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $push: { thoughts: _id } },
                        { new: true },
                    );
                });

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update an existing thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought was found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought was found with that ID' });
            }

            res.json({ message: 'Thought has been deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought was found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought was found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

