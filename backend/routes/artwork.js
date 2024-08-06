const express = require("express");
const router = express.Router();
const artworkCtrl = require("../controllers/artwork");

// get all artworks
router.post("/search", artworkCtrl.postArtworks);

// get filter objs | allows access to id for filtering data
router.get("/filter", artworkCtrl.getFilterObjs);

// get single artwork
router.get("/:objectid", artworkCtrl.getArtworkDetail);

module.exports = router;
