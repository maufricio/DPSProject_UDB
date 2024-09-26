const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsModel = new Schema({
    question: {
        type: String,
        required: true
    },
    responses: {
        type: Array,
        required: true
    },
    keywords: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('QuestionsModel', questionsModel);
