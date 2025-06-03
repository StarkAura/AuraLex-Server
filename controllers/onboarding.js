const { Student, students } = require("../models/onboarding.model");
const { sendWelcomeEmail } = require("../utils/email");

function onboardStudent(req, res) {
  const student = new Student(req.body);
  students.push(student);

  // Send welcome email (non-blocking)
  sendWelcomeEmail(student).catch(() => {});

  res.status(201).json({ message: "Student onboarded successfully", student });
}

function getFilteredStudents(req, res) {
  const { age, learningPreferences, learningGoals } = req.query;

  let filteredStudents = [...students];

  if (age) {
    if (age.includes("-")) {
      const [minAge, maxAge] = age.split("-").map(Number);
      if (!isNaN(minAge) && !isNaN(maxAge)) {
        filteredStudents = filteredStudents.filter(
          (student) => student.age >= minAge && student.age <= maxAge
        );
      }
    } else {
      const ageNum = Number(age);
      if (!isNaN(ageNum)) {
        filteredStudents = filteredStudents.filter(
          (student) => student.age === ageNum
        );
      }
    }
  }

  if (learningPreferences) {
    const preferences = Array.isArray(learningPreferences)
      ? learningPreferences
      : [learningPreferences];
    filteredStudents = filteredStudents.filter((student) =>
      preferences.some((pref) =>
        student.learningPreferences.some((studentPref) =>
          studentPref.toLowerCase().includes(pref.toLowerCase())
        )
      )
    );
  }

  if (learningGoals) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.learningGoals &&
        student.learningGoals
          .toLowerCase()
          .includes(learningGoals.toLowerCase())
    );
  }

  res.json(filteredStudents);
}

module.exports = { onboardStudent, getFilteredStudents };