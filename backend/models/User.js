const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interest: String,
    location: String,
});

module.exports = mongoose.model('User', userSchema);
