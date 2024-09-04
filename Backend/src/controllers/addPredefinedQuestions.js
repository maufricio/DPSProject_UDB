const { keys } = require('underscore');
const PredefinedQuestion = require('../models/questions_reponses_chatbot');
const { v4: uuidv4 } = require('uuid');

//Ejecutar este archivo cuando haya la interaccion de un usuario con el chatbot 
//es decir al momento de abrir la aplicacion y que el usuario pregunte algo

const predefinedQuestions = [
    {
        questionId: uuidv4(),
        question: '¿Cómo puedo registrar una nueva actividad?',
        responses:
        [
            'Puedes registrar una actividad en la sección de actividades, en la parte superior derecha de la pantalla encontrarás el botón "Nueva actividad", haz clic en él y llena los campos requeridos.',
            'Para registrar una actividad, ve a la sección de actividades y haz clic en el botón "Nueva actividad", llena los campos requeridos y listo.'
        ],
        category: 'Actividades',
        keywords: ['actividad', 'registrar', 'nueva']
    }
]


predefinedQuestions.forEach(async (question) => {
    PredefinedQuestion.findOne({questionId: question.questionId}) //questionId has the semicolon because it is an object that calls the questionId property for each question in the array
    .then(async existingQuestion => {
        if(!existingQuestion) {
            const newQuestion = new PredefinedQuestion(question);
            await newQuestion.save().
            then(() => console.log(`Question ${questionData.questionId} added.`))
            .catch(err => console.error(`Error saving question ${questionData.questionId}:`, err));
        } else {
            console.log(`Question ${question.questionId} already exists.`);
        }
    }) .catch(err => console.error(`Error finding question ${question.questionId}:`, err));
});