const express = require('express');
const router = express.Router();
const { onboardStudent, listStudents } = require('../controllers/onboarding');
const { validateStudent } = require('../middlewares/onboarding');

router.post('/onboard', validateStudent, onboardStudent);

// GET /api/students with filtering
router.get('/students', listStudents);

module.exports = router;