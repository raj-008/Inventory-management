require("dotenv").config();
const nodemailer = require("nodemailer");
const PasswordResetToken = require("../Models/PasswordResetToken");

const sendEmailVerificationMail = async (token, receiver, userId) => {

  const resetToken = await PasswordResetToken.findOne({ user_id: userId });

  if (resetToken) {
    await PasswordResetToken.updateOne({ user_id: userId.toString() }, { $set: { token: token } });
  } else {
    await PasswordResetToken.create({ user_id: userId, token: token, expired_at: new Date(Date.now() + 1000 * 60 * 10) });
  }

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_FROM,
    to: receiver,
    subject: "Verify Your Email",
    html: `<p>Thank you for choosing us.</p>
        <p>Click this <a href="${process.env.FRONT_URL}/verify-email/${token}/${userId}">link</a> to verify your email.</p><br><br><p>Thank You</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};


module.exports = sendEmailVerificationMail;