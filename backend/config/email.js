const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Transporter error:", error);
  } else {
    console.log("SMTP Transporter is ready");
  }
});

module.exports = transporter;
