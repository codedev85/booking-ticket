const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 


const Booking = sequelize.define('Booking', {
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull: false
  }, 
  status: {
   type: DataTypes.ENUM('booked', 'waiting'), 
   // type:DataTypes.STRING, // 'booked', 'waiting'
   allowNull: false
 }
});

module.exports = Booking;
