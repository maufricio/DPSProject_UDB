const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({ // This schema is for the messages in the chat wether it could be from the user or the bot
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    message : {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


const interactionsSchema = new Schema({ //This schema is for the whole chat interactions for each user
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
    },
    messages: [messagesSchema],

});

module.exports = mongoose.model('Interactions', interactionsSchema);