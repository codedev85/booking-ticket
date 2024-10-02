const router = require('express').Router()
const { initializeEvent, getEventStatus } = require('../controllers/eventController');


router.post('/initialize', initializeEvent);
router.get('/status/:eventId', getEventStatus);

module.exports = router ;