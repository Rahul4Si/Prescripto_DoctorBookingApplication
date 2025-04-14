// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB');
const cors = require('cors');
const connectCloudinary = require('./config/cloudinary');
const adminRoute = require('./routes/adminRoute');
const doctorRoute = require('./routes/doctorRoute');
const userRoute = require('./routes/userRoute');

// Configure dotenv to load environment variables
dotenv.config();


// Create an Express application
const app = express();
connectDB();
//connectCloudinary();


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Get the port from the environment variables or use a default
const PORT = process.env.PORT || 8080;

//API handlers
app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute);
app.use('/api/user',userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});