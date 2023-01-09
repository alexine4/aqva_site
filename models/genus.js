const Sequelize = require('sequelize')
const Position = require('./position')
const connectDB = require('../connection/connectionDB')

const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class Genus extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Genus.init(
		  {
			 idGenus: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
		
				
			 },
			name: {
				type: Sequelize.STRING,
				allowNull: false		
				},
				idType:{
					type:Sequelize.INTEGER,
					allowNull:false
				}	
			
		  },
		  { sequelize, modelName: 'genusies' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = async(name,idType)=>{
		await Genus.create(
			{
				name,
				idType
			}
		)
		
	}

	module.exports.remove = async(idGenus)=>{
		await Genus.destroy({
			where:{
				idGenus
			}
		})
	}

	module.exports.update= async(idGenus,name,idType)=>{
		
		if(idGenus&&name&&!idType){
			
			await Genus.update({
				name
			},
			{
				where:{
					idGenus
				}
				
			})
		}else if(idGenus&&idType&&!name){
			
			await Genus.update({
				idType
			},
			{
				where:{
					idGenus
				}
				
			})
		}else if(idGenus&&name&&idType)
		{
			await Genus.update({
				
				name,
				idType
			},
			{
				where:{
					idGenus
				}
				
			})
		}
		
	}

module.exports.findOne = async(columnName,colomnValue)=>{
	if(columnName==='name'){
		const genus =  await Genus.findOne({where:{
			name: colomnValue
		}
		})
		if(genus){
			return genus.dataValues
		}else{
			return false
		}
	} else if(columnName==='idGenus'){
		const genus =  await Genus.findOne({where:{
			idGenus: colomnValue
		}
		})
		if(genus){
			return genus.dataValues
		}else{
			return false
		}
	}else{
		return false
	}

}

module.exports.getAll = async()=>{

	const genus =  await Genus.findAll() 

	if (genus[0]) {
		return genus
	}else{
		return false
	}
}


module.exports.findAllByType= async (idType)=>{
	
const genus = await Genus.findAll({where:{idType}})

return genus
}


module.exports.count = async(idType)=>{
	let Length = 0
		const genus = await Genus.findAll({where:{idType}})
					for (let i= 0; i < genus.length; i++) {
					
					const position = 	await Position.findAllByGenus(genus[i].dataValues.idGenus)
				
					Length = Length + position.length
		}
return Length
}

module.exports.getAllByType = async(idType)=>{

	const genus =  await Genus.findAll({where:{idType}}) 

	if (genus[0]) {
		return genus
	}else{
		return false
	}
}

module.exports.getAllPositionByType = async(idType)=>{
	let positionArray = []
	const genus = await Genus.findAll({where:{idType}})
				for (let i= 0; i < genus.length; i++) {
				
					const position = 	await Position.findAllByGenus(genus[i].dataValues.idGenus)
			
					positionArray = positionArray.concat(position)
				}


	if (positionArray[0]) {
		return positionArray
	}else{
		return false
	}
}
