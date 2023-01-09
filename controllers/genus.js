const Genus = require('../models/genus')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
try {
	await Genus.findOne('name',req.body.name).then(genus=>{
		if(genus === false){
			Genus.create(req.body.name,req.body.idType).then(()=>res.status(200).json(true))
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
		if (req.params.idGenus) {
			await Genus.remove(req.params.idGenus)
			.then(
				()=>{
					res.status(200).json({
						message:"The Genus was deleted and all species bellonging to it"
					})
				}
			)
		}else{
			res.status(404).json({
				message:"The Genus with this id doesn`t not exist"
			})
		}
	} catch (error) {
		errorHandler(res,error)
	}


}

module.exports.update= async(req,res)=>{
	try {
		
		await Genus.findOne('idGenus',req.params.idGenus)
		.then(
			genus=> {
				if (genus ===false) {
					res.status(404).json({message:'Genus with this id doesn`t exist'})
				}else{
				
					Genus.update(req.params.idGenus,req.body.name,req.body.idType)
					.then(
						()=>{
							res.status(200).json({message:'Genus update success'})
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
		await Genus.getAll()
		.then(
			genus=> {
				if (genus ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(genus)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getById = async(req,res)=>{
	try {
		await Genus.findOne('idGenus',req.params.idGenus)
		.then(
			Genus=> {
				if (Genus ===false) {
					res.status(404).json({message:'Genus with this id doesn`t exist'})
				}else{
					res.status(200).json(Genus)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.score = async(req,res)=>{
	await Genus.count(req.params.idType)
	.then(
		score=> res.status(200).json(score)
	)
}

module.exports.getAllByType = async(req,res)=>{
	try {
		await Genus.getAllByType(req.params.idType)
		.then(
			genus=> {
				if (genus ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(genus)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.getAllPositionByType = async(req,res)=>{

	try {
		await Genus.getAllPositionByType(req.params.idType)
		.then(
			genus=> {
				if (genus ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(genus)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}