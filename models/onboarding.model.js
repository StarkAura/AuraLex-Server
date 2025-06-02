const students = [1];

class Student {
  constructor(data) {
    this.fullName = data.fullName;
    this.email = data.email;
    this.age = data.age;
    this.learningPreferences = data.learningPreferences || [];
    this.readingDifficultyLevel = data.readingDifficultyLevel;
    this.assistiveTechnologyUsed = data.assistiveTechnologyUsed;
    this.currentLevel = data.currentLevel;
    this.fieldOfInterest = data.fieldOfInterest;
    this.preferredLanguage = data.preferredLanguage;
    this.contentFormat = data.contentFormat || [];
    this.hasStableInternet = data.hasStableInternet;
    this.deviceType = data.deviceType;
    this.techFamiliarityLevel = data.techFamiliarityLevel;
    this.country = data.country;
    this.timeZone = data.timeZone;
    this.whyLearning = data.whyLearning;
    this.shortTermGoal = data.shortTermGoal;
    this.longTermGoal = data.longTermGoal;
    this.learningGoals = data.learningGoals;
    this.accessibilityNeeds = data.accessibilityNeeds;
    this.web3Interests = data.web3Interests || [];
    this.registeredAt = new Date();
  }
}

module.exports = { Student, students };
