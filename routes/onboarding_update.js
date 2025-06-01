const express = require('express');
const router = express.Router();
const { validateStudent } = require('../middlewares/onboarding');
const studentUpdate = require('../controllers/onboarding_update');

router.put('/:id', validateStudent, studentUpdate);

module.exports = router;