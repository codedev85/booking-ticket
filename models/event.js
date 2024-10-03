const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 


const Event = sequelize.define('Event', {
   name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalTickets: {
    type:DataTypes.INTEGER,
    allowNull: false
  }, 
  availableTickets: {
   type:DataTypes.INTEGER, 
   allowNull: false
 }, 
 userId: {
   type:DataTypes.INTEGER,
   allowNull: false
 }, 
});

module.exports = Event;
 