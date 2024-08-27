const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles");
const multer = require("multer");
const upload = multer();

router.put(
  "/update-info/:userId",
  upload.fields([
    { name: "headerImg", maxCount: 1 },
    { name: "profileImg", maxCount: 1 },
  ]),
  profileCtrl.putUpdateUserInfo
);
router.put("/update-password/:userId", profileCtrl.putUpdateUserPassword);
router.put('/update-imgs/:userId', profileCtrl.putUpdateUserImgsByArtworkUrl)
router.put('/confirm-email', profileCtrl.putConfirmEmailChange)
module.exports = router;
