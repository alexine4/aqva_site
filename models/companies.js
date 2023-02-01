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
class Company extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Company.init(
		  {
			 idCompany: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false		
				},
			description:{
				type: Sequelize.STRING,
				allowNull:true
			},
			pickUpAddress:{
				type: Sequelize.STRING,
				allowNull:false
			},
			phone:{
				type: Sequelize.STRING,
				allowNull:true
			},
			email:{
				type: Sequelize.STRING,
				allowNull:true
			}
				
		  },
		  { sequelize, modelName: 'company' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = async(name,description,pickUpAddress,phone,email)=>{
	await Company.create({
		name,
		description,
		pickUpAddress,
		phone,
		email
	})
	}

	module.exports.update = async(idCompany,name,description,pickUpAddress,phone,email)=>{
	await Company.update(
		{
			name,
			description,
			pickUpAddress,
			phone,
			email
		},
		{
			where:{
				idCompany
			}
		}
	)
	}

	module.exports.findOneByID = async(idCompany)=>{
	return await Company.findOne({where:{idCompany}})
	}
	module.exports.findOneByName = async(name)=>{
	return await Company.findOne({where:{name}})
	}

	module.exports.findAll = async()=>{
	return await Company.findAll()
	}
	
	
	
	module.exports.remove = async(idCompany)=>{
	await Company.destroy({where:{idCompany}})
	}