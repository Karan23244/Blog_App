const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 service: "gmail",
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
