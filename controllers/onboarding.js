const { Student, students } = require('../models/onboarding.model');
const { sendWelcomeEmail } = require('../utils/email');

function onboardStudent(req, res) {
    const student = new Student(req.body);
    students.push(student);
    // Send welcome email (non-blocking)
    sendWelcomeEmail(student).catch(() => {});
    res.status(201).json({
        message: 'Student onboarded successfully',
        student,
    });
}

function getFilteredStudents(req, res) {
    const { age, learningPreferences, learningGoals } = req.query;

    let filteredStudents = [...students];

    if (age) {
        if (age.includes('-')) {
            const [minAge, maxAge] = age.split('-').map(Number);
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

function getAllStudents(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Get total count before pagination
        const totalStudents = students.length;

        // Apply pagination to students array
        const paginatedStudents = students.slice(startIndex, endIndex);

        // Prepare pagination metadata
        const pagination = {
            totalStudents,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            studentsPerPage: limit,
        };

        // If no students found
        if (totalStudents === 0) {
            return res.status(200).json({
                message: 'No students found',
                data: [],
                pagination,
            });
        }

        return res.status(200).json({
            data: paginatedStudents,
            pagination,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching students',
            error: error.message,
        });
    }
}

module.exports = {
    onboardStudent,
    getFilteredStudents,
    getAllStudents,
};
