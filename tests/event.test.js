// const request = require('supertest');
// const app = require('../src/index'); 

// const Event = require('../models/Event'); 
// const Booking = require('../models/Booking'); 

// jest.mock('../models/Event');

// describe('Event API', () => {
//   it('should initialize an event', async () => {
//     const res = await request(app)
//       .post('/api/v1/events/initialize')
//       .send({ name: 'Concert', totalTickets: 100 });

//     expect(res.status).toBe(201);
//     expect(res.body.name).toBe('Concert');
//   });
// });



// describe('GET /events/status/:eventId', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return event status and waiting list count', async () => {
//     const eventId = 1;
//     const mockEvent = { id: eventId, name: 'Concert', totalTickets: 100 };
//     const waitingListCount = 5;

//     // Mock the database calls
//     Event.findByPk.mockResolvedValue(mockEvent);
//     Booking.count.mockResolvedValue(waitingListCount);

//     const res = await request(app)
//       .get(`/events/status/${eventId}`)
//       .expect('Content-Type', /json/)
//       .expect(200);

//     expect(res.body).toEqual({
//       event: mockEvent,
//       waitingList: waitingListCount,
//     });
//   });

//   it('should return 404 if event not found', async () => {
//     const eventId = 1;

//     // Mock the database call to return null
//     Event.findByPk.mockResolvedValue(null);

//     const res = await request(app)
//       .get(`/events/status/${eventId}`)
//       .expect('Content-Type', /json/)
//       .expect(404);

//     expect(res.body).toEqual({
//       error: 'Event not found',
//     });
//   });

//   it('should return 500 if there is an error retrieving event status', async () => {
//     const eventId = 1;

//     // Mock the database call to throw an error
//     Event.findByPk.mockRejectedValue(new Error('Database error'));

//     const res = await request(app)
//       .get(`/events/status/${eventId}`)
//       .expect('Content-Type', /json/)
//       .expect(500);

//     expect(res.body).toEqual({
//       error: 'Failed to retrieve event status',
//     });
//   });
// });

const request = require('supertest');
const app = require('../src/index'); 
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const sequelize = require('../config/db');  


jest.mock('../models/Event');
jest.mock('../models/Booking');


  
describe('Event API', () => {

   afterAll(async () => {
      await sequelize.close(); 
    });

  describe('POST /api/v1/events/initialize', () => {
  
   it('should initialize an event', async () => {

      const eventData = { name: 'Concert', totalTickets: 100, availableTickets: 100 };

      Event.create = jest.fn().mockResolvedValue(eventData); 
    
      const res = await request(app)
        .post('/api/v1/events/initialize')
        .send({ name: 'Concert', totalTickets: 100 });
    
      expect(res.status).toBe(201);

      expect(res.body.name).toBe('Concert');

      expect(Event.create).toHaveBeenCalledWith({
        name: 'Concert',
        totalTickets: 100,
        availableTickets: 100, 
      });
    });
    
});

  describe('GET /events/status/:eventId', () => {
   
    afterEach(() => {
      jest.clearAllMocks(); 
    });

    it('should return event status and waiting list count', async () => {
     
      const eventId = 1;

      const mockEvent = { id: eventId, name: 'Concert', totalTickets: 100 };

      const waitingListCount = 5;

    
      Event.findByPk.mockResolvedValue(mockEvent);

      Booking.count.mockResolvedValue(waitingListCount);

      const res = await request(app)
        .get(`/api/v1/events/status/${eventId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toEqual({
        event: mockEvent,
        waitingList: waitingListCount,
      });
    });

    it('should return 404 if event not found', async () => {

      const eventId = 1;
      
      Event.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .get(`/api/v1/events/status/${eventId}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body).toEqual({
        error: 'Event not found',
      });
    });

    it('should return 500 if there is an error retrieving event status', async () => {
      
      const eventId = 1;

      Event.findByPk.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .get(`/api/v1/events/status/${eventId}`)
        .expect('Content-Type', /json/)
        .expect(500);

      expect(res.body).toEqual({
        error: 'Failed to retrieve event status',
      });
    });
  });
});
