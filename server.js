const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Import routes
// <<<<<<< feat/contribution-guide
// const onboardingRoutes = require('./routes/onboarding.route');
// const studentRoutes = require('./routes/onboarding_update');
// =======
const onboardingRoutes = require("./routes/onboarding.route");
const studentUpdateRoutes = require("./routes/onboarding_update");
const studentsFilterRoutes = require("./routes/onboarding_filtering");
// >>>>>>> main
// Use routes
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/students", studentUpdateRoutes);
app.use("/api/filtered_students", studentsFilterRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("AuraLex Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
