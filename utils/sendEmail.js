import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, htmlComtent) => {
    try {
        console.log('📧 Preparing to send email to:', to);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"MERN Store" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: htmlComtent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);       
    } catch (err) {
        console.error('❌ Email send failed:', err.message);
    }
};

export default sendEmail;




// Would you like me to provide a fallback email 
// provider (e.g., Mailtrap for dev) 
// or help you switch to something like SendGrid?