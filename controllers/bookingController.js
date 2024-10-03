const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

const validateBooking = [
   body('eventId').notEmpty().withMessage('Event ID is required'),
   body('customer_name').notEmpty().withMessage('Customer Name is required'),
   body('customer_email').notEmpty().withMessage('Customer Email is required'),
   body('customer_phone').notEmpty().withMessage('Customer Phone is required'),
 ];

 const validateCancellation = [
   body('bookingId').notEmpty().withMessage('Booking ID is required'),
 ];

const bookTicket = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

  const { eventId, customer_name , customer_email , customer_phone} = req.body;

  const authUserId = req.user.id; 

  try {

    const event = await Event.findByPk(eventId);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.availableTickets > 0) {
      
      await Booking.create({ eventId, userId : authUserId, status: 'booked' ,customer_name ,customer_email,customer_phone });
      
      event.availableTickets -= 1;
      
      await event.save();

      res.status(200).json({ message: 'Ticket booked successfully' });

    } else {

      await Booking.create({ eventId, userId : authUserId, status: 'waiting',customer_name ,customer_email,customer_phone  });

      res.status(200).json({ message: 'Event is sold out, you are on the waiting list' });

    }

  } catch (error) {

    res.status(500).json({ error: 'Failed to book ticket' });

  }

};

const cancelBooking = async (req, res) => {

   const errors = validationResult(req);

  
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }


//   const { bookingId } = req.body;
  const { bookingId } = req.params;

  try {

    const booking = await Booking.findOne({ where: { id: bookingId,  status: 'booked' } });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Cancel the booking and add the first user from the waiting list
   //  await booking.destroy();
    booking.status = 'cancelled';

    await booking.save();

    const event = await Event.findByPk(booking.eventId);

    event.availableTickets += 1;

    await event.save();

    const nextInLine = await Booking.findOne({ where: { eventId:booking.eventId, status: 'waiting' } });

    if (nextInLine) {
      nextInLine.status = 'booked';
      await nextInLine.save();
      event.availableTickets -= 1;
      await event.save();
    }

    res.status(200).json({ message: 'Booking canceled, waiting list updated' });

  } catch (error) {

    res.status(500).json({ error: 'Failed to cancel booking' });

  }

};

module.exports = { bookTicket, cancelBooking ,validateBooking, validateCancellation };
