require('dotenv').config();
const {config} = require('./config/config');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,

  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.mailUser, // sender address
    to: 'guzmanjuan796@gmail.com', // list of receivers
    subject: 'NUEVO CORREO', // Subject line
    text: 'BIENVENID@', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main();
