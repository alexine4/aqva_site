const Sequelize = require('sequelize')
const Position = require('./position')
const Genus = require('./genus')
const Type = require('./type')

const connectDB = require('../connection/connectionDB')

const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class Categories extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Categories.init(
		  {
			 idCategories: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
		
				
			 },
			name: {
				type: Sequelize.STRING,
				allowNull: false		
				},
			},
		  { sequelize, modelName: 'categories' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

 module.exports.create = async (name)=>{
	await Categories.create(
		{
			name
		}
	)
	
}

module.exports.remove = async(idCategories)=>{
	await Categories.destroy({
		where:{
			idCategories
		}
	})
}

module.exports.update= async(idCategories,name)=>{
	if(idCategories&&name){
		await Categories.update({
			name
		},
		{
			where:{
				idCategories
			}
			
		})
	}
	
}

module.exports.findOne = async(columnName,colomnValue)=>{
	if(columnName==='name'){
		const category =  await Categories.findOne({where:{
			name: colomnValue
		}
		})
		if(category){
			return category.dataValues
		}else{
			return false
		}
	} else if(columnName==='idCategories'){
		const category =  await Categories.findOne({where:{
			idCategories: colomnValue
		}
		})
		if(category){
			return category.dataValues
		}else{
			return false
		}
	}else{
		return false
	}

}

module.exports.getAll = async()=>{

	const categories =  await Categories.findAll() 

	if (categories[0]) {
		return categories
	}else{
		return false
	}
}

module.exports.update = async(idCategories,name)=>{
await Categories.update({name},{where:{idCategories}})
}

module.exports.count = async()=>{
	const score = Position.count()
		return score
}

module.exports.getAllPositionByCategory = async(idCategory)=>{
	let positionArray = []
	const types = await Type.getAllByCategory(idCategory)
				for (let i= 0; i < types.length; i++) {
				
				
				
					const genus = await Genus.getAllByType(types[i].dataValues.idType)
								for (let i= 0; i < genus.length; i++) {
								
									const position = 	await Position.findAllByGenus(genus[i].dataValues.idGenus)
							
									positionArray = positionArray.concat(position)
								}
								}
				if (positionArray[0]) {
					console.log(positionArray);
					return positionArray
				}else{
					return false
				}

	
}