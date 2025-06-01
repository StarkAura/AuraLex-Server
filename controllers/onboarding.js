const { Student, students } = require('../models/onboarding.model');

function onboardStudent(req, res) {
  const student = new Student(req.body);
  students.push(student);
  res.status(201).json({ message: 'Student onboarded successfully', student });
}

// GET /api/students?age=18-25&learningPreferences=visual&learningGoals=web3
function listStudents(req, res) {
  let filtered = students;
  const { age, learningPreferences, learningGoals } = req.query;

  // Filter by age (number or range)
  if (age) {
    if (/^\d+$/.test(age)) {
      filtered = filtered.filter(s => s.age === Number(age));
    } else if (/^(\d+)-(\d+)$/.test(age)) {
      const [, min, max] = age.match(/(\d+)-(\d+)/);
      filtered = filtered.filter(s => s.age >= Number(min) && s.age <= Number(max));
    }
  }

  // Filter by learningPreferences (string or array)
  if (learningPreferences) {
    const prefs = Array.isArray(learningPreferences)
      ? learningPreferences
      : String(learningPreferences).split(',').map(p => p.trim().toLowerCase());
    filtered = filtered.filter(s =>
      Array.isArray(s.learningPreferences) &&
      prefs.some(pref => s.learningPreferences.map(lp => String(lp).toLowerCase()).includes(pref))
    );
  }

  // Filter by learningGoals (partial string match)
  if (learningGoals) {
    const goal = String(learningGoals).toLowerCase();
    filtered = filtered.filter(s =>
      (s.learningGoals && String(s.learningGoals).toLowerCase().includes(goal)) ||
      (s.shortTermGoal && String(s.shortTermGoal).toLowerCase().includes(goal)) ||
      (s.longTermGoal && String(s.longTermGoal).toLowerCase().includes(goal))
    );
  }

  res.json({ students: filtered });
}

module.exports = { onboardStudent, listStudents };