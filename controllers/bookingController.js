const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

const validateBooking = [
   body('eventId').notEmpty().withMessage('Event ID is required'),
   body('userId').notEmpty().withMessage('User ID is required'),
 ];

 const validateCancellation = [
   body('eventId').notEmpty().withMessage('Event ID is required'),
   body('userId').notEmpty().withMessage('User ID is required'),
 ];

const bookTicket = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

  const { eventId, userId } = req.body;

  try {

    const event = await Event.findByPk(eventId);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.availableTickets > 0) {
      await Booking.create({ eventId, userId, status: 'booked' });
      event.availableTickets -= 1;
      await event.save();
      res.status(200).json({ message: 'Ticket booked successfully' });
    } else {
      await Booking.create({ eventId, userId, status: 'waiting' });
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


  const { eventId, userId } = req.body;
  try {
    const booking = await Booking.findOne({ where: { eventId, userId, status: 'booked' } });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Cancel the booking and add the first user from the waiting list
    await booking.destroy();

    const event = await Event.findByPk(eventId);
    event.availableTickets += 1;
    await event.save();

    const nextInLine = await Booking.findOne({ where: { eventId, status: 'waiting' } });
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
