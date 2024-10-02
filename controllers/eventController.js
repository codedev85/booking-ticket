
// const { Event } = require('../models/event');

// const { Booking } = require('../models/booking');

// exports.initializeEvent = async (req, res) => {
//   const { name, totalTickets } = req.body;
//   try {
//     const event = await Event.create({ name, totalTickets, availableTickets: totalTickets });
//     res.status(200).json(event);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.bookTicket = async (req, res) => {
//   const { eventId, userId } = req.body;

//   const transaction = await sequelize.transaction();
//   try {
//     const event = await Event.findByPk(eventId, { transaction });

//     if (event.availableTickets > 0) {
//       event.availableTickets--;
//       await event.save({ transaction });
//       await Booking.create({ eventId, userId, status: 'booked' }, { transaction });
//     } else {
//       await Booking.create({ eventId, userId, status: 'waiting' }, { transaction });
//     }

//     await transaction.commit();
//     res.status(200).json({ message: 'Ticket booked or added to waiting list' });
//   } catch (error) {
//     await transaction.rollback();
//     res.status(500).json({ message: 'Error processing request' });
//   }
// };

//  exports.cancelBooking = async (req, res) => {
//    const { eventId, userId } = req.body;
//    const booking = await Booking.findOne({ where: { eventId, userId, status: 'booked' } });
 
//    if (!booking) {
//      return res.status(404).json({ message: 'Booking not found' });
//    }
 
//    await booking.destroy();
//    const event = await Event.findByPk(eventId);
//    event.availableTickets++;
//    await event.save();
 
//    const nextInLine = await Booking.findOne({ where: { eventId, status: 'waiting' } });
//    if (nextInLine) {
//      nextInLine.status = 'booked';
//      await nextInLine.save();
//      event.availableTickets--;
//      await event.save();
//    }
 
//    res.status(200).json({ message: 'Booking canceled and waiting list updated' });
//  };
 
const Event = require('../models/Event');
const Booking = require('../models/Booking');

const initializeEvent = async (req, res) => {
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

module.exports = { initializeEvent, getEventStatus };
