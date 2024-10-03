const router = require('express').Router()
const { initializeEvent, getEventStatus , validateEvent } = require('../controllers/eventController');
const authenticateJWT = require('../middlewares/authMiddleware');
const { createRateLimiter } = require('../middlewares/rateLimiter');


//Five request every fiften minutes
const rateLimiter = createRateLimiter(5, 15 * 60 * 1000); 

//authenticateJWT
//Included Authentication process but since it was not required , abadoned
router.post('/initialize',authenticateJWT,rateLimiter , validateEvent ,initializeEvent);
router.get('/status/:eventId',authenticateJWT,rateLimiter,getEventStatus);

module.exports = router ;