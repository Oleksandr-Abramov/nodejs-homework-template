const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne(email);

  if (!user || user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a href:"http://localhost:3000/api/users/verify/${user.verificationToken}">Для підтвердження пошти перейдіть за посиланням</a>`,
  };

  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};

module.exports = resendEmail;
