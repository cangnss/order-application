import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

async function sendLogByEmail(log: any) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_KEY
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_ADDRESS,
            to: 'cgunes52@gmail.com', // Alıcının e-posta adresi
            subject: 'Order Log', // E-posta konusu
            text: log // E-posta içeriği
        });

        console.log('Log sent via email');
    } catch (err) {
        console.error('Error sending log via email:', err);
    }
}

export default sendLogByEmail;