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
class Order extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
			 await Order.init(
		  {

			idOrder: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			idPosition: {
				type: Sequelize.INTEGER,
				allowNull:true
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull:true
			},
			coastPerOne: {
				type: Sequelize.FLOAT,
				allowNull:true
			},
			totalCoast: {
				type: Sequelize.FLOAT,
				allowNull:false
			},
			company: {
				type: Sequelize.STRING,
				allowNull:true
			}
		},
		  { sequelize, modelName: 'order' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

 module.exports.create = async (idOrder,idPosition,amount,coastPerOne,totalCoast,company)=>{
	await Order.create(
		{
			idOrder,
			idPosition,
			amount,
			coastPerOne,
			totalCoast,
			company
		}
	)
}

 module.exports.update = async (idOrder,idPosition,amount,coastPerOne,totalCoast,company)=>{
	await Order.update(
		{		
			amount,
			coastPerOne,
			totalCoast,
			company
		},
		{
			where:{
			idOrder,
			idPosition
			}
		}
	)
}
 module.exports.delete = async (idOrder,idPosition)=>{
	await Order.remove(
		{
			where:{
			idOrder,
			idPosition
			}
		}
	)
}
 module.exports.findOne = async (idOrder,idPosition)=>{
	const order =  await Order.findOne(
		{
			where:{
			idOrder,
			idPosition
			}
		}
	)
	return order
}
 module.exports.findAllByOrder = async (idOrder)=>{
		const orders =  await Order.findAll(
		{
			where:{
			idOrder
			}
		}
	)
	return orders
}

