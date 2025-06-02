const assert = require("assert");
const { Student, students } = require("../models/onboarding.model");
const { getFilteredStudents } = require("../controllers/onboarding");

describe("Students Filtering", () => {
  beforeEach(() => {
    students.length = 0;

    const testStudents = [
      {
        fullName: "Alice Johnson",
        email: "alice@example.com",
        age: 21,
        learningPreferences: ["visual", "interactive"],
        learningGoals: "web3 development",
        readingDifficultyLevel: "mild",
        currentLevel: "Undergraduate",
        techFamiliarityLevel: "Intermediate",
        contentFormat: ["video"],
        hasStableInternet: true,
      },
      {
        fullName: "Bob Smith",
        email: "bob@example.com",
        age: 18,
        learningPreferences: ["audio"],
        learningGoals: "blockchain basics",
        readingDifficultyLevel: "none",
        currentLevel: "High School",
        techFamiliarityLevel: "Beginner",
        contentFormat: ["audio"],
        hasStableInternet: true,
      },
      {
        fullName: "Carol Davis",
        email: "carol@example.com",
        age: 25,
        learningPreferences: ["visual"],
        learningGoals: "smart contracts",
        readingDifficultyLevel: "moderate",
        currentLevel: "Bootcamp",
        techFamiliarityLevel: "Advanced",
        contentFormat: ["text"],
        hasStableInternet: false,
      },
    ];

    testStudents.forEach((data) => {
      const student = new Student(data);
      students.push(student);
    });
  });

  it("should filter students by exact age", () => {
    const req = { query: { age: "21" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 1);
        assert.strictEqual(data[0].fullName, "Alice Johnson");
      },
    };
    getFilteredStudents(req, res);
  });

  it("should filter students by age range", () => {
    const req = { query: { age: "18-22" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 2);
        const names = data.map((s) => s.fullName);
        assert(names.includes("Alice Johnson"));
        assert(names.includes("Bob Smith"));
      },
    };
    getFilteredStudents(req, res);
  });

  it("should filter students by learning preferences", () => {
    const req = { query: { learningPreferences: "visual" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 2);
        const names = data.map((s) => s.fullName);
        assert(names.includes("Alice Johnson"));
        assert(names.includes("Carol Davis"));
      },
    };
    getFilteredStudents(req, res);
  });

  it("should filter students by learning goals", () => {
    const req = { query: { learningGoals: "web3" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 1);
        assert.strictEqual(data[0].fullName, "Alice Johnson");
      },
    };
    getFilteredStudents(req, res);
  });

  it("should filter students by multiple criteria", () => {
    const req = { query: { learningGoals: "web3", age: "18-25" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 1);
        assert.strictEqual(data[0].fullName, "Alice Johnson");
      },
    };
    getFilteredStudents(req, res);
  });

  it("should return empty array when no matches found", () => {
    const req = { query: { age: "30" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 0);
      },
    };
    getFilteredStudents(req, res);
  });

  it("should return all students when no filters applied", () => {
    const req = { query: {} };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 3);
      },
    };
    getFilteredStudents(req, res);
  });

  it("should handle invalid age gracefully", () => {
    const req = { query: { age: "invalid" } };
    const res = {
      json: (data) => {
        assert.strictEqual(data.length, 3);
      },
    };
    getFilteredStudents(req, res);
  });
});
