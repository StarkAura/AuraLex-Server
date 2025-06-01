const assert = require('assert');
const sinon = require('sinon');
const { Student } = require('../models/onboarding.model');
const { sendWelcomeEmail } = require('../utils/email');
const { onboardStudent } = require('../controllers/onboarding');

describe('Onboarding Email Notification', () => {
  let req, res, statusStub, jsonStub;

  beforeEach(() => {
    req = { body: {
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
    }};
    jsonStub = sinon.stub();
    statusStub = sinon.stub().returns({ json: jsonStub });
    res = { status: statusStub };
  });

  it('should call sendWelcomeEmail after onboarding', async () => {
    const emailStub = sinon.stub(sendWelcomeEmail, 'call').resolves(true);
    onboardStudent(req, res);
    // Allow event loop to process the async email
    await new Promise(r => setTimeout(r, 10));
    assert(statusStub.calledWith(201));
    assert(jsonStub.called);
    emailStub.restore();
  });
});
