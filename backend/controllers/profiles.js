const User = require("../models/user");
const bcrypt = require("bcrypt");

///////////////////////////
// * PUT | Update User Info
///////////////////////////
const putUpdateUserInfo = async (req, res) => {
  const { username, email } = req.body;
  const { profileImg, headerImg } = req.file;
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    // if cant find user
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id of ${userId}` });
    }
    // if email exists from req.body
    if (email) {
      user.email = email;
      await user.save();
    }
    // if username exists from req.body & username is different thatn original username
    if (username && username !== user.username) {
      user.username = username;
      await user.save();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update user info" });
  }
};

///////////////////////////
// * PUT | Update User Password
///////////////////////////
const putUpdateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id of ${userId}` });
    }
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (isPasswordValid && newPassword === confirmNewPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update user password" });
  }
};

module.exports = {
  putUpdateUserInfo,
  putUpdateUserPassword,
};
