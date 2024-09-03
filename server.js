const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  
// Route to handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // transporter object using smtp transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    // setup email data
    let mailOptions = {
        from: `${name} <${email}>`, // Sender address
        to: process.env.EMAIL_TO, // Your email address to receive messages
        subject: subject,
        text: message,
        html: `<p>${message}</p>`,
    };
    // send email

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send email' });
        }
        res.status(200).send({ message: 'Email sent successfully' });
    });
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
