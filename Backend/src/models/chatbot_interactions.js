const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: String,
        enum : ['user', 'bot'],
        required : true
    },
    message:{
        type: String,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const interactionSchema = new Schema({
    user_id: {
        type: String,
        required : true
    },
    messages: [messageSchema],
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const Interaction = mongoose.model('Interaction',interactionSchema);

module.exports = Interaction;