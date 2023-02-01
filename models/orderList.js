const Sequelize = require('sequelize')


const connectDB = require('../connection/connectionDB')

const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class OrderList extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
			 await OrderList.init(
		  {

			idUser: {
				type: Sequelize.INTEGER,
				allowNull:true
			},
			idOrder: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			total: {
				type: Sequelize.INTEGER,
				allowNull:true,
				defaultValue: 0
			},
			orderStatus: {
				type: Sequelize.BOOLEAN,
				allowNull:true,
				defaultValue: false
			}
		},
		  { sequelize, modelName: 'orderList' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

module.exports.create = async (idUser)=>{
	await OrderList.create({
		idUser
	})
}
module.exports.update = async (idUser,idOrder,orderStatus,total)=>{
	await OrderList.update({
		orderStatus,
		total
	},{
		where:{
			idUser,
			idOrder
		}
	})
}
module.exports.remove = async (idUser,idOrder)=>{
	await OrderList.remove({
		where:{
			idUser,
			idOrder
		}
	})
}
module.exports.findOne = async (idUser,orderStatus)=>{
	const orderList =  await OrderList.findOne({
		where:{
			idUser,
			orderStatus
		}
	})
	return orderList
}
module.exports.findAll = async(idUser)=>{
	return await OrderList.findAll({where:{idUser}})
}
