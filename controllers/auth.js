const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const userInfo = require('../models/userInfo')
const connectionDB =  require('../connection/connectionDB')
const errorHandler = require('../utils/errorHandler')




module.exports.login = async (req, res)=>{


	

if(req.body.login){
	// ckeck login is email or not
	const checkEmail =  user.findOne( 'email', req.body.login)
			checkEmail.then((Email)=>{
				
				if(Email !==  true){
				// email already exist 
				const passwordResult = bCrypt.compareSync(req.body.password, Email.dataValues.password)
				if (passwordResult){
					// generate token
					const token = jwt.sign({
						idUser: Email.dataValues.idUser,
						username: Email.dataValues.username,
						email: Email.dataValues.email,
						superUserStatus: Email.dataValues.superUserStatus 
					},connectionDB.jwt,{expiresIn: "24h"}
					)
					res.status(200).json({
						token: `Bearer ${token}`
					})
				}
				else{
					res.status(401).json({
						message: 'Password do not match'
						})
				}
					
		
					}else{						
	const checkUsername=  user.findOne( 'username', req.body.login)
	checkUsername.then((Name)=>{
		if(Name !==  true){
		// Username already exist 
		const passwordResult = bCrypt.compareSync(req.body.password, Name.dataValues.password)
		if (passwordResult){
			// generate token
			const token = jwt.sign({
				idUser: Name.dataValues.idUser,
				username: Name.dataValues.username,
				email: Name.dataValues.email,
				superUserStatus: Name.dataValues.superUserStatus
			},connectionDB.jwt,{expiresIn: "24h"}
			)
			res.status(200).json({
				token: `Bearer ${token}`
			})
		}
		else{
			res.status(401).json({
				message: 'Password do not match'
				})
		}
		

			}else{
				// username doesn't exist 
			res.status(404).json({
				message: 'Incorrect input data'
								})
							}
						})
					}

					})
			}
}




module.exports.register = async function(req, res){
	// initialization

	 user.initialization()

		// password gurd
				if (req.body.password) {
					const salt = bCrypt.genSaltSync(10)
				const password = req.body.password
				  // create new user
				  user.create(
				req.body.username,
				req.body.email,
				bCrypt.hashSync(password,salt)
					 ).then(
						()=>{
							user.findOne('username',req.body.username)
							.then(UserNum=>{
								userInfo.create(UserNum.dataValues.idUser)
							})
						}
					 )
				 try {
				
					
					 connectionDB.sequelize.sync({alter:true})
					 
					res.status(201).json({					
						message: 'New user created'
						})
					} catch(e){
						errorHandler(res,e)
					}
				}else{
					res.status(404).json({
						message: 'Password do not match'
					})
				}
				}
				



module.exports.check = async (req,res)=>{
	user.initialization()
	if (req.body.username !=='' && req.body.username !== undefined ) {
		const checkUsername =  user.findOne( 'username' , req.body.username )
	checkUsername.then((Username)=>{
		
		  if(Username !==  true){
			  // email already exist error
			  res.status(200).json({
				  status:true
			  })
			  
			  } else{
				res.status(200).json({
					status: false
				})
			}
		})
	}else if(req.body.email !==''&& req.body.email !== undefined ){
		const checkEmail =  user.findOne( 'email' , req.body.email )
		checkEmail.then((Email)=>{
			
			  if(Email !==  true){
				  // email already exist error
				  res.status(200).json({
					  status:true
				  })
				  
				  }else{
					res.status(200).json({
						status: false
					})
				}
			})
	}
}


module.exports.checkPassword = async (req, res)=>{



	if(req.body.username){
							
		const checkUsername=  user.findOne( 'username', req.body.username)
		checkUsername.then((Name)=>{
			if(Name !==  true){
			// User already exist 
			const passwordResult = bCrypt.compareSync(req.body.password, Name.dataValues.password)
				if (passwordResult){
				
				res.status(200).json(true)
			}
			else{
				res.status(200).json(false)
			}
			
	
				}else{
					// user doesn't exist 
				res.status(404).json(false)
							
				}
	
			})
	}
	

					
		

	
						
	}