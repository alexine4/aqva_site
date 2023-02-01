const Companies = require('../models/companies')
const Position = require('../models/position')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async(req,res)=>{
try {
	await Companies.findOneByName(req.body.name).then(company=>{
		if(company){
			Companies.create(req.body.name,req.body.description,req.body.pickUpAddress,req.body.phone,req.body.email ).then(()=>res.status(200).json(true))
		}
		else
		{
			res.status(200).json(false)
		}
		
	})
} catch (error) {
	errorHandler(res,error)
}}

module.exports.getAll = async(req,res)=>{
try {
	await Companies.findAll().then(companies=>{
			res.status(200).json(companies)
			})
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.getById = async(req,res)=>{
try {
	await Companies.findOneByID(req.params.idCompany).then(companies=>{
			res.status(200).json(companies)
			})
} catch (error) {
	errorHandler(res,error)
}
}
	
module.exports.update = async(req,res)=>{
try {
	await Companies.findOneByID(req.params.idCompany).then(companyBefore=>{
		Companies.findOneByName(req.body.name).then(
			companyByName=>{
				if (companyByName.dataValues.idCompany !== companyBefore.dataValues.idCompany) {
					res.status(200).json(false)
				} else {
					Companies.update(req.params.idCompany,req.body.name,req.body.description,req.body.pickUpAddress,req.body.phone,req.body.email).then(
						Position.updateCompany(req.body.name,companyBefore.dataValues.name).then(
							()=>{res.status(200).json(true)}
						)
						
					)
				}
			}
		)

	})
	
} catch (error) {
	errorHandler(res,error)
}
}

module.exports.delete = async(req,res)=>{
try {
	await Companies.findOneByID(req.params.idCompany).then(
		findCompany=>{
			Companies.remove(req.params.idCompany).then(
				()=>{
					Position.updateCompany('',findCompany.dataValues.name).then(
						()=>{res.status(200).json(true)}
					)
				}
			)
		}
	) 
} catch (error) {
	errorHandler(res,error)
}
}

module.exports.getByName = async(req,res)=>{
	try {
		await Companies.findOneByName(req.params.name).then(companies=>{
				res.status(200).json(companies)
				})
	} catch (error) {
		errorHandler(res,error)
	}
	}