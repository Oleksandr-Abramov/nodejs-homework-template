const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const verificationToken = nanoid();
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({ email, password: hashedPassword, subscription, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a href:"${BASE_URL}/api/users/verify/${verificationToken}">Для підтвердження пошти перейдіть за посиланням</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
