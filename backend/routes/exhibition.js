const express = require('express')
const router = express.Router()
const exhibitionCtrl = require('../controllers/exhibition')


// get all exhibtions
router.get('/', exhibitionCtrl.getAllExhibitions);
// create exhibition
router.post('/', exhibitionCtrl.createExhibition);
// update exhibition
router.put('/:id', exhibitionCtrl.updateExhibition);
// delete exhibition
router.delete('/:id', exhibitionCtrl.deleteExhibition);

module.exports = router