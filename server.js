const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsMiddleware = require('./middlewares/cors');

// Apply CORS before other middlewares
app.use(corsMiddleware);

// Middleware
app.use(express.json());

// Import routes
const onboardingRoutes = require("./routes/onboarding.route");
const studentUpdateRoutes = require("./routes/onboarding_update");
const studentsFilterRoutes = require("./routes/onboarding_filtering");

// Use routes
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/students", studentUpdateRoutes);
app.use("/api/filtered_students", studentsFilterRoutes);

// Add test route
app.get('/api/test-cors', (req, res) => {
  res.json({ message: 'CORS working!', origin: req.headers.origin });
});

// Basic route
app.get("/", (req, res) => {
  res.send("AuraLex Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});