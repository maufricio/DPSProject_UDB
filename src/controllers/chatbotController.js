const QuestionsModel = require('../models/questionsModel');
const InteractionModel = require('../models/interactionSchema');
//import message schema
const MessageModel = require('../models/messagesSchema');
const dataController = require('./dataController');
const jwt = require('jsonwebtoken');

//Global flag to control the question category and decide according to it
let isExecution = false;

//Function to handle the chat interactions
exports.handleInteraction = async (req, res) => {
    try {
        //Session id captured from the frontend 
        const { message } = req.body;
        // extract the name of the user and the id of the user from the token bearer authentication
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const userId = payload.idUser;

    
        processMessage(message, userId, res);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


const processMessage = async (message, userId, res) => {
    const userMessage = new MessageModel({
        sender: 'user',
        message: message,
        timestamp: new Date()
    });

    await userMessage.save();

    const chatbotSession = await InteractionModel.findOne({ userId: userId }); //returns the first interaction found with the userId, returns the whole object
    if(chatbotSession) {
        //If the chatbotSession is found, it will push the user message to the messages array
        await InteractionModel.findOneAndUpdate({ userId: userId }, { $push: { messages: userMessage } }); //The first parameter means to find the interaction with the userId, the second parameter means to push the userMessage to the messages array
        console.log("Chatbot session found");
    } else {
        //If the chatbotSession is not found, it will create a new chatbotSession
        const newChatbotSession = new InteractionModel({
            userId: userId,
            messages: [userMessage]
        });
        await newChatbotSession.save();
        console.log("Chatbot session created");
    }

    if(isExecution) {
        if(message.toLowerCase().contains('cancelar') || message.toLowerCase().contains('cancel')) {
            isExecution = false;
            const botMessage = await QuestionsModel.findOne({ keywords: {$in : ['cancelar', 'ya no']}});
            const botResponse = new MessageModel({
                sender: 'bot',
                message: botMessage.responses[0],
                timestamp: new Date()
            });
            await botResponse.save();
            await InteractionModel.findOneAndUpdate({ userId: userId }, { $push: { messages: botResponse } }); //The first parameter means to find the interaction with the userId, the second parameter means to push the userMessage to the messages array
            res.status(200).json({ response: botMessage.responses[0], phase: 1});
        } else {
            console.log('Ejecutando segunda fase');
        }
    }else if(!isExecution) {
        console.log('Ejecutando primera fase');
        
        const questionsMatch = await QuestionsModel.findOne({ keywords: { $in: message.split(' ') } }) | QuestionsModel.findOne({question: message});
        if(questionsMatch) {
            if(questionsMatch.category === 'Execution') {
                isExecution = true;
                const response = questionsMatch.responses[0];
    
                const botMessage = new MessageModel({
                    sender: 'bot',
                    message: response,
                    timestamp: new Date()
                });

                await botMessage.save();
                await InteractionModel.findOneAndUpdate({ userId: userId }, { $push: { messages: botMessage } });
                res.status(200).json({ response: response, subject: 'Tarea',  phase: 2});
            } else if( questionsMatch.category === 'Raw') {
                const response = questionsMatch.responses[0];
    
                const botMessage = new MessageModel({
                    sender: 'bot',
                    message: response,
                    timestamp: new Date()
                });

                await botMessage.save();
                await InteractionModel.findOneAndUpdate({ userId: userId }, { $push: { messages: botMessage } });
                res.status(200).json({ response: response, subject: 'Tarea',  phase: 1});
            }
        }
    }

    
}