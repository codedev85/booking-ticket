const router = require('express').Router()
const { bookTicket, cancelBooking } = require('../controllers/bookingController');

router.post('/book', bookTicket);
router.post('/cancel', cancelBooking);


module.exports = router ;