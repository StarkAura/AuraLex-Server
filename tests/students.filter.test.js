const request = require('supertest');
const express = require('express');
const { Student, students } = require('../models/onboarding.model');
const onboardingRoutes = require('../routes/onboarding.route');

describe('GET /api/students', () => {
  let app;
  before(() => {
    app = express();
    app.use(express.json());
    app.use('/api', onboardingRoutes);
    // Seed students
    students.length = 0;
    students.push(
      new Student({
        fullName: 'Alice', email: 'alice@example.com', age: 21, learningPreferences: ['visual'], learningGoals: 'web3', shortTermGoal: 'Learn web3', longTermGoal: 'Blockchain dev' }),
      new Student({
        fullName: 'Bob', email: 'bob@example.com', age: 18, learningPreferences: ['audio'], learningGoals: 'ai', shortTermGoal: 'Learn AI', longTermGoal: 'AI engineer' }),
      new Student({
        fullName: 'Carol', email: 'carol@example.com', age: 25, learningPreferences: ['visual','audio'], learningGoals: 'web3', shortTermGoal: 'Finish course', longTermGoal: 'Web3 expert' })
    );
  });

  it('should return all students if no filter', async () => {
    const res = await request(app).get('/api/students');
    res.status.should.equal(200);
    res.body.students.should.have.length(3);
  });

  it('should filter by age (single)', async () => {
    const res = await request(app).get('/api/students?age=21');
    res.body.students.should.have.length(1);
    res.body.students[0].fullName.should.equal('Alice');
  });

  it('should filter by age (range)', async () => {
    const res = await request(app).get('/api/students?age=18-21');
    res.body.students.should.have.length(2);
  });

  it('should filter by learningPreferences', async () => {
    const res = await request(app).get('/api/students?learningPreferences=audio');
    res.body.students.should.have.length(2);
  });

  it('should filter by learningGoals (partial match)', async () => {
    const res = await request(app).get('/api/students?learningGoals=web3');
    res.body.students.should.have.length(2);
  });

  it('should filter by multiple params', async () => {
    const res = await request(app).get('/api/students?learningGoals=web3&age=18-22');
    res.body.students.should.have.length(1);
    res.body.students[0].fullName.should.equal('Alice');
  });

  it('should return empty if no match', async () => {
    const res = await request(app).get('/api/students?age=99');
    res.body.students.should.have.length(0);
  });

  it('should handle invalid age format gracefully', async () => {
    const res = await request(app).get('/api/students?age=abc');
    res.status.should.equal(200);
    res.body.students.should.have.length(3);
  });
});
