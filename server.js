// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();



// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use(cors({
//     origin: ['https://sabinn.netlify.app/'] ,
//     methods: ['POST'],
//     allowedHeaders: ['Content-Type']
// }));



// app.post('/contact', (req, res) => {
//     const { name, email, subject, message } = req.body;

    
//     let transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

   
//     let mailOptions = {
//         from: `"${name}" <${email}>`,  
//         to: process.env.EMAIL_TO, 
//         subject: subject,
//         text: `Message from: ${name} (${email})\n\n${message}`,  
//         html: `<p>Message from: <strong>${name}</strong> (${email})</p><p>${message}</p>`,
//     };


//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).send({ error: 'Failed to send email' });
//         }
//         res.status(200).send({ message: 'Email sent successfully' });
//     });
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'https://sabinn.netlify.app',  // Allow your Netlify domain
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    let mailOptions = {
        from: email, 
        to: process.env.EMAIL_TO, 
        subject: subject,
        text: message,
        html: `<p>${message}</p>`,
    };

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

