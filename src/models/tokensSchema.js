const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('TokenSchema', tokenSchema, 'tokens');