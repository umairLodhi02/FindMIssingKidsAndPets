const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'umairlodhi02@gmail.com',
            service: 'umairlodhi02@gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: 'umairlodhi02@gmail.com',
                pass: 'um@!r123',
            },
        });

        await transporter.sendMail({
            from: 'umairlodhi02@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;