// Serverside
console.log('This message comes from app.js: listening to requests')
// grab the main file of every dependency
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// models folder returns an object with a seq attribute
const {sequelize} = require('./models')
// set up where to listen to request
const config = require('./config/config')
// allow app to get main functionality
// create express application
const app = express()

// setting up a sequence of express middleware within the app (order is key)
// get info on route requests (status code, time etc)
app.use(morgan('tiny'))
// parse json data and attach it to the req object, so we can access it in the route handlers or its callback fcts
app.use(bodyParser.json())
// enable frontend to talk to backend in this case
app.use(cors())

require('./passport')

require('./routes')(app)
// synching sequelize to the DB
sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
