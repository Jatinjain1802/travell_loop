const nodemailer = require('nodemailer');
const env = require('../config/env');

async function sendEmail({ to, subject, text, attachments = [] }) {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    return { skipped: true, reason: 'SMTP not configured' };
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass
    }
  });

  await transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    text,
    attachments
  });

  return { skipped: false };
}

module.exports = sendEmail;
