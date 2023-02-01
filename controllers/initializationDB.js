const user = require('../models/user')
const type = require('../models/type')
const genus = require('../models/genus')
const categories = require('../models/categories')
const position = require('../models/position')
const image = require('../models/image')
const userInfo = require('../models/userInfo')
const order = require('../models/order')
const orderList = require('../models/orderList')
const company = require('../models/companies')

module.exports.initialilazationAll= ()=>{
	user.initialization()
	type.initialization()
	genus.initialization()
	categories.initialization()
	position.initialization()
	image.initialization()
	userInfo.initialization()
	order.initialization()
	orderList.initialization()
	company.initialization()
}
	