// Utility to send onboarding emails using Nodemailer
const nodemailer = require('nodemailer');

// Configure transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendWelcomeEmail(student) {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@auralex.com',
    to: student.email,
    subject: `Welcome to AuraLex, ${student.fullName}!`,
    html: `
      <h2>Welcome, ${student.fullName}!</h2>
      <p>Thank you for joining AuraLex. Here’s a summary of your onboarding info:</p>
      <ul>
        <li><b>Field of Interest:</b> ${student.fieldOfInterest}</li>
        <li><b>Preferred Language:</b> ${student.preferredLanguage}</li>
        <li><b>Current Level:</b> ${student.currentLevel}</li>
        <li><b>Learning Preferences:</b> ${student.learningPreferences?.join(', ')}</li>
        <li><b>Content Format:</b> ${student.contentFormat?.join(', ')}</li>
        <li><b>Short Term Goal:</b> ${student.shortTermGoal}</li>
        <li><b>Long Term Goal:</b> ${student.longTermGoal}</li>
      </ul>
      <p>Get started by exploring your personalized dashboard and resources. If you have questions, reply to this email or visit our <a href="https://auralex.com/help">Help Center</a>.</p>
      <p>Happy learning!<br/>The AuraLex Team</p>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Email sending failed:', err);
    return false;
  }
}

module.exports = { sendWelcomeEmail };
