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
   type: DataTypes.ENUM('booked', 'waiting','cancelled'), 
   allowNull: false
 },

 customer_name: {
   type: DataTypes.STRING, 
   allowNull: false
 },

 customer_email: {
   type: DataTypes.STRING, 
   allowNull: false
 },
 
 customer_phone: {
   type: DataTypes.STRING, 
   allowNull: false
 },

});

module.exports = Booking;
