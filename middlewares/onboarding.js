const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStudent(req, res, next) {
  const {
    fullName, email, age,
    learningPreferences, readingDifficultyLevel, assistiveTechnologyUsed,
    currentLevel, fieldOfInterest, preferredLanguage,
    contentFormat, hasStableInternet, deviceType, techFamiliarityLevel,
    country, timeZone,
    whyLearning, shortTermGoal, longTermGoal,
    learningGoals, accessibilityNeeds, web3Interests
  } = req.body;

  // Required fields
  if (!fullName || !email || typeof age !== 'number') {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  const readingLevels = ['none', 'mild', 'moderate', 'severe'];
  if (!readingLevels.includes(readingDifficultyLevel)) {
    return res.status(400).json({ error: 'Invalid readingDifficultyLevel.' });
  }
  const levels = ['High School', 'Undergraduate', 'Bootcamp', 'Self-taught'];
  if (!levels.includes(currentLevel)) {
    return res.status(400).json({ error: 'Invalid currentLevel.' });
  }
  const techLevels = ['Beginner', 'Intermediate', 'Advanced'];
  if (!techLevels.includes(techFamiliarityLevel)) {
    return res.status(400).json({ error: 'Invalid techFamiliarityLevel.' });
  }
  const formats = ['video', 'text', 'interactive', 'audio'];
  if (!Array.isArray(contentFormat) || !contentFormat.every(f => formats.includes(f))) {
    return res.status(400).json({ error: 'Invalid contentFormat.' });
  }
  if (typeof hasStableInternet !== 'boolean') {
    return res.status(400).json({ error: 'hasStableInternet must be boolean.' });
  }
  next();
}

module.exports = { validateStudent };