const express = require('express')
const passport = require('passport')

const controllerCategories = require('../controllers/categories')




const router = express.Router()

//Categories 

router.get('/', passport.authenticate('jwt', { session: false }), controllerCategories.getAll)
router.get('/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.getById)
router.delete('/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.remove)
router.post('/add',passport.authenticate('jwt', { session: false }), controllerCategories.create)
router.patch('/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.update)
router.get('/category/score',passport.authenticate('jwt', { session: false }), controllerCategories.score)

router.get('/all-position/:idCategory', passport.authenticate('jwt', { session: false }), controllerCategories.getAllPositionByCategory)
//=========================================================================================================================================================================================================================================



module.exports= router