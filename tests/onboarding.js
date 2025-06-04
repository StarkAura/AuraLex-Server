const assert = require('assert');
const { Student, students } = require('../models/onboarding.model');
const { onboardStudent, getAllStudents } = require('../controllers/onboarding');

describe('Student Onboarding Tests', () => {
    // Clear students array before each test
    beforeEach(() => {
        students.length = 0;
    });

    describe('Student Model', () => {
        it('should create a student with all required fields', () => {
            const data = {
                fullName: 'Test User',
                email: 'test@example.com',
                age: 20,
                learningPreferences: ['visual'],
                readingDifficultyLevel: 'mild',
                assistiveTechnologyUsed: 'None',
                currentLevel: 'Undergraduate',
                fieldOfInterest: 'CS',
                preferredLanguage: 'English',
                contentFormat: ['video'],
                hasStableInternet: true,
                deviceType: 'Laptop',
                techFamiliarityLevel: 'Intermediate',
                country: 'US',
                timeZone: 'EST',
                whyLearning: 'To learn',
                shortTermGoal: 'Finish course',
                longTermGoal: 'Get a job',
            };

            const student = new Student(data);

            // Test all fields are correctly set
            Object.keys(data).forEach((key) => {
                assert.deepStrictEqual(student[key], data[key]);
            });

            // Test auto-generated fields
            assert.ok(student._id);
            assert.ok(student.registeredAt instanceof Date);
        });

        it('should handle optional fields', () => {
            const data = {
                fullName: 'Test User',
                email: 'test@example.com',
                age: 20,
            };

            const student = new Student(data);

            // Test optional arrays are initialized empty
            assert.deepStrictEqual(student.learningPreferences, []);
            assert.deepStrictEqual(student.contentFormat, []);
            assert.deepStrictEqual(student.web3Interests, []);
        });
    });

    describe('GET /api/students endpoint', () => {
        it('should return empty array when no students exist', () => {
            const req = {
                query: {},
            };

            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert.deepStrictEqual(data, {
                        message: 'No students found',
                        data: [],
                        pagination: {
                            totalStudents: 0,
                            currentPage: 1,
                            totalPages: 0,
                            studentsPerPage: 10,
                        },
                    });
                },
            };

            getAllStudents(req, res);
        });

        it('should return paginated results', () => {
            // Add 15 test students
            for (let i = 0; i < 15; i++) {
                students.push(
                    new Student({
                        fullName: `Test User ${i}`,
                        email: `test${i}@example.com`,
                        age: 20 + i,
                    })
                );
            }

            const req = {
                query: {
                    page: 2,
                    limit: 10,
                },
            };

            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.data.length, 5); // Second page should have 5 remaining students
                    assert.deepStrictEqual(data.pagination, {
                        totalStudents: 15,
                        currentPage: 2,
                        totalPages: 2,
                        studentsPerPage: 10,
                    });
                },
            };

            getAllStudents(req, res);
        });
    });
});
