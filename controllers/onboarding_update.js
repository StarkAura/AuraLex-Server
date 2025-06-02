const { Student, students } = require("../models/onboarding.model");

// Allowed fields for update
const ALLOWED_FIELDS = [
  "fullName",
  "email",
  "age",
  "learningPreferences",
  "readingDifficultyLevel",
  "assistiveTechnologyUsed",
  "currentLevel",
  "fieldOfInterest",
  "preferredLanguage",
  "contentFormat",
  "hasStableInternet",
  "deviceType",
  "techFamiliarityLevel",
  "country",
  "timeZone",
  "whyLearning",
  "shortTermGoal",
  "longTermGoal",
  "learningGoals",
  "accessibilityNeeds",
  "web3Interests",
];

// Restricted fields that cannot be updated
const RESTRICTED_FIELDS = ["_id", "createdAt"];

async function studentUpdate(req, res) {
  const studentId = req.params.id;
  const updateFields = req.body;

  try {
    //We take the keys of the data coming from req.body and prevent it from being produced with prohibited ones.
    for (const key of Object.keys(updateFields)) {
      if (RESTRICTED_FIELDS.includes(key)) {
        return res
          .status(400)
          .json({ message: `Cannot update restricted field "${key}"` });
      }
    }

    //"For now, let's keep it like this because the student is not being created from the backend. I made the request using the ID, 
    // but later it will be fixed to  use s._id."
    let student = students.find((s) => String(s) === String(studentId));
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    for (const key of Object.keys(updateFields)) {
      if (ALLOWED_FIELDS.includes(key)) {
        student[key] = updateFields[key];
      }
    }

    return res
      .status(200)
      .json({ message: "Student updated successfully", updateFields });
  } catch (error) {
    return res
      .status(500)
      .json(error.message);
  }
}

module.exports = studentUpdate;
