const express = require("express");
const router = express.Router();
const artworkCtrl = require("../controllers/artwork");

//////////////////////
// GET | Get all artworks
//////////////////////
router.get("/search", artworkCtrl.getArtworks);

//////////////////////
// ? POST | Get next page of artworks
//////////////////////
router.post("/next", artworkCtrl.postNextPageOfArtworks);

//////////////////////
// GET | Get artworks by search
//////////////////////
router.get("/text-search", artworkCtrl.getArtworkBySearch);

//////////////////////
// GET | Get filter objects for filtering data
//////////////////////
router.get("/filter", artworkCtrl.getFilterObjs);

//////////////////////
// GET | Get single artwork by object ID
//////////////////////
router.get("/:objectid", artworkCtrl.getArtworkDetail);

module.exports = router;
