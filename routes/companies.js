const express = require('express')
const passport = require('passport')

const controllerCompanies = require('../controllers/companies')




const router = express.Router()

//Categories 

router.get('/all-companies', passport.authenticate('jwt', { session: false }), controllerCompanies.getAll)
router.get('/company/:name', passport.authenticate('jwt', { session: false }), controllerCompanies.getByName)
router.get('/all-companies/:idCompany', passport.authenticate('jwt', { session: false }), controllerCompanies.getById)
router.patch('/all-companies/:idCompany', passport.authenticate('jwt', { session: false }), controllerCompanies.update)
router.delete('/all-companies/:idCompany', passport.authenticate('jwt', { session: false }), controllerCompanies.delete)

module.exports= router