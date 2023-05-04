const { connect, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = connection;
