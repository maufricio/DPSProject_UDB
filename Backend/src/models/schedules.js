const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    scheduleId: {
        type: String,
        required : true
    },
    hour:{
        type: String,
        required : true
    },
    day:{
        type: String,
        required : true
    },
    state:{
        type: Boolean,
        required : true
    }
},{ timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);