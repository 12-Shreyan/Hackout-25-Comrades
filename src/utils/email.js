import nodemailer from 'nodemailer'

// Transporter (reusable SMTP connection)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Reusable function to send an email
async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: `"StackIt" <${process.env.EMAIL_USER}>`, // sender
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent:", info.messageId);
  return info;
}

module.exports = { transporter, sendEmail };
