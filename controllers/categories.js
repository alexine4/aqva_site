const Categories = require('../models/categories')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
try {
	await Categories.findOne('name',req.body.name).then((category)=>{
		if(category === false){
			Categories.create(req.body.name)
	.then(()=>res.status(200).json(true))
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
		if (req.params.idCategories) {
			await Categories.remove(req.params.idCategories)
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

module.exports.getAll = async(req,res)=>{
	try {
		await Categories.getAll()
		.then(
			categories=> {
				if (categories ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(categories)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getById = async(req,res)=>{
	try {
		await Categories.findOne('idCategories',req.params.idCategories)
		.then(
			categories=> {
				if (categories ===false) {
					res.status(404).json({message:'Category with this id doesn`t exist'})
				}else{
					res.status(200).json(categories)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.update= async(req,res)=>{
	try {
		
		await Categories.findOne('idCategories',req.params.idCategories)
		.then(
			categories=> {
				if (categories ===false) {
					res.status(404).json({message:'Category with this id doesn`t exist'})
				}else{
					Categories.update(req.params.idCategories,req.body.name)
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

module.exports.score = async(req,res)=>{
	await Categories.count()
	.then(
		score=> res.status(200).json(score)
	)
}

module.exports.getAllPositionByCategory = async(req,res)=>{
	console.log('ok iam Category',req.params.idCategory );
	try {
		await Categories.getAllPositionByCategory(req.params.idCategory)
		.then(
			categories=> {
				if (categories ===false) {
					res.status(200).json([])
				}else{
					res.status(200).json(categories)}
				}
				
		)
	} catch (error) {
		errorHandler(res,error)
	}
}