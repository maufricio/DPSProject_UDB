const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
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
        require: true
    } 
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema, 'schedules');