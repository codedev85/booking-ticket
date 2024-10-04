# Ticket Booking System

A simple ticket booking system built with Node.js, Express, Sequelize, and MySQL.

## Table of Contents

- [Project Setup](#project-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)


## Project Setup

Follow these steps to set up the project:

1. **Install Dependencies**:
   
   Run the following command to install all the required dependencies:

   ```bash
   npm install

## Environment Variables

   Create .env File:
   Create a .env file in the root directory of your project and add the following parameters:

## Env Variables
   DB_PASSWORD=your_db_password

   DATABASE=your_database_name

   USERNAME=your_db_username

   PORT=optional_port_number

   JWT_SECRET= 'random secret'

   Note: If the PORT is not declared in the .env, it will default to 3000.

## Testing

Run Tests:

To run tests for the application, use the command:


npm test

Start the Server:

To start the server, run the following command:


 npm run start

## Usage

- Once the server is running, you can interact with the following API endpoints.
- Use Register endpoint to register a user and login with the user detials , after successful login a jwtToken will be returned to you , ensure you add the jwtToken to the bearer Token to make request to the event and bookings endpoint

## API Endpoints

```bash

Registration Endpoint


POST /api/v1/user/register

Request Body:

{
    "name" : "john doe",
    "email": "johndoe@gmail.com",
    "password": "password"
}



Login Endpoint

POST /api/v1/user/login

Request Body:

{
    "email": "johndoe@gmail.com",
    "password": "password"
}


Events

Initialize an Event:

POST /api/v1/events/initialize

This endpoint is used to initialize an event.


Request Body:

json

{
   "name": "Concert",
   "totalTickets": 100
}


Get Event Status:

GET /api/v1/events/status/:eventId

This endpoint returns the status of a specific event and the number of people on the waiting list.

   Response:json

  {
    "event": {
        "id": 1,
        "name": "new concerts",
        "totalTickets": 2000,
        "availableTickets": 2000,
        "userId": 1,
        "createdAt": "2024-10-03T18:35:37.000Z",
        "updatedAt": "2024-10-03T18:38:15.000Z"
    },
    "waitingList": 0
}
   
   
Bookings

Book an Event:

POST /api/v1/bookings/book

This endpoint is used to book tickets for an event.

Request Body:

json

{
  "eventId": 1,
  "customer_name": "John Doe",
  "customer_email": "john@gmail.co",
  "customer_phone": "094040040404"
}


Cancel a Booking:

GET /api/v1/bookings/cancel/:bookingId

This endpoint cancels an existing booking.

Request Params:



Environment Variables

The application requires the following environment variables to be set in a .env file:

DB_PASSWORD - The password for the database.
DATABASE - The name of the database.
USERNAME - The username for the database connection.
PORT - The port on which the server runs (optional; defaults to 3000).
JWT_SECRET - 'random secret'



