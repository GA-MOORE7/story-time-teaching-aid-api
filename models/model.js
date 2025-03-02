const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);


