const sangridMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, SG_EMAIL } = process.env;

sangridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: SG_EMAIL };
  await sangridMail.send(mail);
  return true;
};

module.exports = sendEmail;
