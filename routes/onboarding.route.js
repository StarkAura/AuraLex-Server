const express = require('express');
const router = express.Router();
const { onboardStudent } = require('../controllers/onboarding');
const { validateStudent } = require('../middlewares/onboarding');

router.post('/onboard', validateStudent, onboardStudent);

module.exports = router;