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
class User extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await User.init(
		  {
			 idUser: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
		
				
			 },
			username: {
				type: Sequelize.STRING,
				allowNull: false		
				},
				email:{
					type:Sequelize.STRING,
					allowNull:false
				},
				password:{
					type:Sequelize.STRING,
					allowNull:false
				},
				emailVerification:{
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull:false
				},
				superUserStatus:{
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull:false
				}
				
		
			
		  },
		  { sequelize, modelName: 'user' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

module.exports.create = async (username,email,password)=>{
	await User.create(
		{
			username: username,
			email: email,
			password: password
		}
	)
	
}




module.exports.findOne = async function (colomnName , colomnValue){
	if (colomnName === 'username'){
		const users = await User.findOne({
			where: {
				username: colomnValue
			}
		 })		
		 if (users == null){
			return true
			}
			return users
		
	}
	else if(colomnName === 'email' ){
		const users = await User.findOne({
			where: {
				email: colomnValue
				}
			 })	
			 if (users == null){
				return true
				}
				return users		
	}	else{
		console.log('Incorrect colomn name');
	}
	
}

module.exports.findByIds = async function (idUser){
	const users = await User.findOne({
		where: {
			 idUser
			}
		 })	
		 return users
				
	
}


module.exports.update = async (idUser,username,email)=>{
	await User.update(
		{
			username: username,
			email: email
		},

		{where:
			{
				idUser
			}
			}
	)
	
}
module.exports.updatePassword = async (idUser,password)=>{
		await User.update(
		{
			password
		},

		{where:
			{
				idUser
			}
			}
	)
	
}