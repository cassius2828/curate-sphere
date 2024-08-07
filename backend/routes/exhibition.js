const express = require("express");
const router = express.Router();
const exhibitionCtrl = require("../controllers/exhibition");

// get all exhibtions
router.get("/explore/:userId", exhibitionCtrl.getAllExhibitions);
// create exhibition
router.post("/", exhibitionCtrl.createExhibition);
// add artwork (through table)
router.post("/:exbId/add-artwork/:objectid", exhibitionCtrl.postAddArtwork);

router.get("/view-artworks/:ExhibitionId", exhibitionCtrl.getExbArtworks);

// get user exhibitions by userId
router.get("/dashboard/:userId", exhibitionCtrl.getUserExhibitions);
// get exb by id
router.get("/:id", exhibitionCtrl.getExhibitionById);
// update exhibition
router.put("/:id", exhibitionCtrl.updateExhibition);
// delete exhibition
router.delete("/:id", exhibitionCtrl.deleteExhibition);

module.exports = router;
