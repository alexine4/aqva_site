const express = require('express')
const passport = require('passport')

const controllerCategories = require('../controllers/categories')
const controllerTypes = require('../controllers/type')
const controllerGenus = require('../controllers/genus')
const controllerPosition = require('../controllers/position')



const router = express.Router()

//Categories 

router.get('/categories', passport.authenticate('jwt', { session: false }), controllerCategories.getAll)
router.get('/categories/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.getById)
router.delete('/categories/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.remove)
router.post('/categories/add',passport.authenticate('jwt', { session: false }), controllerCategories.create)
router.patch('/categories/:idCategories',passport.authenticate('jwt', { session: false }), controllerCategories.update)
router.get('/category/score',passport.authenticate('jwt', { session: false }), controllerCategories.score)
//=========================================================================================================================================================================================================================================

//Types

router.post('/types/add',passport.authenticate('jwt', { session: false }), controllerTypes.create)
router.delete('/types/:idType',passport.authenticate('jwt', { session: false }), controllerTypes.remove)
router.patch('/types/:idType',passport.authenticate('jwt', { session: false }), controllerTypes.update)
router.get('/types', passport.authenticate('jwt', { session: false }), controllerTypes.getAll)
router.get('/types/all/:idCategory', passport.authenticate('jwt', { session: false }), controllerTypes.getAllByCategory)
router.get('/types/:idType',passport.authenticate('jwt', { session: false }), controllerTypes.getById)
router.get('/type/:idCategory',passport.authenticate('jwt', { session: false }), controllerTypes.score)

//=========================================================================================================================================================================================================================================

//Genus

router.post('/genus/add',passport.authenticate('jwt', { session: false }), controllerGenus.create)
router.delete('/genus/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.remove)
router.patch('/genus/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.update)
router.get('/genus', passport.authenticate('jwt', { session: false }), controllerGenus.getAll)
router.get('/genus/all/:idType', passport.authenticate('jwt', { session: false }), controllerGenus.getAllByType)
router.get('/genus/:idGenus',passport.authenticate('jwt', { session: false }), controllerGenus.getById)
router.get('/genu/:idType',passport.authenticate('jwt', { session: false }), controllerGenus.score)

//=========================================================================================================================================================================================================================================

//Position

router.post('/position/add',passport.authenticate('jwt', { session: false }), controllerPosition.create)
router.delete('/position/:idPosition',passport.authenticate('jwt', { session: false }), controllerPosition.remove)
router.patch('/position/:idPosition',passport.authenticate('jwt', { session: false }), controllerPosition.update)
router.get('/position', passport.authenticate('jwt', { session: false }), controllerPosition.getAll)
router.get('/position/all/:idGenus', passport.authenticate('jwt', { session: false }), controllerPosition.getAllByGenus)
router.get('/position/:idPosition',passport.authenticate('jwt', { session: false }), controllerPosition.getById)
router.get('/positions/:idGenus',passport.authenticate('jwt', { session: false }), controllerPosition.score)

//=========================================================================================================================================================================================================================================


module.exports= router