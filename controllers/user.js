const bCrypt = require('bcryptjs')
const User = require('../models/user')
const UserInfo = require('../models/userInfo')

module.exports.getActual = async (req,res)=>{
	try {
		await User.findByIds(req.user.idUser).then((user)=>{
		
				res.status(200).json(user)
						
		})
	} catch (error) {
		errorHandler(res,error)
	}
		

}

module.exports.getInfoByActualUser = async (req,res)=>{
	try {
		await UserInfo.findById(req.user.idUser).then((user)=>{
		
				res.status(200).json(user)
						
		})
	} catch (error) {
		errorHandler(res,error)
	}
		

}
module.exports.getInfoByUser = async (req,res)=>{
	try {
		await UserInfo.findById(req.params.idUser).then((user)=>{
		
				res.status(200).json(user)
						
		})
	} catch (error) {
		errorHandler(res,error)
	}
		

}


module.exports.update= async(req,res)=>{
	try {
		await User.findByIds(req.user.idUser).then(
			user=>{
				
				if (user.dataValues.username !== req.body.username && user.dataValues.email !== req.body.email ) {
					User.findOne('email',req.body.email).then(
						result=>{
							if (result == true) {
								User.findOne('username',req.body.username).then(
									result1=>{
										if (result1 == true) {
											User.update(req.user.idUser,req.body.username,req.body.email).then(()=>{
												res.status(200).json(true)
											})
										}else{
												res.status(200).json(false)
												}
												}
											)
							}else{
								res.status(200).json(false)
							}
						}
					)
				
				} else if(user.dataValues.username === req.body.username && user.dataValues.email !== req.body.email){
					User.findOne('email',req.body.email).then(
						result=>{
							if (result == true) {
								User.update(req.user.idUser,user.dataValues.username,req.body.email).then(()=>{
									res.status(200).json(true)
								})
							}else{
								res.status(200).json(false)
							}
							
						})
				
				}else if(user.dataValues.username !== req.body.username && user.dataValues.email === req.body.email){
					User.findOne('username',req.body.username).then(
						result=>{
							if (result == true) {
								User.update(req.user.idUser,req.body.username,user.dataValues.email).then(()=>{
									res.status(200).json(true)
								})
							}else{
								res.status(200).json(false)
							}
							
						})
				}
			
			}
		)
		
				
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.updatePassword= async(req,res)=>{
	try {
		if (req.body.password) {
			const salt = bCrypt.genSaltSync(10)
		const password = req.body.password
		await User.updatePassword(req.user.idUser,bCrypt.hashSync(password,salt)).then(()=>{
			res.status(200).json(true)
		})
	}
				
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.updateUserInfo= async(req,res)=>{
	try {
		
		await UserInfo.update(req.user.idUser,req.body.country,req.body.address,req.body.city,req.body.phone).then(()=>{
			res.status(200).json(true)
		})
				
	} catch (error) {
		errorHandler(res,error)
	}
}
module.exports.updateUserImage= async(req,res)=>{
	try {
		
		await UserInfo.updateImage(req.user.idUser,req.file?req.file.path : '').then(()=>{
			res.status(200).json(true)
		})
				
	} catch (error) {
		errorHandler(res,error)
	}
}