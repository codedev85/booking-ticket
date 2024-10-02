# Ticket Booking System

A simple ticket booking system built with Node.js, Express, Sequelize, and MySQL.

## Table of Contents

- [Project Setup](#project-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

Follow these steps to set up the project:

1. **Install Dependencies**:
   
   Run the following command to install all the required dependencies:

   ```bash
   npm install

   Create .env File:
   Create a .env file in the root directory of your project and add the following parameters:


   DB_PASSWORD=your_db_password
   DATABASE=your_database_name
   USERNAME=your_db_username
   PORT=optional_port_number
   Note: If the PORT is not declared in the .env, it will default to 3000.


Start the Server:

To start the server, run the following command:

 npm run start


Run Tests:

To run tests for the application, use the command:

 npm test

Usage
Once the server is running, you can interact with the following API endpoints.
 
## API Endpoints

Events

Initialize an Event:

POST /api/v1/events/initialize

This endpoint is used to initialize an event.


 ```bash

   Request Body:

   json

   {
      "name": "Concert",
      "totalTickets": 100
   }


Get Event Status:

GET /api/v1/events/status/:eventId

This endpoint returns the status of a specific event and the number of people on the waiting list.

   Response:

   json

   {
   "event": {
      "id": 1,
      "name": "Concert",
      "totalTickets": 100
   },
   "waitingList": 5
   }


Bookings

Book an Event:

POST /api/v1/bookings/book

This endpoint is used to book tickets for an event.

Request Body:

json

{
  "eventId": 1,
  "userId": 123,
  "tickets": 2
}


Cancel a Booking:

POST /api/v1/bookings/cancel

This endpoint cancels an existing booking.

Request Body:

json

{
  "bookingId": 1
}

Environment Variables
The application requires the following environment variables to be set in a .env file:

DB_PASSWORD - The password for the database.
DATABASE - The name of the database.
USERNAME - The username for the database connection.
PORT - The port on which the server runs (optional; defaults to 3000).

Testing
To run tests for the project, execute the following command:

