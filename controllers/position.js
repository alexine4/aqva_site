const Position = require('../models/position')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
try {
	await Position.findOne('name',req.body.name).then(position=>{
		if(position === false){
			Position.create(req.body.name,req.body.description,req.body.idGenus).then(()=>res.status(200).json(true))
		}
		else
		{
			res.status(409).json(false)
		}
		
	})
} catch (error) {
	errorHandler(res,error)
}
	
}


module.exports.remove = async(req,res)=>{
	try {
		if (req.params.idPosition) {
			await Position.remove(req.params.idPosition)
			.then(
				()=>{
					res.status(200).json(true)
				}
			)
		}else{
			res.status(404).json(false)
		}
	} catch (error) {
		errorHandler(res,error)
	}


}

module.exports.update= async(req,res)=>{
	try {
		
		await Position.findOne('idPosition',req.params.idPosition)
		.then(
			position=> {
				if (position ===false) {
					res.status(404).json(false)
				}else{
				
					Position.update(req.params.idPosition,req.body.name,req.body.description)
					.then(
						()=>{
							res.status(200).json(true)
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
		await Position.getAll()
		.then(
			position=> {
				if (position ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(position)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getById = async(req,res)=>{
	try {
		await Position.findOne('idPosition',req.params.idPosition)
		.then(
			position=> {
				if (position ===false) {
					res.status(404).json({message:'Position with this id doesn`t exist'})
				}else{
					res.status(200).json(position)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.score = async(req,res)=>{
	await Position.sortCount(req.params.idGenus)
	.then(
		score=> res.status(200).json(score)
	)
}

module.exports.getAllByGenus = async(req,res)=>{
	try {
		await Position.findAllByGenus(req.params.idGenus)
		.then(
			position=> {
				if (position ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(position)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getAllSort = async(req,res)=>{
	
	try {
		await Position.findAllBySort(req.query.sortParam)
		.then(
			position=> {
				if (position ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(position)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.getAllBySearch = async(req,res)=>{
console.log(req.query.searchParam);
	try {
		await Position.findAllBySearch(req.query.searchParam)
		.then(
			position=> {
				if (position ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(position)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

