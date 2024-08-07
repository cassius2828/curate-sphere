const express = require("express");
const router = express.Router();
const exhibitionCtrl = require("../controllers/exhibition");

//////////////////////
// GET | Get all exhibitions for a specific user
//////////////////////
router.get("/explore/:userId", exhibitionCtrl.getAllExhibitions);

//////////////////////
// ? POST | Create a new exhibition
//////////////////////
router.post("/", exhibitionCtrl.createExhibition);

//////////////////////
// ? POST | Add artwork to an exhibition (through table)
//////////////////////
router.post("/:exbId/add-artwork/:objectid", exhibitionCtrl.postAddArtwork);

//////////////////////
// GET | View artworks in an exhibition
//////////////////////
router.get("/view-artworks/:ExhibitionId", exhibitionCtrl.getExbArtworks);

//////////////////////
// GET | Get user exhibitions by user ID
//////////////////////
router.get("/dashboard/:userId", exhibitionCtrl.getUserExhibitions);

//////////////////////
// GET | Get cover image for an exhibition by ID
//////////////////////
router.get("/:id/cover-img", exhibitionCtrl.getExbCoverImg);

//////////////////////
// GET | Get an exhibition by ID
//////////////////////
router.get("/:id", exhibitionCtrl.getExhibitionById);

//////////////////////
// * PUT | Update an exhibition by ID
//////////////////////
router.put("/:id", exhibitionCtrl.updateExhibition);

//////////////////////
// ! DELETE | Delete an exhibition by ID
//////////////////////
router.delete("/:id", exhibitionCtrl.deleteExhibition);

//////////////////////
// ! DELETE | Remove artwork from an exhibition
//////////////////////
router.delete(
  "/:exbId/remove-artwork/:objectid",
  exhibitionCtrl.deleteArtworkFromExb
);

module.exports = router;
