const Sequelize = require('sequelize')
const Genus = require('./genus')
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
class Type extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Type.init(
		  {
			idType: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			 },

			name: {
				type: Sequelize.STRING,
				allowNull: false		
				},

			idCategory:{
					type:Sequelize.STRING,
					allowNull:false
				}			
		  },
		  { sequelize, modelName: 'type' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

	module.exports.create = async(name,idCategory)=>{
		await Type.create(
			{
				name,
				idCategory
			}
		)
		
	}

	
	module.exports.remove = async(idType)=>{
		await Type.destroy({
			where:{
				idType
			}
		})
	}

	module.exports.update= async(idType,name,idCategory)=>{
		
		if(idType&&name&&!idCategory){
			
			await Type.update({
				name
			},
			{
				where:{
					idType
				}
				
			})
		}else if(idType&&idCategory&&!name){
			
			await Type.update({
				idCategory
			},
			{
				where:{
					idType
				}
				
			})
		}else if(idType&&name&&idCategory)
		{
			await Type.update({
				
				name,
				idCategory
			},
			{
				where:{
					idType
				}
				
			})
		}
		
	}

module.exports.findOne = async(columnName,colomnValue)=>{
	if(columnName==='name'){
		const type =  await Type.findOne({where:{
			name: colomnValue
		}
		})
		if(type){
			return type.dataValues
		}else{
			return false
		}
	} else if(columnName==='idType'){
		const type =  await Type.findOne({where:{
			idType: colomnValue
		}
		})
		if(type){
			return type.dataValues
		}else{
			return false
		}
	}else{
		return false
	}

}

module.exports.getAll = async()=>{

	const types =  await Type.findAll() 

	if (types[0]) {
		return types
	}else{
		return false
	}
}


module.exports.count = async(idCategory)=>{
	let Length = 0
	const type = await Type.findAll({where:{idCategory}})
	
	for (let index = 0; index < type.length; index++) {
		
		const genus = await Genus.findAllByType(type[index].dataValues.idType)
					for (let i= 0; i < genus.length; i++) {
					
					const position = 	await Position.findAllByGenus(genus[i].dataValues.idGenus)
				
					Length = Length + position.length
				}
		}
return Length
}

module.exports.getAllByCategory = async(idCategory)=>{

	const types =  await Type.findAll({where:{idCategory}}) 

	if (types[0]) {
		return types
	}else{
		return false
	}
}


