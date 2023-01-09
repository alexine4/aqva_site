const user = require('../models/user')
const type = require('../models/type')
const genus = require('../models/genus')
const categories = require('../models/categories')
const position = require('../models/position')
const image = require('../models/image')
const userInfo = require('../models/userInfo')

module.exports.initialilazationAll= ()=>{
	user.initialization()
	type.initialization()
	genus.initialization()
	categories.initialization()
	position.initialization()
	image.initialization()
	userInfo.initialization()
}
	