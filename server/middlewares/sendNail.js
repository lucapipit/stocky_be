

import express from 'express';
const router = express.Router();
import cors from 'cors';
import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
   
    host: 'smtp.live.com',
    port: 25,
    secure: true,
    auth: {
        user: 'ouzinnbis@hotmail.it',
        pass: 'Lifofifo11!?'
    }
});

router.post('/sendemail', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from:'ouzinnbis@hotmail.it' ,
        to: 'mbengueousseynou143@gmail.com',
        subject: `New message from ${name} (${email})`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;

