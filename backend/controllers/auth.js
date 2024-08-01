const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");

const {
  models: { User },
} = sequelize;

// register route
const registerUser = async (req, res) => {
  const { password, username, profileImg } = req.body;
  try {
    // ensure user makes a username and password
    if (!password || !username) {
      return res
        .status(400)
        .json({ error: "Fill out all fields for user registration" });
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    //   find user by username in database
    const [user, created] = await User.findOrCreate({
      where: { username: username },
      defaults: {
        username,
        password: hashedPassword,
        profileImg,
      },
    });
    // check if username exists
    if (!created) {
      return res.status(400).json({ error: "Username already taken" });
    }
    // Generate a JWT token with the created user data
    let token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Respond with the generated token
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to register user" });
  }
};

// login route
const loginUser = async (req, res) => {
  const { password, username } = req.body;

  try {
    // get selected user by username
    const user = await User.findOne({ where: { username } });
    console.log(user, "<-- user");
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    // compare password with hashed pasword
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Invalid credentials. Please try again" });
    }

    // generate token
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    // respond
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to login user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
