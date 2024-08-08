const express = require("express");
const router = express.Router();
const artworkCtrl = require("../controllers/artwork");

//////////////////////
// ? POST | Get all artworks
//////////////////////
router.post("/search", artworkCtrl.postArtworks);

//////////////////////
// GET | Get artworks by search
//////////////////////
router.get("/search", artworkCtrl.getArtworkBySearch);

//////////////////////
// GET | Get filter objects for filtering data
//////////////////////
router.get("/filter", artworkCtrl.getFilterObjs);

//////////////////////
// GET | Get single artwork by object ID
//////////////////////
router.get("/:objectid", artworkCtrl.getArtworkDetail);

module.exports = router;
