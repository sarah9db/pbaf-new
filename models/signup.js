const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    ResearchAreas: String,
    Email: String,
    Password: String,
});

const User = mongoose.model('User',userSchema);

module.exports = User;