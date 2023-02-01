const express = require('express')
const passport = require('passport')

const upload = require('../middleware/uploadsAvatar')

const controllerUser = require('../controllers/user')

const router = express.Router()

// image 

//router.post('/image/add', upload.single('image'),passport.authenticate('jwt', { session: false }), controllerImage.create)

router.get('/', passport.authenticate('jwt', { session: false }), controllerUser.getActual)
router.patch('/', passport.authenticate('jwt', { session: false }), controllerUser.update)
router.patch('/change-password', passport.authenticate('jwt', { session: false }), controllerUser.updatePassword)
router.get('/user-info', passport.authenticate('jwt', { session: false }), controllerUser.getInfoByActualUser)
router.get('/user-info/:idUser', passport.authenticate('jwt', { session: false }), controllerUser.getInfoByUser)
router.patch('/user-info', passport.authenticate('jwt', { session: false }), controllerUser.updateUserInfo)
router.patch('/user-info/upload-image',upload.single('image'), passport.authenticate('jwt', { session: false }), controllerUser.updateUserImage)

module.exports= router