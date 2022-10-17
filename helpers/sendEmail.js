const sangridMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sangridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "olabramov@meta.ua" };
  await sangridMail.send(mail);
  return true;
};

module.exports = sendEmail;
