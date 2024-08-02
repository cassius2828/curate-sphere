const express = require("express");
const router = express.Router();
const artworkCtrl = require("../controllers/artwork");

// get all artworks
router.get("/", artworkCtrl.getArtworks);

// get single artwork
router.get("/:objectid", artworkCtrl.getArtworkDetail);

module.exports = router;
