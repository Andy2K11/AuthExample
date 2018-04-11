const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const unique = require('mongoose-unique-validator');

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.plugin(unique);

module.exports = mongoose.model('User', schema);
