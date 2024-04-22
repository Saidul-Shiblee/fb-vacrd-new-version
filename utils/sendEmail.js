const { createTransport } = require("nodemailer");
const generateEmailTemplate = require("./generateEmailTemplate");

const sendEmail = async (
  email,
  subject,
  url = undefined,
  purpose = undefined,
  OTP = undefined
) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: subject,
    html: purpose ? generateEmailTemplate(url, email, purpose, OTP) : null,
  };

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendEmail;
