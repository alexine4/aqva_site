const express = require('express')
const passport = require('passport')


const controllerGenus = require('../controllers/genus')




const router = express.Router()


//Genus

router.post('/add',passport.authenticate('jwt', { session: false }), controllerGenus.create)
router.delete('/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.remove)
router.patch('/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.update)
router.get('/', passport.authenticate('jwt', { session: false }), controllerGenus.getAll)
router.get('/all/:idType', passport.authenticate('jwt', { session: false }), controllerGenus.getAllByType)

router.get('/all-position/:idType', passport.authenticate('jwt', { session: false }), controllerGenus.getAllPositionByType)

router.get('/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.getById)
router.get('/genu/:idType',passport.authenticate('jwt', { session: false }), controllerGenus.score)

//=========================================================================================================================================================================================================================================


module.exports= router