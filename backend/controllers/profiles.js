const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
  let confirmEmailMessage = "";
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
      // function to send email to user to confirm their email change
      confirmEmailMessage = await confirmEmail(email, user);
      // user.email = email;
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
    res.status(201).json({
      token,
      message: "Successfully updated user information",
      confirmEmailMessage,
    });
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
//////////////////////////////////////////////////////
// * PUT | Update User Imgs By Artwork Url
//////////////////////////////////////////////////////
const putUpdateUserImgsByArtworkUrl = async (req, res) => {
  const { userId } = req.params;
  const { imgType } = req.query;
  const { imgUrl } = req.body;
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
///////////////////////////
// * PUT | Confirm Email Change
///////////////////////////
const putConfirmEmailChange = async (req, res) => {
  const { userId, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    const prevEmail = user.email;
    if (!user) {
      return res.status(404).json({ error: "Cannot find user" });
    }
    if (!email) {
      return res.status(400).json({ error: "No email was sent along" });
    }
    if (email && email !== user.email) {
      user.email = email;
    }
    await user.save();
    // Generate a JWT token with the updated user data
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      message: `Successfully confirmed email change from ${prevEmail} to ${email}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to confirm email change" });
  }
};

module.exports = {
  putUpdateUserInfo,
  putUpdateUserPassword,
  putUpdateUserImgsByArtworkUrl,
  putConfirmEmailChange,
};

///////////////////////////
// Functions
///////////////////////////

const refreshToken = (user) => {
  const newToken = jwt.sign({ user }, process.env.JWT_SECRET);
  return newToken;
};

// Configure your email transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Ensure this is the correct host for Gmail
  port: 465, // Use port 465 for SSL/TLS
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});
// confirmEmail function to send the confirmation email
const confirmEmail = async (email, user) => {
  try {
    // Generate a JWT token with the updated user data
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    const confirmLink =
      process.env.NODE_ENV === "production"
        ? `https://${
            process.env.NETLIFY_URL
          }/confirm-email?token=${token}&userId=${
            user.id
          }&email=${encodeURIComponent(email)}`
        : `http://localhost:5173/confirm-email?token=${token}&userId=${
            user.id
          }&email=${encodeURIComponent(email)}`;

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email, // Recipient address
      subject: "Email Confirmation",
      html: `
        <h1>Curate Sphere -- Confirm Your Email</h1>
        <p>Please click the link below to confirm your email address. This will redirect you to a page where you can confirm and update your email in the applilcation:</p>
        <a href="${confirmLink}">Confirm Email</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
    return {
      message: `Confirmation email sent to ${email}. Your email will remain as ${user.email} until you confirm this change.`,
    };
  } catch (err) {
    console.error(err);
    console.log(
      `Could not send email to ${email} to confirm their email address`
    );
    return { error: `Email could not be sent to ${email} to confirm email` };
  }
};
