const { Router } = require('express');
const router = Router();
const dataController = require('../controllers/dataController');
const { authentication }  = require('../controllers/middlewareAuthentication');

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
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

router.put('/api/updateuser/:id', dataController.updateuser);

router.delete('/api/deleteuser/:id', dataController.deleteuser);



//rutas para horarios
router.get('/api/listschedule', authentication, dataController.listshedules);

router.post('/api/addschedule', authentication, dataController.addschedule);

router.put('/api/updateschedule/:id', authentication, dataController.updateschedule);

router.delete('/api/deleteschedule/:id', authentication, dataController.deleteschedule);

//rutas para actividades
router.get('/api/listactivity', authentication, dataController.listsactivity);

router.post('/api/addactivity', authentication, dataController.addactivity);

router.put('/api/updateactivity/:id', authentication,  dataController.updateactivity);

router.delete('/api/deleteactivity/:id', authentication,  dataController.deleteactivity);


//rutas para inicio de sesión y cerrar sesión

router.post('/api/login', dataController.login);
router.post('/api/logout', authentication, dataController.logout);

module.exports = router;