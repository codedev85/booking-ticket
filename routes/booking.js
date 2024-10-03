const router = require('express').Router()
const { bookTicket, cancelBooking ,validateBooking, validateCancellation } = require('../controllers/bookingController');
const authenticateJWT = require('../middlewares/authMiddleware');
const { createRateLimiter } = require('../middlewares/rateLimiter');


//Five request every fiften minutes
const rateLimiter = createRateLimiter(5, 15 * 60 * 1000); 

router.post('/book',authenticateJWT ,rateLimiter, validateBooking,bookTicket);
router.get('/cancel/:bookingId',authenticateJWT,rateLimiter, cancelBooking);

module.exports = router ;