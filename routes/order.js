const express = require('express')
const passport = require('passport')



const controllerOrder = require('../controllers/order')

const router = express.Router()

router.post('/add-to-order', passport.authenticate('jwt', { session: false }), controllerOrder.addToActualOrder)
router.patch('/update-order', passport.authenticate('jwt', { session: false }), controllerOrder.updateOrder)
router.patch('/update-order-list', passport.authenticate('jwt', { session: false }), controllerOrder.updateOrderList)
router.get('/order-list', passport.authenticate('jwt', { session: false }), controllerOrder.getAll)
router.get('/actual-order', passport.authenticate('jwt', { session: false }), controllerOrder.getActual)
router.get('/all-orders/:idOrder', passport.authenticate('jwt', { session: false }), controllerOrder.getAllByOrder)


module.exports= router