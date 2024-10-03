const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { body, validationResult } = require('express-validator');

const validateEvent = [
  body('name').notEmpty().withMessage('Event name is required'),
  body('totalTickets').isInt({ gt: 0 }).withMessage('Total tickets must be a positive integer')
];


const initializeEvent = async (req, res) => {

  
  const errors = validationResult(req);

 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, totalTickets } = req.body;
  try {
    const event = await Event.create({
      name,
      totalTickets,
      availableTickets: totalTickets
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize event' });
  }
};

const getEventStatus = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    const waitingList = await Booking.count({ where: { eventId, status: 'waiting' } });
    res.json({
      event,
      waitingList
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event status' });
  }
};

module.exports = { initializeEvent, getEventStatus , validateEvent };
