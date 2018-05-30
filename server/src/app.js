// Serverside

console.log('hello')
// grab the main file of every dependency
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// models folder returns an object with a seq attribute
const {sequelize} = require('./models')
const config = require('./config/config')
// allow app to get main functionality
// create express application
const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)
// synching sequelize to the DB
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
