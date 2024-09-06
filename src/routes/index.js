const { Router } = require('express');
const router = Router();
const dataController = require('../controllers/dataController');

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
});

router.get('/api/list', dataController.list);

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
router.get('/api/listschedule', dataController.listshedules);

router.post('/api/addschedule', dataController.addschedule);

router.put('/api/updateschedule/:id', dataController.updateschedule);
 
router.delete('/api/deleteschedule/:id', dataController.deleteschedule);


module.exports = router;