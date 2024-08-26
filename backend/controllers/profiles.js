const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
///////////////////////////
// AWS SDK and User Model
///////////////////////////
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

// Initialize the S3 client with the region from environment variables
const s3Client = new S3Client({ region: process.env.AWS_REGION });

const {
  models: { User },
} = sequelize;

///////////////////////////
// * PUT | Update User Info
///////////////////////////
const putUpdateUserInfo = async (req, res) => {
  const { username, email, bio } = req.body;
  const { userId } = req.params;

  // Logging the request body for debugging purposes
  console.log(req.body, " <-- req.body");

  // Extracting the uploaded files from req.files safely
  const profileImgFile = req.files?.profileImg?.[0] || null;
  const headerImgFile = req.files?.headerImg?.[0] || null;

  try {
    // Fetch the user by their ID
    const user = await User.findByPk(userId);

    // Return 404 if the user is not found
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id of ${userId}` });
    }

    // Function to handle file upload to S3
    const uploadToS3 = async (file, folder) => {
      const filePath = `${folder}/${uuidv4()}-${file.originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: file.buffer,
      };
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
    };

    // Update profile image if provided
    if (profileImgFile) {
      user.profileImg = await uploadToS3(
        profileImgFile,
        "curate-sphere/profile-imgs"
      );
    }

    // Update header image if provided
    if (headerImgFile) {
      user.headerImg = await uploadToS3(
        headerImgFile,
        "curate-sphere/header-imgs"
      );
    }

    // Update user details if req.body.type exists and is different than prev value
    if (email && email !== user.email) {
      user.email = email;
    }

    if (username && username !== user.username) {
      user.username = username;
    }

    if (bio && bio !== user.bio) {
      user.bio = bio;
    }

    // Save user if any field was updated
    await user.save();

    // Generate a JWT token with the updated user data
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Respond with the generated token and success message
    res
      .status(201)
      .json({ token, message: "Successfully updated user information" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Unable to update user info. Please try again later." });
  }
};

///////////////////////////
// * PUT | Update User Password
///////////////////////////
const putUpdateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: `Cannot find user with id of ${userId}` });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({
        error:
          "Please choose a different password than your current to update your password",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

    if (isPasswordValid && newPassword === confirmPassword) {
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

const putUpdateUserImgsByArtworkUrl = async (req, res) => {
  const { userId } = req.params;
  const { imgType } = req.query;
  const { imgUrl } = req.body;
  console.log(userId, " <-- userId");
  console.log(imgType, " <-- imgType");
  console.log(imgUrl, " <-- imgUrl");
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    if (!imgUrl) {
      return res.status(404).json({ error: "No image url was provided" });
    }
    if (!imgType) {
      return res.status(404).json({ error: "No image type was provided" });
    } else if (imgType === "header") {
      user.headerImg = imgUrl;
    } else {
      user.profileImg = imgUrl;
    }
    await user.save();
    const token = refreshToken(user);
    res
      .status(200)
      .json({ message: `${imgType} image succussfully updated`, token });
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to update ${imgType} image by artwork url. Error: ${err}`
    );
    res
      .status(500)
      .json({ error: `Unable to update ${imgType} image  by artwork url` });
  }
};

module.exports = {
  putUpdateUserInfo,
  putUpdateUserPassword,
  putUpdateUserImgsByArtworkUrl,
};

///////////////////////////
// Functions
///////////////////////////

const refreshToken = (user) => {
  const newToken = jwt.sign({ user }, process.env.JWT_SECRET);
  return newToken;
};
