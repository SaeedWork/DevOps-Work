require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware to parse JSON requests
app.use(express.json());

// Define a  simple route
const userRouter = require('./routes/userRoutes');
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});