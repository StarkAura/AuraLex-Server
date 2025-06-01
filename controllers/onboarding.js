const { Student, students } = require('../models/onboarding.model');
const { sendWelcomeEmail } = require('../utils/email');

function onboardStudent(req, res) {
  const student = new Student(req.body);
  students.push(student);
  // Send welcome email (non-blocking)
  sendWelcomeEmail(student).catch(() => {});
  res.status(201).json({ message: 'Student onboarded successfully', student });
}

module.exports = { onboardStudent };
