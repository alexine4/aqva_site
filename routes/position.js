const express = require('express')
const passport = require('passport')


const controllerPosition = require('../controllers/position')



const router = express.Router()

//Position

router.post('/add',passport.authenticate('jwt', { session: false }), controllerPosition.create)
router.delete('/:idPosition',passport.authenticate('jwt', { session: false }), controllerPosition.remove)
router.patch('/:idPosition',passport.authenticate('jwt', { session: false }), controllerPosition.update)
router.get('/', passport.authenticate('jwt', { session: false }), controllerPosition.getAll)

router.get('/sort', passport.authenticate('jwt', { session: false }), controllerPosition.getAllSort)

router.get('/search', passport.authenticate('jwt', { session: false }), controllerPosition.getAllBySearch)

//=========================================================================================================================================================================================================================================


module.exports= router