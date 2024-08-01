const sequelize = require('../config/database')
const {
    models: { Exhibition },
  } = sequelize;


// get all exhibtions
const getAllExhibitions = async (req, res) => {
    try {
        const exhibitions = await Exhibition.findAll();
        res.status(200).json(exhibitions)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// create exhibition
const createExhibition = async (req, res) => {
    try {
        const newExhibition = await Exhibition.create(req.body);
        res.status(201).json(newExhibition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// get exhibition by id 
const getExhibitionById = async (req, res) => {
    try {
        const exhibition = await Exhibition.findByPk(req.params.id)
        res.status(200).json(exhibition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// update exhibition
const updateExhibition = async (req, res) => {
    try {
        const exhibition = await Exhibition.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(exhibition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// delete exhibition 
const deleteExhibition = async (req, res) => {
    try {
        const exhibition = await Exhibition.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(exhibition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllExhibitions,
    createExhibition,
    getExhibitionById,
    updateExhibition,
    deleteExhibition
}