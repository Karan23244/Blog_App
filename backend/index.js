const app = require("./app");
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const db = require("./config/db");
require('dotenv').config();

// Serve static files (images)
const staticPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticPath));
console.log("Static files served from:", staticPath);
const port = process.env.PORT || 5500;

const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false,                   
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

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const query = `SELECT * FROM subscribers WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const insertQuery = `INSERT INTO subscribers (email) VALUES (?)`;
        db.query(insertQuery, [email], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            // Define an HTML template with an image
            const htmlTemplate = `
                <div style="text-align: center; font-family: Arial, sans-serif;">
                    <img src="https://raw.githubusercontent.com/Karan23244/Image/refs/heads/main/Thankyou%20Card_11zon.webp" alt="Thank You" style="width: 100%; max-width: 600px; margin-top: 20px;" />
                </div>
            `;

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Thank You for Subscribing!',
                html: htmlTemplate, // Use HTML content
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error("Error sending email:", err);
                    return res.status(500).json({ message: 'Error sending email', error: err });
                }
                console.log("Email sent successfully:", info.response);
                return res.status(200).json({ message: 'Subscription successful! Thank you email sent.' });
            });
        });
    });
});




app.listen(port, () => {
  console.log(`Server running on ${port}`);
});