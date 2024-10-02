const express = require('express')

const dotenv = require('dotenv')
const bookingRoute = require('../routes/booking')
const eventRoute  = require('../routes/event');
const sequelize = require('../config/db');  
const bodyParser = require('body-parser');
const Event = require('../models/Event'); 
const Booking = require('../models/Booking'); 




const app = express();

app.use(bodyParser.json());


dotenv.config()


app.use("/api/v1/events",eventRoute)

app.use('/api/v1/bookings', bookingRoute);



sequelize.sync().then(() => console.log('Database synced'));



// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;