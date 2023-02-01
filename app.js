const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const connectionDB = require('./connection/connectionDB')
const Passport = require('./middleware/passport')

const authRoutes = require('./routes/auth')
const menuRoutes = require('./routes/menu')
const userRoutes = require('./routes/user')
const imageRoutes = require('./routes/image')
const positionRoutes = require('./routes/position')
const genusRoutes = require('./routes/genus')
const categoriesRoutes = require('./routes/categories')
const orderRoutes = require('./routes/order')
const companiesRoutes = require('./routes/companies')

const initialilazationAll = require('./controllers/initializationDB')

const app = express()



connectionDB.sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

initialilazationAll.initialilazationAll()

app.use(passport.initialize())
Passport(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/menu',menuRoutes)
app.use('/api/user',userRoutes)
app.use('/api/position',imageRoutes)
app.use('/api/position',positionRoutes)
app.use('/api/genus',genusRoutes)
app.use('/api/categories',categoriesRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/companies',companiesRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/uploads/usersAvatars/', express.static('uploads/usersAvatars/'))


module.exports = app
