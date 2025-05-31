const express = require('express');
const router = express.Router();
const { validateStudent } = require('../middlewares/onboarding');
const studentUpdate = require('../controllers/student');

router.put('/:id', validateStudent, studentUpdate);

module.exports = router;