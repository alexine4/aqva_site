const e = require('cors')
const { where } = require('sequelize')
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
class Image extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
	await Image.init(
	 {
		idPosition: {
		  type: Sequelize.INTEGER,
		  allowNull: false
		  },
	  idImage: {
		  type: Sequelize.INTEGER,
		    primaryKey: true,
		  autoIncrement:true	
		  },
		imageSRC:{
			  type:Sequelize.STRING,
			  allowNull:false
		  },
		color:{
			  type:Sequelize.STRING,
			  allowNull:true
		  },
		  idUser:{
			type:Sequelize.INTEGER,
			allowNull:false
		  }
	 },
	 { sequelize, modelName: 'image' }
  )
  
  sequelize.sync({alter:true})
  return true
}


module.exports.create = async (idPosition,imageSRC,color,idUser)=>{
	await Image.create(
		{
			idPosition,
			imageSRC,
			color,
			idUser
		}
	)
	
}
module.exports.update = async (idImage,imageSRC,color,idUser)=>{
	
		await Image.update(
			{			
				imageSRC,
				color,
				idUser
				},{
				where:{
					idImage
				}
			}
			
		)	
}


module.exports.delete = async (idImage)=>{
	await Image.destroy({
		where:
		{
			idImage
		}
	})
}

module.exports.getAllByPosition = async (idPosition)=>{
	const images = await Image.findAll({
		where:
		{
			idPosition
		}
	})

	if (images[0] ===null ) {
		return false
	}else{
		return images
	}

}
module.exports.getOneByPosition = async (idPosition)=>{
	return await Image.findOne({
		where:
		{
			idPosition
		}
	})


}

module.exports.getById = async (idImage)=>{
	const image = await Image.findOne({
		where:
		{
			idImage
		}
	})

	if (image ===null ) {
		return false
	}else{
		return image
	}
}

