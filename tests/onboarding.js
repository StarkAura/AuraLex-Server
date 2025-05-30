const assert = require('assert');
const { Student } = require('../models/onboarding.model');

describe('Student Model', () => {
  it('should create a student with required fields', () => {
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
      longTermGoal: 'Get a job'
    };
    const student = new Student(data);
    assert.strictEqual(student.fullName, data.fullName);
    assert.strictEqual(student.email, data.email);
    assert.strictEqual(student.age, data.age);
  });
});