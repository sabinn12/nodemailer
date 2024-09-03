const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Enable CORS for all origins (or specify a specific origin)
app.use(cors({
    origin: 'https://sabinn.netlify.app/' ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']// Replace with your frontend's origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Setup email data
    let mailOptions = {
        from: `"${name}" <${email}>`,  // Show sender's name and email
        to: process.env.EMAIL_TO, 
        subject: subject,
        text: `Message from: ${name} (${email})\n\n${message}`,  // Include the user's email in the message body
        html: `<p>Message from: <strong>${name}</strong> (${email})</p><p>${message}</p>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send email' });
        }
        res.status(200).send({ message: 'Email sent successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
