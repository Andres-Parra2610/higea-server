const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "andresparra261000@gmail.com",
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
});

module.exports = transporter

