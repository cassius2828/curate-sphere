const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const { sign } = require("./test-jwt");
const {
  models: { User },
} = sequelize;

// register route
const registerUser = async (req, res) => {
  const { password } = req.body;
  try {
    // ensure user makes a username and password
    if (!req.body.password || !req.body.username) {
      return res
        .status(400)
        .json({ error: "Fill out all fields for user registration" });
    }
    //   find user by username in database
    const [user, created] = await User.findOrCreate({
      where: { username: req.body.username },
      defaults: {
        username: req.body.username,
        password: req.body.password,
        profileImg: req.body.profileImg
      }
    });
    console.log(user, ' <-- user')
    if (!created) {
      res.status(400).json({ error: "Username already taken" });
    }
    const token = sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
    res.status(201).json(user,token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to register user" });
  }

  // res.send('register successful')
};

// login route
const loginUser = async (req, res) => {
  // res.status(201).json({message: 'this is the login route'})
  // res.send('login successful')
  const user = {
    id: 1,
    username: "test",
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

module.exports = {
  registerUser,
  loginUser,
};
