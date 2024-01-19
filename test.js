const nodemailer = require('nodemailer');

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'alecmarkmorris@gmail.com',
        pass: 'hnebxzalnffmitav'
      }
    });

    const mailOptions = {
      from: 'alecmarkmorris@gmail.com',
      to: 'alecmarkmorris@example.com',
      subject: 'Hello',
      text: 'This is the body of the email.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

sendEmail();