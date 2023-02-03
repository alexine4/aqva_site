const Sequelize = require('sequelize')

const connectDB = require('../connection/connectionDB')

const { Op } = require("sequelize");
const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB,
	{
		dialect: connectDB.typeDB,
	}
	
)
class Position extends Sequelize.Model {}


module.exports.initialization = async()=>{
		
		 await Position.init(
		  {
			 idPosition: {
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
			coast:{
				type: Sequelize.FLOAT,
				allowNull:true
			},
			amount:{
				type: Sequelize.INTEGER,
				allowNull:false
			},
			company:{
				type: Sequelize.STRING,
				allowNull:false
			},
			
			idGenus:{
				type: Sequelize.INTEGER,
				allowNull:false
			},
				
		  },
		  { sequelize, modelName: 'position' }
		)
		
		sequelize.sync({alter:true})
		return true
	}

 module.exports.create = async(name,description,idGenus,coast,amount,company)=>{
	await Position.create(
		{
			name,
			description,
			idGenus,
			coast,
			amount,
			company
		}
	)
	
}


module.exports.remove = async(idPosition)=>{
	await Position.destroy({
		where:{
			idPosition
		}
	})
}

module.exports.update= async(idPosition,name,description,coast,amount,company)=>{
	
	await Position.update({
		name,
		description,
		coast,
		amount,
		company
	},
	{
		where:{
			idPosition
		}
		
	})
	
}
module.exports.updateAmount= async(idPosition,newAmount)=>{
	
	const positionOld =  await Position.findOne({where:{idPosition}})
		
			if (positionOld) {
				let newamount = positionOld.dataValues.amount - newAmount
				if (newamount <0){
					newamount = 0
				}
				
				Position.update({
					amount: newamount
				},
				{
					where:{
						idPosition
					}
					
				})
			}
		
		
	
	
}
module.exports.updateCompany= async(newCompany,lastCompany)=>{
	
	await Position.update({
		company: newCompany
	},
	{
		where:{
			company: lastCompany
		}
		
	})
	
}

module.exports.findOne = async(columnName,colomnValue)=>{
if(columnName==='name'){
	const position =  await Position.findOne({where:{
		name: colomnValue
	}
	})
	if(position){
		return position.dataValues
	}else{
		return false
	}
} else if(columnName==='idPosition'){
	const position =  await Position.findOne({where:{
		idPosition: colomnValue
	}
	})
	if(position){
		return position.dataValues
	}else{
		return false
	}
}else{
	return false
}

}

module.exports.getAll = async()=>{

const position =  await Position.findAll() 

if (position[0]) {
	return position
}else{
	return false
}
}


module.exports.findAllByGenus= async(idGenus)=>{
	const position= await Position.findAll({where:{idGenus}})

	return position
}


module.exports.count = async()=>{
const score = Position.count()
	return score
}

module.exports.sortCount = async(idGenus)=>{
	
	const position = 	await Position.findAll({where:{idGenus}})
 return position.length
}

module.exports.findAllBySort = async(sortParam)=>{
	if (sortParam =='A-Z') {
		const position =  await Position.findAll({
			order:[
				['name','ASC']
			]
		}) 
		if (position[0]) {
			return position
		}else{
			return false
		}
	}else if(sortParam =='Z-A'){
		const position =  await Position.findAll({
			order:[
				['name','DESC']
			]
		})
		if (position[0]) {
			return position
		}else{
			return false
		} 
	}
	


}

module.exports.findAllBySearch = async(serchParam)=>{
	
		const position =  await Position.findAll({
			where:{
				name:{
					[Op.substring]: serchParam
				}
				}
		}) 
		console.log(position);
		if (position[0]) {
			return position
		}else{
			return false
		}
	
	


}
