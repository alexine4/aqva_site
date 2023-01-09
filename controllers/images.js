const Image = require('../models/image')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
	try {
		
		await Image.create(req.body.idPosition,req.file?req.file.path : '',req.body.color,req.user.idUser)
		.then(()=>res.status(200).json({message:'new image created'}))
	
	} catch (error) {
		errorHandler(res,error)
	}
		
}


module.exports.update = async(req,res)=>{
	try {
		
		await Image.update(req.params.idImage,req.file?req.file.path : '',req.body.color,req.user.idUser)
		.then(()=>res.status(200).json({message:'image was updated'}))
	
	} catch (error) {
		errorHandler(res,error)
	}
		
}
module.exports.delete = async(req,res)=>{
	try {
		
		await Image.delete(req.params.idImage)
		.then(()=>res.status(200).json({message:'image was deleted'}))
	
	} catch (error) {
		errorHandler(res,error)
	}
		
}
	module.exports.getAllByPosition = async(req,res)=>{
		try {
			
			const images = await Image.getAllByPosition(req.params.idPosition)
			if(images ===false){
				res.status(200).json([])
			}else{
				console.log(images);
				res.status(200).json(images)
			}
		
		} catch (error) {
			errorHandler(res,error)
		}
			
	}
	module.exports.getById = async(req,res)=>{
		try {
			
			const images = await Image.getById(req.params.idImage)
			if(images ===false){
				res.status(200).json(null)
			}else{
				res.status(200).json(images)
			}
		
		} catch (error) {
			errorHandler(res,error)
		}
			
	}