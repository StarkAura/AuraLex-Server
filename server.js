const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 


// Import routes
const onboardingRoutes = require('./routes/onboarding.route');
const studentRoutes = require('./routes/student.route');
// Use routes
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/students', studentRoutes);
// Basic route
app.get('/', (req, res) => {
  res.send('AuraLex Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


