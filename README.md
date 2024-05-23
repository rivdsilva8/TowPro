# TowPro


## Dependencies
- Node.js
- MongoDB (MongoDB Compass preferred)
- Leaflet
- React
- Axios
- Express

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Set up MongoDB and create a database for the project.
3. Configure the MongoDB connection in the project.

# Running the Application

There are 2 parts to the application

* Back-End
* Front-End

# back-End :
1. Navigate to the backend by using / or open in a new terminal
   
   ```bash
   cd ./TowPro/backend
   ```
   
2. Install all dependencies by running
   
   ```bash
   npm i 
   ```
   
4. The Backend server will be running by default on port 3000
  ```bash
   http://localhost:3000
   ```
   
# Front-End :
1. Navigate to the Frontend by using / or open in a new terminal
   
   ```bash
   cd ./TowPro/frontend
   ```
   
2. Install all dependencies by running
   
   ```bash
   npm i 
   ```
   
3. Run the Frontend server using the command

   ```bash
   npm run dev
   ```

4. The Frontend server will be running by default on port 5173
   open the link on a web browser to view the application

   ```bash
   http://localhost:5173
   ```

## Making Post Requests to /gpsstatus
you can either use the UI on /maps page or use postman and post to 
   ```bash
   http://localhost:3000/gpsstatus
   ```

req.body
   ```bash
   {
    "lat":40.77307293228911,
    "lng": -73.97281283499132,
    "header": 10.0003
}


   ```





       
