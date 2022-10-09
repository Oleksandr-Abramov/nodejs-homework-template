const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tmpUpload, originalname } = req.file;

    const smallAvatar = await Jimp.read(tmpUpload);
    await smallAvatar.cover(250, 250).writeAsync(tmpUpload);

    const { _id } = req.user;
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;

    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
