const router = require('express').Router()
const { initializeEvent, getEventStatus , validateEvent } = require('../controllers/eventController');


router.post('/initialize',  validateEvent ,initializeEvent);
router.get('/status/:eventId', getEventStatus);

module.exports = router ;