const { Router } = require('express');
const router = Router();
const dataController = require('../controllers/dataController');
const { validateToken, logout }  = require('../controllers/middlewareAuthentication');
const chatbotController = require('../controllers/chatbotController');

//routes
// Example public route
router.get('/', (req, res) => {
    res.send('Welcome to the public API');
});

router.get('/api/list',dataController.list);

router.get('/api/list/last', dataController.last);

router.get('/api/list/top25', dataController.top25);

router.post('/api/list/date', dataController.Date_show);

router.post('/api/list', dataController.add);

router.put('/api/list/:id', dataController.update);

router.delete('/api/list/:id', dataController.delete);

//rutas para users
router.get('/api/listuser', dataController.listusers);

router.post('/api/adduser', dataController.adduser);

router.post('/api/verifyuser', dataController.verifyuser);

router.put('/api/updateuser/:id', dataController.updateuser);

router.delete('/api/deleteuser/:id', dataController.deleteuser);

router.delete('/api/deleteAllUsers', dataController.deleteAllUsers);



//rutas para horarios
router.get('/api/listschedule', validateToken, dataController.listshedules);

router.post('/api/addschedule', validateToken, dataController.addschedule);

router.put('/api/updateschedule/:id', validateToken, dataController.updateschedule);

router.delete('/api/deleteschedule/:id', validateToken, dataController.deleteschedule);

//rutas para actividades
router.get('/api/listactivity/:idUser', validateToken, dataController.listsactivity);

router.post('/api/addactivity', validateToken, dataController.addactivity);

router.put('/api/updateactivity/:id', validateToken,  dataController.updateactivity);

router.delete('/api/deleteactivity/:id', validateToken,  dataController.deleteactivity);


//rutas para inicio de sesión y cerrar sesión

router.post('/api/login', dataController.login);
router.post('/api/logout', validateToken, logout); // this logic is in the same as with the middlewareAuthentication.js file


//Routes for chabot

router.post('/api/chatbot/uploadQuestions', dataController.uploadQuestions);
router.post('/api/chatbot/uploadSingleQuestion', dataController.uploadSingleQuestion);
router.post('/api/chatbot/makeAQuestion', chatbotController.handleInteraction);

module.exports = router;