
const passport = require('passport')
const express = require('express')
const upload = require('../middleware/upload')


const controllerImage = require('../controllers/images')

const router = express.Router()

//Image download
router.post('/image/add', upload.single('image'),passport.authenticate('jwt', { session: false }), controllerImage.create)
router.patch('/image/update/:idImage', upload.single('image'),passport.authenticate('jwt', { session: false }), controllerImage.update)
router.delete('/image/delete/:idImage',passport.authenticate('jwt', { session: false }), controllerImage.delete)
router.get('/images/:idPosition', passport.authenticate('jwt', { session: false }), controllerImage.getAllByPosition)
router.get('/image/:idImage', passport.authenticate('jwt', { session: false }), controllerImage.getById)

//=========================================================================================================================================================================================================================================

module.exports= router