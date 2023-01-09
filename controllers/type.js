const Type = require('../models/type')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
try {
	await Type.findOne('name',req.body.name).then((type)=>{
		if(type === false){
			Type.create(req.body.name,req.body.idCategory).then(()=>res.status(200).json(true))
		}
		else
		{
			res.status(200).json(false)
		}
		
	})
} catch (error) {
	errorHandler(res,error)
}
	
}


module.exports.remove = async(req,res)=>{
	try {
		if (req.params.idType) {
			await Type.remove(req.params.idType)
			.then(
				()=>{
					res.status(200).json({
						message:"The type was deleted and all genus bellonging to it"
					})
				}
			)
		}else{
			res.status(404).json({
				message:"The type with this id doesn`t not exist"
			})
		}
	} catch (error) {
		errorHandler(res,error)
	}


}

module.exports.update= async(req,res)=>{
	try {
	
		await Type.findOne('idType',req.params.idType)
		.then(
			type=> {
				if (type ===false) {
					res.status(404).json({message:'Category with this id doesn`t exist'})
				}else{
				
					Type.update(req.params.idType,req.body.name,req.body.idCategory)
					.then(
						()=>{
							res.status(200).json({message:'Category update success'})
						}
					)
					}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getAll = async(req,res)=>{
	try {
		await Type.getAll()
		.then(
			types=> {
				if (types ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(types)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getById = async(req,res)=>{
	try {
		await Type.findOne('idType',req.params.idType)
		.then(
			type=> {
				if (type ===false) {
					res.status(404).json({message:'Type with this id doesn`t exist'})
				}else{
					res.status(200).json(type)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.score = async(req,res)=>{
	
	await Type.count(req.params.idCategory)
	.then(
		score=> res.status(200).json(score)
	) 
}

module.exports.getAllByCategory = async(req,res)=>{
	try {
		await Type.getAllByCategory(req.params.idCategory)
		.then(
			types=> {
				if (types ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(types)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
