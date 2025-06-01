const express = require("express");
const router = express.Router();
const { getStudents } = require("../controllers/onboarding");

router.get("/", getStudents);

module.exports = router;
