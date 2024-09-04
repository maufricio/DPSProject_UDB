const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);