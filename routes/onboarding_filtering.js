const express = require("express");
const router = express.Router();
const { getFilteredStudents } = require("../controllers/onboarding");

router.get("/", getFilteredStudents);

module.exports = router;
