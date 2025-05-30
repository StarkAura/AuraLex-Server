const { Student, students } = require('../models/onboarding.model');

function onboardStudent(req, res) {
  const student = new Student(req.body);
  students.push(student);
  res.status(201).json({ message: 'Student onboarded successfully', student });
}

module.exports = { onboardStudent };