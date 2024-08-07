const sequelize = require("../config/database");
const { Op } = require("sequelize");

const {
  models: { Exhibition, Artwork, ExhibitionArtworks },
} = sequelize;

// get all exhibtions
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
    // check if we found any exhibitions
    if (exhibitions.length === 0) {
      return res.status(400).json({ error: "No exhibitions were found" });
    }
    res.status(200).json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get user exhibtions
const getUserExhibitions = async (req, res) => {
  const { userId } = req.params;
  try {
    const exhibitions = await Exhibition.findAll({
      where: {
        userId,
      },
    });
    console.log(exhibitions);
    // check if we found any exhibitions
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
// create exhibition
const createExhibition = async (req, res) => {
  try {
    const newExhibition = await Exhibition.create(req.body);
    res.status(201).json(newExhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get exhibition by id
const getExhibitionById = async (req, res) => {
  const { id } = req.params;
  console.log(id, " <-- exb id");
  try {
    const exhibition = await Exhibition.findByPk(id);
    res.status(200).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update exhibition
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

// delete exhibition
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

const postAddArtwork = async (req, res) => {
  const { exbId, objectid } = req.params;

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
      return res.status(200).json(newExbAddition);
    } else {
      return res
        .status(400)
        .json({ message: "Artwork is already in this exhibition" });
    }

    // console.log(exb)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add artwork to exhibition" });
  }
};

const getExbArtworks = async (req,res) => {
  const {ExhibitionId} = req.params;
  try {
    const userExbArtworks = await ExhibitionArtworks.findAll({
      where: {
        ExhibitionId
      }
    })
    if(userExbArtworks.length === 0){
      return res.status(400).json({error: 'No artworks were found in this exb'})
    }
    return res.status(200).json(userExbArtworks)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllExhibitions,
  createExhibition,
  getExhibitionById,
  updateExhibition,
  deleteExhibition,
  getUserExhibitions,
  postAddArtwork,getExbArtworks
};
