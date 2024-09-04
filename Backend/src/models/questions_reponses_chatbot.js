const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predefinedQuestionsSchema = new Schema({
    questionId: {
        type: String,
        required : true,
        unique: true
    },
    question: {
        type: String,
        required : true
    },
    responses: [{
        type: String,
        required : true
    }],
    category: {
        type: String,
        required : true
    },
    keywords: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PredefinedQuestion = mongoose.model('PredefinedQuestion',predefinedQuestionsSchema);

module.exports = PredefinedQuestion;