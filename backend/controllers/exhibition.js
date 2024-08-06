const sequelize = require("../config/database");
const {
  models: { Exhibition },
} = sequelize;

// get all exhibtions
const getAllExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.findAll();
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

module.exports = {
  getAllExhibitions,
  createExhibition,
  getExhibitionById,
  updateExhibition,
  deleteExhibition,
  getUserExhibitions,
};
