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
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user:"noreply.flamebackvcard@gmail.com" ,
      pass: "jluamfmnottyvnsd",
    },
  });

  const mailOptions = {
    from: "noreply.flamebackvcard@gmail.com",
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
