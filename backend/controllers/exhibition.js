const sequelize = require("../config/database");
const { Op } = require("sequelize");
const BASE_URL = process.env.HARVARD_API_BASE_URL;
const API_KEY = process.env.API_KEY;
const {
  models: { Exhibition, Artwork, ExhibitionArtworks },
} = sequelize;

///////////////////////////
// GET | Get all exhibitions
///////////////////////////
const getAllExhibitions = async (req, res) => {
  const { userId } = req.params;

  try {
    const exhibitions = await Exhibition.findAll({
      where: {
        userId: {
          [Op.ne]: userId,
        },
      },
    });
    // Check if we found any exhibitions
    if (exhibitions.length === 0) {
      return res.status(400).json({ error: "No exhibitions were found" });
    }
    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// GET | Get user exhibitions
///////////////////////////
const getUserExhibitions = async (req, res) => {
  const { userId } = req.params;
  try {
    const exhibitions = await Exhibition.findAll({
      where: {
        userId,
      },
    });
    // Check if we found any exhibitions
    if (exhibitions.length === 0) {
      return res
        .status(400)
        .json({ error: "No exhibitions were found for this user" });
    }

    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// ? POST | Create exhibition
///////////////////////////
const createExhibition = async (req, res) => {
  try {
    const newExhibition = await Exhibition.create(req.body);
    res.status(201).json(newExhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// GET | Get exhibition by ID
///////////////////////////
const getExhibitionById = async (req, res) => {
  const { id } = req.params;
  try {
    const exhibition = await Exhibition.findByPk(id);
    res.status(200).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// * PUT | Update exhibition
///////////////////////////
const updateExhibition = async (req, res) => {
  const { id } = req.params;
  try {
    const exhibition = await Exhibition.update(req.body, {
      where: {
        id,
      },
    });
    res.status(200).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// ! DELETE | Delete exhibition
///////////////////////////
const deleteExhibition = async (req, res) => {
  const { id } = req.params;
  try {
    const exhibition = await Exhibition.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////
// ? POST | Add artwork to exhibition
///////////////////////////
const postAddArtwork = async (req, res) => {
  const { exbId, objectid } = req.body;
  try {
    const exb = await Exhibition.findByPk(exbId);
    const [artwork, created] = await Artwork.findOrCreate({
      where: {
        objectid,
      },
      defaults: {
        objectid,
      },
    });
    const duplicate = await ExhibitionArtworks.findOne({
      where: {
        ExhibitionId: exbId,
        ArtworkObjectid: objectid,
      },
    });

    if (!duplicate) {
      const newExbAddition = await exb.addArtwork(artwork);
      return res.status(200).json({ newExbAddition, message: "success" });
    } else {
      return res
        .status(400)
        .json({ message: "Artwork is already in this exhibition" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add artwork to exhibition" });
  }
};

///////////////////////////
// ! DELETE | Remove artwork from exhibition
///////////////////////////
const deleteArtworkFromExb = async (req, res) => {
  const { exbId, objectid } = req.body;

  try {
    const artwork = await ExhibitionArtworks.destroy({
      where: {
        ExhibitionId: exbId,
        ArtworkObjectid: objectid,
      },
    });
    res.status(200).json({ message: "removed artwork from exhibition" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to remove artwork from exhibition" });
  }
};

///////////////////////////
// GET | Get artworks in exhibition
///////////////////////////
const getExbArtworks = async (req, res) => {
  const { ExhibitionId } = req.params;
  try {
    const userExbArtworks = await ExhibitionArtworks.findAll({
      where: {
        ExhibitionId,
      },
    });
    if (userExbArtworks.length === 0) {
      return res
        .status(400)
        .json({ error: "No artworks were found in this exb" });
    }
    return res.status(200).json(userExbArtworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

///////////////////////////
// GET | Get exhibition cover image
///////////////////////////
const getExbCoverImg = async (req, res) => {
  const { id } = req.params;

  try {
    const exb = await ExhibitionArtworks.findOne({
      where: { ExhibitionId: id },
    });
    if (exb) {
      const response = await fetch(
        `${BASE_URL}/object/${exb.ArtworkObjectid}?apikey=${API_KEY}`
      );
      const data = await response.json();

      res.status(200).json(data.primaryimageurl);
    } else
      return res
        .status(404)
        .json({ error: `no exhibition was found with the id of ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllExhibitions,
  createExhibition,
  getExhibitionById,
  updateExhibition,
  deleteExhibition,
  getUserExhibitions,
  postAddArtwork,
  getExbArtworks,
  deleteArtworkFromExb,
  getExbCoverImg,
};
