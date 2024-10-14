const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
  });

  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`, // Sender address
    to: options.email, // Recipient email address
    subject: options.subject, // Email subject
    text: options.message, // Plain text body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
