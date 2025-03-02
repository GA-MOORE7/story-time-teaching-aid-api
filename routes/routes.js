const express = require('express');
const Quiz = require('../models/model');
const router = express.Router();


// POST request to add a new quiz
router.post('/quizzes', async (req, res) => {
  
    try {
        const { name, questions } = req.body;
        if (!name || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "invalid request data" });
        }

        const newQuiz = new Quiz({
            name, 
            questions
        });

        await newQuiz.save();
        res.status(201).json(newQuiz);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// GET all the quizzes
router.get('/quizzes', async (req, res) => {

    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json( { message: error.message} );
    }
    
});

// GET all quizzes information
router.get('/quizzes-info', async (req, res) => {

    try {
        const quizzes = await Quiz.find().select("name _id");
        res.status(200).json(quizzes);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
});

// GET all the questions and answer for a particular quiz
router.get('/quizzes/:id', async (req, res) => {

    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404),json({ message: "Quiz not found" });
        }

        res.status(200).json(quiz);
 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;


