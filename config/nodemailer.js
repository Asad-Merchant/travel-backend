import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_ACCOUNT_PASS_KEY
    },
});

export {transporter}