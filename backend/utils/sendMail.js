const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE, // gmail
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD, // yahan Gmail App Password daalo
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};

module.exports = sendMail;
