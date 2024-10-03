const router = require('express').Router()
const { bookTicket, cancelBooking ,validateBooking, validateCancellation } = require('../controllers/bookingController');

router.post('/book', validateBooking,bookTicket);
router.post('/cancel',validateCancellation, cancelBooking);


module.exports = router ;