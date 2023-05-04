const { Schema, model } = require('mongoose');

// Define the user schema
const userSchema = new Schema(
    {
        // Username field: unique, required, trimmed string
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // Email field: unique, required, validated string
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email"],
        },
        // Thoughts field: array of references to thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        // Friends field: array of references to users
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    {
        // Enable virtuals for JSON serialization
        toJSON: {
            virtuals: true
        }
    },
);

// Add a virtual property to the user schema for friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Create the Users model based on the user schema
const Users = model('Users', userSchema);

// Export the Users model
module.exports = Users;
