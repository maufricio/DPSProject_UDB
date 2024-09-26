const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const interactionsSchema = new Schema({ //This schema is for the whole chat interactions for each user
    userId: {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
    },
    messages: [], //This is an array of messages containing the sender, the message and the timestamp

});

module.exports = mongoose.model('InteractionModel', interactionsSchema);