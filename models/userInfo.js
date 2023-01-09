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
class UserInfo extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await UserInfo.init(
		  {
			idUserInfo: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			 },
			idUser: {
				type: Sequelize.INTEGER,
				allowNull: false		
				},
				imageSRC:{
					type:Sequelize.STRING,
					allowNull:true
				},
				country:{
					type:Sequelize.STRING,
					allowNull:true
				},
				address:{
					type: Sequelize.STRING,
					allowNull:true
				},
				city:{
					type: Sequelize.STRING,
					allowNull:true
				},
				phone:{
					type: Sequelize.STRING,
					allowNull:true
				}
				
		
			
		  },
		  { sequelize, modelName: 'userInfo' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

module.exports.create = async (idUser,imageSRC,country,address,city,phone)=>{
	await UserInfo.create(
		{
			idUser,
			imageSRC,
			country,
			address,
			city,
			phone
		}
	)
	
}
module.exports.update = async (idUser,country,address,city,phone)=>{
	await UserInfo.update(
		{
			
			country,
			address,
			city,
			phone
		},{
			where:{
				idUser
			}
		}
	)
	
}
module.exports.updateImage = async (idUser,imageSRC)=>{
	await UserInfo.update(
		{
			imageSRC		
		},{
			where:{
				idUser
			}
		}
	)
	
}


module.exports.findByIds = async function (idUser){
	const userInfo = await UserInfo.findOne({
		where: {
			 idUser
			}
		 })	
		 return userInfo
				
	
}