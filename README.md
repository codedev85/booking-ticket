*** Project Set UP ***

1. Run 
   npm install 

2. Create .env 

   Add this parameters to the .env :

   **DB_PASSWORD**
   **DATABASE**
   **USERNAME**
   **PORT** : this optional , if the PORT is not declared in the .env it will fedault to **3000**

3. Run
   **npm run start** to start the server 

4. Test (Run)
   **npm test** 

5. Apis:

   Events :

   To Initialize Events

   **/api/v1/events/initialize**

   Event Status

   **/api/v1/events/status/:eventId**

   Book Events 

   **/api/v1/bookings/book**

   Cancel Bookings

   **/api/v1/bookings/cancel**