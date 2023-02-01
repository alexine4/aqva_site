const Order = require('../models/order')
const OrderList = require('../models/orderList')

const errorHandler = require('../utils/errorHandler')

module.exports.addToActualOrder = async(req,res)=>{
try {
	await OrderList.findOne(req.user.idUser,false).then(
		orderList=>{
			if (orderList === null) {
				OrderList.create(req.user.idUser).then(
					()=>{
						OrderList.findOne(req.user.idUser,false).then(
							actualOrderList=>{
								if (actualOrderList) {
									Order.create(actualOrderList.dataValues.idOrder, req.body.idPosition, req.body.amount,req.body.coastPerOne,req.body.totalCoast,req.body.company).then(
										()=> res.status(200).json(true)
									)
								}
							}
						)
					}
				)
			
			} else{
					Order.findOne(orderList.dataValues.idOrder, req.body.idPosition).then(
						orderExist =>{
							if (orderExist) {
								Order.update(orderList.dataValues.idOrder, req.body.idPosition, req.body.amount,req.body.coastPerOne,req.body.totalCoast,req.body.company).then(
									()=> res.status(200).json(true)	
									)
							}else{
									Order.create(orderList.dataValues.idOrder, req.body.idPosition, req.body.amount,req.body.coastPerOne,req.body.totalCoast,req.body.company).then(
									()=> res.status(200).json(true)	
									)
							}
						}
					)
				}
		}
	)

} catch (error) {
	errorHandler(res,error)
}
	
}

module.exports.updateOrder = async(req,res)=>{
try {
	const array = req.body
	for (let index = 0; index < array.length; index++) {
		if (index === array.length) {
			await Order.update(req.body[index].idOrder,req.body[index].idPosition,req.body[index].amount,req.body[index].coastPerOne,req.body[index].totalCoast,req.body[index].company).then(
				()=>{
					res.status(200).json(true)
				}
			)
		}else{
			await Order.update(req.body[index].idOrder,req.body[index].idPosition,req.body[index].amount,req.body[index].coastPerOne,req.body[index].totalCoast,req.body[index].company)
		}
	} 
	
} catch (error) {
	errorHandler(res,error)
}

}
module.exports.getAll = async(req,res)=>{
	try {
		await OrderList.findAll(req.user.idUser).then(
			orders=>{
				res.status(200).json(orders)
			}
		)
	} catch (error) {
		errorHandler(res,error)
	}

}
module.exports.getAllByOrder = async(req,res)=>{
	try {
		await Order.findAllByOrder(req.params.idOrder).then(
			orders=>{
				res.status(200).json(orders)
			}
		)
	} catch (error) {
		errorHandler(res,error)
	}

}

module.exports.updateOrderList = async(req,res)=>{
try {
	await OrderList.update(req.user.idUser, req.body.idOrder,req.body.orderStatus,req.body.total).then(
		()=>{
			res.status(200).json(true)
		}
	)
	
} catch (error) {
	errorHandler(res,error)
}
}