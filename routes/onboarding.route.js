const express = require('express');
const router = express.Router();
const { onboardStudent, getAllStudents } = require('../controllers/onboarding');
const { validateStudent } = require('../middlewares/onboarding');

router.post('/onboard', validateStudent, onboardStudent);
router.post('/', validateStudent, getAllStudents);

module.exports = router;
