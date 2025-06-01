const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 


// Import routes
const onboardingRoutes = require('./routes/onboarding.route');
// Use routes
app.use('/api/onboarding', onboardingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('AuraLex Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const corsMiddleware = require('./middlewares/cors');

// Apply CORS before other middlewares
app.use(corsMiddleware);

// Add test route
app.get('/api/test-cors', (req, res) => {
  res.json({ message: 'CORS working!', origin: req.headers.origin });
});


